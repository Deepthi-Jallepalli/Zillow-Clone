from django.urls import path
from applications.views import *
from django.conf.urls import url

from . import views
urlpatterns = [

    url('withdraw',WithdrawApplicationView.as_view()),
    url('submit$', SubmitApplicationView.as_view()),
    url('status/update$',ApplicationStatusUpdateView.as_view()),
    url('user', UserApplicationView.as_view()),
    url('', ListApplications.as_view()),

]