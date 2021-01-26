from rest_framework import serializers
from .models import *
from core.models import User


class ImageSerializer(serializers.Serializer):
    url = serializers.SerializerMethodField()

    def get_url(self, obj):
        if obj.photo_file:
            return obj.photo_file.url.split('?')[0]
        return obj.url


class OpenHouseSerializer(serializers.Serializer):
    open_house_date = serializers.CharField()
    open_house_start_time = serializers.CharField()
    open_house_end_time = serializers.CharField()

class ListingSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    city = serializers.CharField()
    state = serializers.CharField()
    country = serializers.CharField()
    bedrooms = serializers.IntegerField()
    bathroom = serializers.IntegerField()
    year_built = serializers.IntegerField()
    home_type = serializers.CharField()
    listing_type = serializers.CharField()
    home_status = serializers.CharField()
    description = serializers.CharField()
    zip_code = serializers.CharField()
    street_address = serializers.CharField()
    air_conditioner = serializers.BooleanField()
    heater = serializers.CharField()
    price = serializers.IntegerField()
    floor_type = serializers.CharField()
    sqft_area = serializers.IntegerField()
    kitchen = serializers.CharField()
    laundry = serializers.CharField()
    parking_space_type = serializers.CharField()
    listed_by = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField()
    images = serializers.SerializerMethodField()
    open_house = serializers.SerializerMethodField()
    lease_term = serializers.IntegerField()
    available_date = serializers.DateField()
    security_deposit = serializers.IntegerField()

    def get_listed_by(self, obj):
        user = obj.listed_by
        return "{} {}".format(user.first_name, user.last_name)

    def get_images(self, obj):
        return ImageSerializer(obj.image_set, many=True).data

    def get_open_house(self, obj):
        # open_house = obj.open_house["open_house_date"]
        # print("the open house obj is ", obj.objects.get.all())
        return OpenHouseSerializer(obj.openhouse_set, many=True).data

class HomeStatusFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return HomeStatus.objects.get(name=value)


class HomeTypeFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return HomeType.objects.get(name=value)


class ListingTypeSerializer(serializers.Field):
    def to_internal_value(self, value):
        return ListingType.objects.get(name=value)


class FloorTypeSerializer(serializers.Field):
    def to_internal_value(self, value):
        return FlooringType.objects.get(name=value)


class ParkingSpaceTypeSerializer(serializers.Field):
    def to_internal_value(self, value):
        return ParkingType.objects.get(name=value)


class CreateImagesSerializer(serializers.Serializer):
    images = serializers.ListField(child=serializers.URLField(), required=False)
    s3_image_file_data = serializers.ListField(child=serializers.FileField(), required=False)

    def create(self, validated_data):
        print("create images validated data: ", validated_data)

        image_objs = []
        plain_images = s3_images = None
        for image_url in validated_data.get("images", []):
            image_objs.append(
                Image(url=image_url, listing=validated_data["listing"])
            )

        if image_objs:
            plain_images = Image.objects.bulk_create(image_objs)

        image_objs = []
        for file in validated_data.get("s3_image_file_data", []):
            image_objs.append(
                Image(photo_file=file, listing=validated_data["listing"])
            )

        if image_objs:
            s3_images = Image.objects.bulk_create(image_objs)

        return plain_images or s3_images


class CreateOpenHouseSerializer(serializers.Serializer):
    open_house = serializers.ListField(child=serializers.DictField(), required=False, default=[])

    def create(self, validated_data):
        print("create open house validated data: ", validated_data)
        open_house_objs = []
        for open_house in validated_data.get("open_house", []):
            open_house_objs.append(
                OpenHouse(open_house_date=open_house["open_house_date"], open_house_start_time=open_house["open_house_start_time"],
                          open_house_end_time=open_house["open_house_end_time"], listing=validated_data["listing"])
                )

        return OpenHouse.objects.bulk_create(open_house_objs)

class CreateListingSerializer(serializers.Serializer):
    listing_type = ListingTypeSerializer()
    home_type = HomeTypeFieldSerializer()
    home_status = HomeStatusFieldSerializer()
    description = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    zip_code = serializers.CharField()
    street_address = serializers.CharField()
    city = serializers.CharField()
    state = serializers.CharField()
    country = serializers.CharField()
    price = serializers.IntegerField()
    bedrooms = serializers.IntegerField()
    bathroom = serializers.IntegerField()
    floor_type = FloorTypeSerializer()
    sqft_area = serializers.IntegerField()
    year_built = serializers.IntegerField(allow_null=True)
    kitchen = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    laundry = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    parking_space_type = ParkingSpaceTypeSerializer()
    air_conditioner = serializers.BooleanField(required=False, allow_null=True)
    heater = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    available_date = serializers.DateField(required=False, allow_null=True)
    lease_term = serializers.CharField(required=False, default=None, allow_null=True)
    security_deposit = serializers.CharField(required=False, default=None, allow_null=True)

    def create(self, validated_data):
        if validated_data["lease_term"] == "null":
            validated_data["lease_term"] = None

        if validated_data["security_deposit"] == "null":
            validated_data["security_deposit"] = None

        return Listing.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if validated_data["lease_term"] == "null":
            validated_data["lease_term"] = None

        if validated_data["security_deposit"] == "null":
            validated_data["security_deposit"] = None


        Listing.objects.filter(id=instance.id).update(**validated_data)

        instance.refresh_from_db()
        instance.save()

        return instance


class CreateListingScheduleSerializer(serializers.Serializer):
    schedule_visits_date = serializers.DateField()
    schedule_visits_time = serializers.TimeField()

    def create(self, validated_data):
        return HomeSchedule.objects.create(**validated_data)
