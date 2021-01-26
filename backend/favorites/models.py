from django.db import models
from core.models import User
from home_listing.models import Listing

# Create your models here.


# FavoriteListing table holds user's favorite listings
class FavoriteListing(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING)
    listing = models.ForeignKey(Listing, models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)


# FavoriteSearches table holds user's favorite Search criteria
class FavoriteSearch(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING)
    name = models.CharField(max_length=100)
    query_params = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)



