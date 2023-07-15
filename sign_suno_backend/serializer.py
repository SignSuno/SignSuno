# You will need serializers to convert model instances to JSON so that the frontend can work with the received data.
# This code specifies the model to work with and the fields to be converted to JSON.

from rest_framework import serializers
from .models import *

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.views import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ("id", "username", "name", "email_id", "password", "is_verified")

        extra_kwargs = {'password': {
            'write_only': True
        }}
    
    def create(self, validated_data):
        password = validated_data.get('password')
        if password:
            hashed_password = make_password(password)
            validated_data['password'] = hashed_password
        return super().create(validated_data)

class ResetPassSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ("password",)

        extra_kwargs = {'password': {
            'write_only': True
        }}
    
    def create(self, validated_data):
        password = validated_data.get('password')
        if password:
            hashed_password = make_password(password)
            validated_data['password'] = hashed_password
        return super().create(validated_data)
    

class VerifyOTPSerializer(serializers.Serializer):
    email_id = serializers.EmailField()
    otp = serializers.CharField() 


class FavSerializer(serializers.ModelSerializer):
    class Meta:
        model = favs
        fields = ("username", "word_phrase", "freq") 

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = leader
        fields = ("username", "score") 

class AnimationSerializer(serializers.ModelSerializer):
    class Meta:
        model = animations
        fields = ("tag", "video") 
 