""" 
Serializers are used to connect to apps to external apps via Json data
It helps in data flow in Json formart to and fro communication (Json to Python and vice versa)

"""
from core.models import *
from rest_framework import serializers
from django.contrib.postgres.fields.citext import CIEmailField

class RoleFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return Role.objects.get(name=value)

class UserTypeFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return UserType.objects.get(name=value)
        

class UserStatusFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return UserStatus.objects.get(name=value)


class UserSerializer(serializers.Serializer):
    role = RoleFieldSerializer(required=False)
    user_status = UserStatusFieldSerializer(required=False)
    user_type = UserTypeFieldSerializer(required=False)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email_id = serializers.EmailField()
    password = serializers.CharField()

    def create(self, validated_data):
        return User.objects.create(**validated_data)

class UserRegistrationSerializer(serializers.ModelSerializer):
    role = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name')
    user_status = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name')
    user_type = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name')
    class Meta:
        model = User
        fields = ('role','user_status','user_type','first_name','last_name','email_id','created_at')
        
class RetriveUsersSerializer(serializers.ModelSerializer):
    user_type = serializers.SlugRelatedField(
    read_only=True,
    slug_field='name')
    user_status = serializers.SlugRelatedField(
    read_only=True,
    slug_field='name')
    class Meta:
        model = User
        fields =  ('id','first_name','last_name','email_id','user_type','user_status','created_at')

class FlattenMixin(object):
    """Flatens the specified related objects in this representation"""
    def to_representation(self, obj):
        assert hasattr(self.Meta, 'flatten'), (
            'Class {serializer_class} missing "Meta.flatten" attribute'.format(
                serializer_class=self.__class__.__name__
            )
        )
        # Get the current object representation
        rep = super(FlattenMixin, self).to_representation(obj)
        # Iterate the specified related objects with their serializer
        for field, serializer_class in self.Meta.flatten:
            serializer = serializer_class(context = self.context)
            objrep = serializer.to_representation(getattr(obj, field))
            #Include their fields, prefixed, in the current   representation
            for key in objrep:
                rep[key] = objrep[key]
        return rep

class UserAdditionalInfoSerializer(FlattenMixin,serializers.ModelSerializer):
    class Meta:
        model = UserAdditionalInfo
        fields = ('sex','date_of_birth','credit_score','annual_salary')
        flatten = [ ('user', UserRegistrationSerializer) ]

class UserLoginSerializer(serializers.ModelSerializer):
    user_type = serializers.SlugRelatedField(
    read_only=True,
    slug_field='name')
    user_status = serializers.SlugRelatedField(
    read_only=True,
    slug_field='name')
    class Meta:
        model = User
        fields =  ('first_name','last_name','email_id','user_type','user_status')

class UserStatusUpdateSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    user_status = UserStatusFieldSerializer()
    role = RoleFieldSerializer(required=False)
    user_type = UserTypeFieldSerializer(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email_id = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    deleted_why = serializers.CharField(required=False)

    def create(self, validated_data):
        return User.objects.create(**validated_data)