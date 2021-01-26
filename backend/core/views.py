from core.models import *
from core.serializers import *
from rest_framework import status
from core.authentications import JWTAuthentication
from django.http.response import JsonResponse
from rest_framework.generics import GenericAPIView,CreateAPIView,ListAPIView
from django.contrib.auth.hashers import make_password,check_password
from home_finder.utility import Util
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils import timezone

# Core app views. All core app views are authenticated using JWT token authorization.
class UserRegistrationView(GenericAPIView):
    """
    This view is created for any user to register to HomeFinder application. 
    Validated the user infomation and adds the user to database with pending status.
    """
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user_info = User.objects.filter(email_id=request.data['email_id'])
            if len(user_info) > 0:
                user_info = user_info[0]
            if not user_info:
                data = serializer.validated_data
                data['password'] = make_password(data['password'])
                user_info = serializer.save()
                serializer = UserRegistrationSerializer(user_info)
                response_data = {'message':'User registration successful','user_details': serializer.data}
                return JsonResponse(response_data, status=status.HTTP_201_CREATED)
            elif user_info.deleted_at:
                return JsonResponse({'message':'Cannot register, user deactivated'},status=status.HTTP_412_PRECONDITION_FAILED)
            else:
                return JsonResponse({'message':'User already exists with provided email id'},status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(GenericAPIView):
    """
    This view is created to validate user login.
    """
    def post(self,request):
        data = request.data
        email_id = data.get('email_id')
        password = data.get('password')
        if email_id and password:
            try:
                criterion1 = Q(deleted_at__isnull=True)
                criterion2 = Q(email_id=email_id)
                user = User.objects.get(criterion1 & criterion2)
                if user.user_status.name == 'approved':
                    encrypted_password = user.password
                    res = check_password(password,encrypted_password)
                    if res:
                        access_token = JWTAuthentication.generate_access_token(user.id)
                        user_serializer = UserLoginSerializer(user)
                        response_data = {'message':'Login successful','user_details': user_serializer.data, 'token': access_token}
                        return JsonResponse(response_data, status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'message': 'Invalid password'}, status=status.HTTP_412_PRECONDITION_FAILED)
                else:
                    return JsonResponse({'message': 'Cannot login, User is not approved'}, status=status.HTTP_412_PRECONDITION_FAILED)
            except Exception as ex:
                return JsonResponse({'message': str(ex)}, status=status.HTTP_404_NOT_FOUND)
        else:
            return JsonResponse({'message': 'Provide login details'}, status=status.HTTP_400_BAD_REQUEST)

class PendingUserView(GenericAPIView):
    """
    This view is created for Admin to retrive all users with pending status.
    """
    def get(self, request):
        admin = JWTAuthentication.validate_token(request)
        if JWTAuthentication.isAdmin(admin.id):
            try:
                criterion1 = ~Q(role__name ='admin')
                pending_users = User.objects.filter(criterion1)
                if pending_users:
                    serializer = RetriveUsersSerializer(pending_users,many=True)
                    response_data = {'message':'Users retrival succesful','users_list': serializer.data}
                    return JsonResponse(response_data,status=status.HTTP_200_OK,safe=False)
                else:                    
                    return JsonResponse({'message': 'No user found with pending status'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as ex:
                return JsonResponse({'message': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return JsonResponse({'message': 'Admin authentication failed'}, status=status.HTTP_412_PRECONDITION_FAILED)

class UpdateUserStatusView(GenericAPIView):
    """
    This view allows Admin to approve or reject the users whose registeration status is pending
    """
    def put(self, request):
        admin = JWTAuthentication.validate_token(request)  
        serializer = UserStatusUpdateSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            user_status = data.get('user_status')  
            if JWTAuthentication.isAdmin(admin.id):
                try:
                    criterion1 = Q(deleted_at__isnull=True)
                    criterion2 = Q(id=data['id'])
                    user_info = User.objects.get(criterion1 & criterion2)
                    user_info.user_status_id = user_status
                    user_info.save()
                    user_info = User.objects.get(id=data['id'])
                    name = user_info.first_name
                    if user_info.user_status.name == "approved":
                        body = "Hi {},\n Congratulations, we have approved your registration.\
                            '\n To Login, please use email id and password provided at the time of registration.".format(name)
                        Util.send_email('Home Finder account update', body, 'from@gmail.com', [user_info.email_id])
                    else:
                        body = "Hi {},\n Sorry, as provide information does not qaulify our standards,\
                             your registration can not be approved.\
                            '\n Please contact support for more information".format(name)
                        Util.send_email('Home Finder account update',body, 'from@gmail.com', [user_info.email_id])
                    return JsonResponse({'message': 'Update successful'}, status=status.HTTP_201_CREATED)
                except Exception as ex:
                    return JsonResponse({'message': str(ex)}, status=status.HTTP_404_NOT_FOUND)
            else:
                return JsonResponse({'message': 'Admin authentication failed'}, status=status.HTTP_412_PRECONDITION_FAILED)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserAccountInfo(GenericAPIView):
    """
    This view allows to retrive user account profile
    """
    def get(self,request):
        user = JWTAuthentication.validate_token(request)
        try:
            user_account = UserAdditionalInfo.objects.get(user=user.id)
            serializer = UserAdditionalInfoSerializer(user_account)    
            response_data = {'message':'User details retrival succesful','user_deatils': serializer.data}
            return JsonResponse(response_data,status=status.HTTP_200_OK)  
        except: 
            serializer = UserRegistrationSerializer(user)
            response_data = {'message':'User details retrival succesful','user_deatils': serializer.data}
            return JsonResponse(response_data,status=status.HTTP_200_OK)

class RemoveUserView(GenericAPIView):
    """
    This view allows Admin to remove users
    """
    def post(self, request):
        admin = JWTAuthentication.validate_token(request)
        serializer = UserStatusUpdateSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            user_id = data.get('id')
            user_status = data.get('user_status')
            reason = data.get('deleted_why')
            if JWTAuthentication.isAdmin(admin.id):
                try:
                    user = User.objects.get(id=user_id)
                    user.user_status_id= user_status
                    user.deleted_at = timezone.now()
                    user.deleted_why = reason
                    user.is_active = False
                    user.save()
                    return JsonResponse({'message': 'User deleted'}, status=status.HTTP_201_CREATED)
                except Exception as ex:
                    return JsonResponse({'message': str(ex)}, status=status.HTTP_404_NOT_FOUND)
            else:
                return JsonResponse({'message': 'Admin authentication failed'}, status=status.HTTP_412_PRECONDITION_FAILED)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
