from django.contrib import admin
from django.apps import apps
from django.contrib.admin.sites import AlreadyRegistered


models = apps.get_app_config('home_listing').get_models()

for model in models:
    try:
        admin.site.register(model)
    except AlreadyRegistered:
        pass

# Register your models here.
