"""
This file contains all models designed for core app. It contains both default django models and 
custom designed models which are migrated to PostgresSQL database.
"""

from django.db import models
from django.contrib.postgres.fields.citext import CIEmailField
from django.conf import settings
import datetime


class Role(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True,blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'role'
    def __str__(self):
        return self.name

class UserStatus(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True,blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'user_status'
    def __str__(self):
        return self.name


class UserType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True,blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'user_type'
    def __str__(self):
        return self.name

class User(models.Model):

    def get_default_role():
        return Role.objects.get(name="user").id
    def get_default_user_type():
        return UserType.objects.get(name="default").id
    def get_default_user_status():
        return UserStatus.objects.get(name="pending").id 
    DEFAULT_ROLE = 4    
    DEFAULT_USER_STATUS = 4
    DEFAULT_USER_TYPE = 6           
    
    id = models.AutoField(primary_key=True)
    role = models.ForeignKey(Role,default=get_default_role,on_delete=models.CASCADE)
    user_status = models.ForeignKey(UserStatus,default=get_default_user_status,on_delete=models.CASCADE)
    user_type = models.ForeignKey(UserType,default=get_default_user_type,on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email_id = CIEmailField(max_length=100,unique=True) # CREATE EXTENSION IF NOT EXISTS citext; 
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True,blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'user'


class UserAdditionalInfo(models.Model):
 
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, models.DO_NOTHING)
    sex = models.CharField(max_length=1,blank=True, null=True)
    date_of_birth = models.DateField(default=datetime.date.today)
    credit_score = models.IntegerField(default=700)
    employment_type = models.CharField(max_length=100,null=True,blank=True)
    annual_salary = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True,blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'user_additional_info'

