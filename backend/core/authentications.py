import jwt
from core.models import User
from django.conf import settings
from rest_framework import authentication, exceptions
from django.http.response import JsonResponse
from rest_framework import status

class JWTAuthentication():
    @staticmethod
    def generate_access_token(userId):
        jwt_token = jwt.encode(
            {'id': userId}, settings.JWT_SECRET_KEY,settings.JWT_ALGORITHM)
        access_token = jwt_token.decode('utf-8')
        return access_token

    @staticmethod
    def isAdmin(userId):
        isAdmin_ = False
        user_info = User.objects.filter(role__name='admin',id = userId)
        if user_info:
            isAdmin_ = True
        return isAdmin_

    @staticmethod
    def validate_token(request):
        access_token = request.headers.get('authorization',None)
        if access_token:
            try:
                payload = jwt.decode(access_token, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM)
                user = User.objects.get(id = payload.get('id'))
                return user

            except jwt.DecodeError as identifier:
                raise exceptions.AuthenticationFailed(
                    'Your token is invalid')
            except jwt.ExpiredSignatureError as identifier:
                raise exceptions.AuthenticationFailed(
                    'Your token is expired')
        else:
            raise exceptions.AuthenticationFailed('Authorization Header missing')