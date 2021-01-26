from applications.models import Application
from home_listing.models import Listing
from rest_framework import serializers
from core.models import User,UserAdditionalInfo
from core.serializers import UserAdditionalInfoSerializer,FlattenMixin

class HomeListingFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return Listing.objects.get(id=value)

class CreateApplicationSerializer(serializers.Serializer):
    home_listing = HomeListingFieldSerializer()
    offered_price = serializers.DecimalField(required=False,allow_null=True,max_digits=10, decimal_places=2)

    def create(self, validated_data):
        return Application.objects.update_or_create(home_listing=validated_data['home_listing'], defaults = validated_data)

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('id','home_listing','status','offered_price','user','created_at')

class CreateUserAdditionalInfoSerializer(serializers.Serializer):
    sex = serializers.CharField(required=False,allow_null=True,allow_blank=True)
    date_of_birth = serializers.DateField()
    credit_score =serializers.IntegerField()
    employment_type = serializers.CharField(required=False,allow_null=True,allow_blank=True)
    annual_salary = serializers.DecimalField(max_digits=10, decimal_places=2)

    def create(self, validated_data):
        return UserAdditionalInfo.objects.update_or_create(user=validated_data['user'], defaults = validated_data)

class ListHomeListingApplications(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('id','status','offered_price','created_at','user')

    def to_representation(self, instance):
            return {
                'id': instance.id,
                'status': instance.status,
                'offered_price': instance.offered_price,
                'created_at': instance.created_at,
                'user': "{} {}".format(instance.user.first_name, instance.user.last_name)
            }

class ListUserAddDeatilsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdditionalInfo
        fields = ('sex','date_of_birth','credit_score','employment_type','annual_salary')

class ApplicationStatusUpdateSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    user = serializers.IntegerField(required=False)
    home_listing = serializers.IntegerField(required=False)
    status = serializers.CharField()
    offered_price = serializers.DecimalField(required=False,max_digits=10, decimal_places=2)
    deleted_at = serializers.DateTimeField(required=False)
    deleted_why = serializers.CharField(required=False)

    def create(self, validated_data):
        return Application.objects.create(**validated_data)


class UserApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('status','home_listing','offered_price','created_at')

class WithdrawApplicationSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    user = serializers.IntegerField(required=False)
    home_listing = serializers.IntegerField(required=False)
    status = serializers.CharField()
    offered_price = serializers.DecimalField(required=False,max_digits=10, decimal_places=2)
    created_at = serializers.DateTimeField(required=False)
    updated_at = serializers.DateTimeField(required=False)
    deleted_at = serializers.DateTimeField(required=False)
    deleted_why = serializers.CharField()

    def create(self, validated_data):
        return Application.objects.create(**validated_data)