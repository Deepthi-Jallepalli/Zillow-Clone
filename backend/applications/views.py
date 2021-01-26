from core.models import *
from core.serializers import *
from applications.serializers import *
from home_listing.models import *
from rest_framework import status
from core.authentications import JWTAuthentication
from django.http.response import JsonResponse
from rest_framework.generics import GenericAPIView,CreateAPIView,ListAPIView
from home_finder.utility import Util
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.utils import timezone


class UserApplicationView(GenericAPIView):
    """
    This view allows seller/landlord/realtor to approve or reject an application
    """
    def get(self, request):
        user = JWTAuthentication.validate_token(request)
        criterion1 = Q(deleted_at__isnull=True)
        criterion2 = Q(user=user.id)
        application = Application.objects.filter(criterion1 & criterion2)
        if not application:
            return JsonResponse({'message':'User has not submitted any applications'}, status=status.HTTP_404_NOT_FOUND)
        else:
            serializer = UserApplicationSerializer(application,many=True)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK,safe=False)

        
class SubmitApplicationView(GenericAPIView):
    """
    This view is created to allow user to submit a rental or buying application for specific home listing.
    """
    def post(self, request):
        user = JWTAuthentication.validate_token(request)
        application_data = request.data['application_details']
        home_listing_id = application_data['home_listing']
        additional_info_serializer = CreateUserAdditionalInfoSerializer(data=request.data['user_details'])
        application_serializer = CreateApplicationSerializer(data=request.data['application_details'])
        
        if additional_info_serializer.is_valid():
            if application_serializer.is_valid():
                application = application_serializer.save(user=user)
                user_application = ApplicationSerializer(application[0])
                user_additional_info = additional_info_serializer.save(user=user)
                user_info = UserAdditionalInfoSerializer(user_additional_info[0])
                to_email = Listing.objects.get(id=home_listing_id).listed_by.email_id
                name = Listing.objects.get(id=home_listing_id).listed_by.first_name
                body = "Hi {},\n Congratukations, there is application update received to one of your posted listings." \
                "\n Please navigate to your listings to review application".format(name)
                Util.send_email('Recieved New Application', body, 'from@gmail.com', [to_email])
                return JsonResponse({'message':'Application submitted successfully'}, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse(application_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse(additional_info_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class ListApplications(GenericAPIView):
    """
    This view is created to allow seller/landlord/realtor to view the submitted application assosiated with their posted listsing.
    """
    def get(self,request):
        user = JWTAuthentication.validate_token(request)
        criterion1 = Q(deleted_at__isnull=True)
        listing_id = int(request.GET.get('listing_id', None))
        criterion2 = Q(home_listing=listing_id)
        querylist = Application.objects.filter(criterion1 & criterion2)
        if not querylist:
            return JsonResponse({'message':'Home listing has no applications'}, status=status.HTTP_404_NOT_FOUND)
        else:
            serializer = ListHomeListingApplications(querylist,many=True)
            result = serializer.data
            for i, app in enumerate(querylist):
                user_info =  UserAdditionalInfo.objects.get(user=app.user)
                user_info_serializer = ListUserAddDeatilsSerializer(user_info)
                result[i]['user_info'] = user_info_serializer.data

            return JsonResponse(result,status=status.HTTP_200_OK,safe=False)

class ApplicationStatusUpdateView(GenericAPIView):
    """
    This view allows seller/landlord/realtor to approve or reject an application
    """
    def put(self, request):
        owner = JWTAuthentication.validate_token(request)
        serializer = ApplicationStatusUpdateSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            app_status = data.get('status')  
            app_id = data.get('id') 
            try:
                queryset = Application.objects.filter(deleted_at__isnull=True)
                application = get_object_or_404(queryset, id=app_id)
                application.status = app_status
                application.save()
                return JsonResponse({'message': 'Applciation status update successful'}, status=status.HTTP_201_CREATED)
            except Exception as ex:
                return JsonResponse({'message': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WithdrawApplicationView(GenericAPIView):
    """
    This view allows Admin to remove users
    """
    def post(self, request):
        user = JWTAuthentication.validate_token(request)
        serializer = WithdrawApplicationSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            app_id = data.get('id')
            app_status = data.get('status')
            reason = data.get('deleted_why')
            try:
                application = Application.objects.get(id=app_id)
                application.status= app_status
                application.deleted_at = timezone.now()
                application.deleted_why = reason
                application.save()
                return JsonResponse({'message': 'Application deleted'}, status=status.HTTP_201_CREATED)
            except Exception as ex:
                return JsonResponse({'message': str(ex)}, status=status.HTTP_404_NOT_FOUND)        
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)