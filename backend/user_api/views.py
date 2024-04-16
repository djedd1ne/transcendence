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

# Create your views here.
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
def test_api(request):
    url = 'https://api.intra.42.fr/v2/me'
    token = Token.objects.get(pk=1).access_token
    headers = {'authorization': f'Bearer {token}'}
    api_call = requests.get(url, headers = headers).json()
    return Response(api_call)

@api_view(['GET', 'POST'])
def authorize_42(request):
    return Response('{"Hello" : "Reda"}')

@api_view(['GET', 'POST'])
def token_42(request):
    print("entered token42", file=sys.stderr)
    print("request code", file=sys.stderr)
    code = request.GET.get("code")
    print("code requested", file=sys.stderr)
    print("code is :" + code, file=sys.stderr)
    url = 'https://api.intra.42.fr/oauth/token'
    params = {'grant_type': 'authorization_code',
              'client_id' : 'u-s4t2ud-17c3d06c29a63f052756d513ba06d6d98b92ee95cb7b6a9dd4e66465af2477ab',
              'client_secret' : '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',
              'code' : code,
              'redirect_uri' : 'http://127.0.0.1:8000/api/42token'
     }
    api_call = requests.post(url, params)
    data = api_call.json()
    if list(data)[0] != "error":
        m = Token.objects.create(**data)
        return redirect('testapi')
    else:
        data = {"message" : "user already registered his token"}
        return redirect('testapi')
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
