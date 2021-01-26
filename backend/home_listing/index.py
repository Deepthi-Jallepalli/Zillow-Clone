# index.py
from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register
from .models import Listing, Image

#
@register(Listing)
class ListingIndex(AlgoliaIndex):
    fields = ('listed_by', 'listed_by_serialized', 'listing_type', 'home_type', 'home_status', 'description',
              'zip_code', 'street_address', 'city', 'state', 'country', 'price', 'sqft_area', 'bedrooms',
                'bathroom', 'year_built', 'kitchen', 'laundry', 'air_conditioner', 'heater',
                'available_date', 'lease_term', 'security_deposit', 'images', 'is_active', 'created_at', 'updated_at', 'deleted_at',
                'deleted_why', 'open_houses', 'parking_space_type', 'floor_type')

    settings = {'searchableAttributes': ['listed_by', 'listing_type', 'home_type', 'home_status', 'description',
              'zip_code', 'street_address', 'city', 'state', 'country', 'price', 'sqft_area', 'bedrooms',
                'bathroom', 'year_built', 'kitchen', 'laundry', 'air_conditioner', 'heater',
                'lease_term', 'security_deposit', 'images', 'is_active', 'created_at', 'open_houses',
                'available_date', 'updated_at', 'deleted_at', 'deleted_why', 'parking_space_type', 'floor_type'],

                'attributesForFaceting': ['listed_by', 'listing_type', 'home_type', 'home_status',
                'zip_code', 'city', 'state', 'price', 'sqft_area', 'bedrooms', 'bathroom', 'air_conditioner', 'heater',
                'available_date', 'parking_space_type', 'floor_type']
                }

