from django.db import models

# Create your models here.

class Token(models.Model):
    access_token = models.CharField(max_length = 64)
    token_type = models.CharField(max_length = 6)
    expires_in = models.IntegerField(null = True)
    refresh_token = models.CharField(max_length = 64)
    scope = models.CharField(max_length = 6)
    created_at = models.IntegerField(null = True)
    secret_valid_until = models.IntegerField(null = True)
    code = models.CharField(max_length = 64, default = "")

class TokenData(models.Model):
    access_token = models.JSONField("TokenDetails", default=dict)
