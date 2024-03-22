from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate 

UserModel = get_user_model()

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Incorrect email or password.')
        if not user.is_active:
            raise serializers.ValidationError('User is disabled.')
        return user

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
    def create(self, data):
        user_obj = UserModel.objects.create_user(
                    username=data['username'], 
                    email=data['email'],
                    password=data['password'])
        user_obj.first_name=data['first_name']
        user_obj.last_name=data['last_name']    
        user_obj.groups.set('1') 
        user_obj.save()
        return user_obj

