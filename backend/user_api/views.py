import requests
from django.contrib.auth import login, logout
from .models import Token, TokenData
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import api_view, \
    authentication_classes, permission_classes
from .serializer import LoginSerializer, UserRegisterSerializer, TokenSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from django.shortcuts import redirect
from django.middleware.csrf import get_token
import sys;

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def index(request):
    return Response(status = status.HTTP_200_OK)

@api_view(['POST'])
def user_login(request):
  serializer = LoginSerializer(data=request.data)
  serializer.is_valid(raise_exception=True)
  user = serializer.validate(request.data) 
  login(request, user)
  return Response(serializer.data)

@api_view(['GET'])
def user_logout(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def user_profile(request):
    return Response('{"Hello" : "Reda"}')
    serializer = TokenSerializer(data = request.data)
    serializer.is_valid(raise_exception = True)
    print("token python: " + serializer.data, file=sys.stderr);
    token = serializer.data['token']
    url = 'https://api.intra.42.fr/v2/me'
    print("token real: " + code, file=sys.stderr);
    headers = {'authorization': f'Bearer {token}'}
    api_call = requests.get(url, headers = headers).json()
    return Response('{"Hello" : "Reda"}')
    return Response(api_call)

@api_view(['GET', 'POST'])
def authorize_42(request):
    return Response('{"Hello" : "Reda"}')

@api_view(['GET', 'POST'])
def token_42(request):
    serializer = TokenSerializer(data = request.data)
    serializer.is_valid(raise_exception = True)
    code = serializer.data['code']
    print("code: " + code, file=sys.stderr);
    url = 'https://api.intra.42.fr/oauth/token'
    params = {'grant_type': 'authorization_code',
              'client_id' : 'u-s4t2ud-7f57f7b3379f7f1c41bcded4163c98e58c344d1bb2add8917d428ffdd1ba28ab',
              'client_secret' : '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',
              'code' : code,
              'redirect_uri' : 'http://127.0.0.1:3000'
     }
    api_call = requests.post(url, params)
    data = api_call.json()
    return Response(data)

@api_view(['POST'])
def register(request):
    data = request.data
    serializer = UserRegisterSerializer(data = request.data)
    if serializer.is_valid(raise_exception = True):
        user = serializer.create(data)
        if user:
            return Response(serializer.data)
    return Response(status = status.HTTP_200_OK)
