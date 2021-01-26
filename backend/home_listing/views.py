from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from core.authentications import JWTAuthentication
from datetime import datetime
from .serializers import *
from rest_framework import status
from django.db import transaction
from home_finder.utility import Util
import json



def create_open_house_schedules(request_data, listing):
    open_house_objs = []
    open_houses = json.loads(request_data.get("open_house", '[]'))
    print("open_houses: ", open_houses)
    for open_house in open_houses:
        print("open_house: ", open_house)
        if open_house["open_house_date"] and open_house["open_house_start_time"] and open_house["open_house_end_time"]:
            open_house_objs.append(
                OpenHouse(open_house_date=open_house["open_house_date"],
                          open_house_start_time=open_house["open_house_start_time"],
                          open_house_end_time=open_house["open_house_end_time"], listing=listing)
            )

    return OpenHouse.objects.bulk_create(open_house_objs)


@api_view(['POST', 'GET'])
def listings(request):
    user = JWTAuthentication.validate_token(request)

    if request.method == "POST":

        images_serializer = CreateImagesSerializer(data=dict(request.data))
        listing_serializer = CreateListingSerializer(data=request.data)

        if listing_serializer.is_valid() and images_serializer.is_valid():
            with transaction.atomic():
                new_listing = listing_serializer.save(listed_by=user)
                images_serializer.save(listing=new_listing)
                create_open_house_schedules(request.data, new_listing)
                new_listing.save()

            return Response(ListingSerializer(new_listing).data, status=status.HTTP_201_CREATED)

        return Response({
            "listing_errors": listing_serializer.errors,
            "image_errors": images_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    else:
        # GET /listings
        user_listings = Listing.objects.filter(listed_by=user, deleted_at__isnull=True)
        return Response(ListingSerializer(user_listings, many=True).data, status=status.HTTP_200_OK)

# get /listings/listing_id/
# @csrf_exempt
@api_view(['PUT', 'GET', 'DELETE'])
def listing_detail_view(request, listing_id):
    print("get/put listing view")
    if request.method == "GET":
        queryset = Listing.objects.filter(deleted_at__isnull=True)
        listing = get_object_or_404(queryset, pk=listing_id)

        serializer = ListingSerializer(listing)
        return Response(serializer.data)
    elif request.method == "PUT":
        return update_listing(request, listing_id)
    else:
        return delete_listing(request, listing_id)

def update_listing(request, listing_id):
    user = JWTAuthentication.validate_token(request)

    queryset = Listing.objects.filter(listed_by=user)
    listing = get_object_or_404(queryset, pk=listing_id)
    request.data.pop("images")
    listing_serializer = CreateListingSerializer(listing, data=request.data)

    if listing_serializer.is_valid():
        print("put is valid")
        updated_listing = listing_serializer.save()
        return Response(ListingSerializer(updated_listing).data, status=status.HTTP_200_OK)

    return Response(listing_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def delete_listing(request, listing_id):
    user = JWTAuthentication.validate_token(request)

    queryset = Listing.objects.filter(listed_by=user)
    listing = get_object_or_404(queryset, pk=listing_id)
    listing.deleted_at = datetime.now()
    listing.deleted_why = request.data.get("deleted_why", "user deleted")
    listing.save()

    return Response({"status": "Successfully deleted"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def listing_schedule(request, listing_id):
    user = JWTAuthentication.validate_token(request)
    schedule_serializer = CreateListingScheduleSerializer(data=request.data)

    if schedule_serializer.is_valid():
        try:
            if HomeSchedule.objects.filter(
                        listing_id=listing_id,
                        schedule_visits_date=request.data.get("schedule_visits_date"),
                        schedule_visits_time=request.data.get("schedule_visits_time")
            ).exists():
                return Response({"status": "Schedule already booked"}, status=status.HTTP_400_BAD_REQUEST)
            schedule_serializer.save(scheduled_by=user, listing_id=listing_id)
            scheduled_listing = Listing.objects.get(id=listing_id)

            Util.send_email('Home Finder Schedule booking info', 'Congratulations, your schedule is confirmed' + '\n'+ '\n'+
                            'Scheduled Date: {schedule_date}'.format(schedule_date=request.data.get("schedule_visits_date")) + '\n' +
                            'Scheduled Time: {schedule_time}'.format(schedule_time=request.data.get("schedule_visits_time")) + '\n' + '\n' +
                            'Scheduled listing address: ' + '\n' +
                            '{street_addr}'.format(street_addr=scheduled_listing.street_address) + '\n' +
                            '{city}'.format(city=scheduled_listing.city) + '\n' +
                            '{state}'.format(state=scheduled_listing.state) + '\n' +
                            '{zip_code}'.format(zip_code=scheduled_listing.zip_code) + '\n' +
                            'Cost of the listing: {price}'.format(price=scheduled_listing.price) + '\n' +
                            'Please contact the property owner if you need further details.', 'from@gmail.com', [user.email_id])

        except ObjectDoesNotExist as e:
            Response({}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"status": "Successfully scheduled"}, status=status.HTTP_200_OK)

