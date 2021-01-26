from django.urls import path
from core.views import *
from django.conf.urls import url

urlpatterns = [

    url('user/register$', UserRegistrationView.as_view()),
    url('user/login$', UserLoginView.as_view()),
    url('admin/users$',PendingUserView.as_view()),
    url('admin/update/user$',UpdateUserStatusView.as_view()),
    url('user/info$',UserAccountInfo.as_view()),
    url('admin/remove/user$',RemoveUserView.as_view()),    

]
