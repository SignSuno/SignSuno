from django.db import models
from django.core.validators import FileExtensionValidator


class user(models.Model):
    username = models.CharField(max_length=10, unique =True)
    name = models.CharField(max_length=200)
    email_id = models.EmailField(max_length=254)
    password = models.TextField(max_length=16)
    is_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, null=True, blank=True)
    

class favs(models.Model):
    username = models.ForeignKey(user, to_field="username", db_column="user", on_delete=models.CASCADE, null=True)
    word_phrase = models.TextField(max_length=200)
    freq = models.IntegerField(default=1)

class leader(models.Model):
    username = models.OneToOneField(user, to_field="username", db_column="user", on_delete=models.CASCADE)
    score = models.IntegerField(default=0)

# class profile(models.Model):
#     userId = models.ForeignKey(user, on_delete=models.CASCADE, null=True)
#     profile_img = models.ImageField(blank=True)

class animations(models.Model):  
    tag = models.CharField(max_length=200, primary_key=True)
    video = models.FileField(upload_to='videos_uploaded',null=True, validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv'])])
    # video = models.TextField(max_length=700,null=True)

    def get_video_url(self):
        return self.video.url

USERNAME_FIELD = 'username'
REQUIRED_FIELDS =['username','password', 'email_id']