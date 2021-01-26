from django.conf.urls import url
from . import views
from django.urls import path, include

urlpatterns = [
    path('listing/', views.favorites_listing),
    path('listing/<int:favorite_listing_id>/', views.favorites_listing_delete),

    path('search/', views.favorites_search),
    path('search/<int:favorite_search_id>/', views.favorites_search_delete),

]