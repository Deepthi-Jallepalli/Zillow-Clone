from django.contrib import admin
from .models import Role,User,UserAdditionalInfo,UserStatus,UserType
admin.site.register(Role)
admin.site.register(User)
admin.site.register(UserAdditionalInfo)
admin.site.register(UserStatus)
admin.site.register(UserType)