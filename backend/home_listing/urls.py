from django.conf.urls import url
from django.urls import path

from . import views

urlpatterns = [
    path('', views.listings),
    path('<int:listing_id>/', views.listing_detail_view),
    path('<int:listing_id>/schedule/', views.listing_schedule),
    
]