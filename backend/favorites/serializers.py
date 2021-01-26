from rest_framework import serializers
from .models import *
from home_listing.serializers import ListingSerializer


class CreateFavoriteListingSerializer(serializers.Serializer):
    listing_id = serializers.IntegerField()

    def create(self, validated_data):
        return FavoriteListing.objects.create(**validated_data)


class FavoriteListingSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    listing = ListingSerializer()


class CreateFavoriteSearchSerializer(serializers.Serializer):
    query_params = serializers.JSONField()
    name = serializers.CharField()

    def create(self, validated_data):
        return FavoriteSearch.objects.create(**validated_data)


class FavoriteSearchSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    query_params = serializers.JSONField()



