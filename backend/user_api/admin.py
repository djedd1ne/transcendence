from django.contrib import admin
from .models import Token, TokenData

# Register your models here.
admin.site.register(Token)
admin.site.register(TokenData)
