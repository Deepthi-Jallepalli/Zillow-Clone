from django.db import models
from core.models import User

# Create your models here.

# listing type indicates the listing type as Rent, Sale.
class ListingType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


# HomeType indicated the type of house listed such as Apartment, Town House, Condo etc
class HomeType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


# HomeStatus indicates the listing type such as Sold, Pending, Rented out, Available etc
class HomeStatus(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class ParkingType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class FlooringType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

# listing has the details of the listing
class Listing(models.Model):
    id = models.AutoField(primary_key=True)
    listed_by = models.ForeignKey(User, models.DO_NOTHING)
    listing_type = models.ForeignKey(ListingType, models.DO_NOTHING)
    home_type = models.ForeignKey(HomeType, models.DO_NOTHING)
    home_status = models.ForeignKey(HomeStatus, models.DO_NOTHING)
    floor_type = models.ForeignKey(FlooringType, models.DO_NOTHING, null=True)
    parking_space_type = models.ForeignKey(ParkingType, models.DO_NOTHING, null=True)
    description = models.TextField(null=True, blank=True)
    zip_code = models.CharField(max_length=10)
    street_address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    price = models.IntegerField()
    sqft_area = models.IntegerField(null=True, blank=True)
    bedrooms = models.IntegerField()
    bathroom = models.IntegerField()
    year_built = models.IntegerField(null=True, blank=True)
    kitchen = models.CharField(max_length=100, null=True, blank=True)
    laundry = models.CharField(max_length=100, null=True, blank=True)
    air_conditioner = models.BooleanField(default=False)
    heater = models.CharField(max_length=100, null=True, blank=True)
    available_date_time = models.DateTimeField(null=True, blank=True)
    available_date = models.DateField(null=True, blank=True)
    lease_term = models.IntegerField(null=True, blank=True)
    security_deposit = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    def images(self):
        return [image.url or image.photo_file.url.split('?')[0] for image in self.image_set.all()]

    def listed_by_serialized(self):
        return self.listed_by.first_name + " " + self.listed_by.last_name

    def open_houses(self):
        result = []

        for open_house in self.openhouse_set.all():
            result.append({
                "open_house_date": open_house.open_house_date,
                "open_house_start_time": open_house.open_house_start_time,
                "open_house_end_time": open_house.open_house_end_time
            })

        return result


# HomeSchedule indicates the listing schedule details such as scheduled date and time,
class HomeSchedule(models.Model):
    id = models.AutoField(primary_key=True)
    scheduled_by = models.ForeignKey(User, models.DO_NOTHING)
    listing = models.ForeignKey(Listing, models.DO_NOTHING)
    schedule_visits_date = models.DateField(null=True, blank=True)
    schedule_visits_time = models.TimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)


class OpenHouse(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey(Listing, models.DO_NOTHING)
    open_house_date = models.DateField(null=True, blank=True)
    open_house_start_time = models.TimeField(null=True, blank=True)
    open_house_end_time = models.TimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)


# Image has the path to the images for listings
class Image(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey(Listing, models.DO_NOTHING)
    url = models.URLField(null=True, blank=True)
    photo_file = models.FileField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.photo_file.name






