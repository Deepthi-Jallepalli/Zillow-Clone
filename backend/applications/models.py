from django.db import models
from core.models import User
from home_listing.models import Listing


class Application(models.Model):

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, models.DO_NOTHING)
    home_listing = models.ForeignKey(Listing, models.DO_NOTHING)
    status = models.CharField(max_length=100,default="pending")
    offered_price = models.DecimalField(max_digits=10, decimal_places=2,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True,blank=True)
    deleted_why = models.TextField(null=True,blank=True)

    class Meta:
        db_table = 'application'