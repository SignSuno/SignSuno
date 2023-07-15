from django.db import models
from django.core.validators import FileExtensionValidator
from django.db import models


class user(models.Model):
    username = models.CharField(max_length=10, unique =True, primary_key=True)
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

class profile(models.Model):
    userId = models.ForeignKey(user, on_delete=models.CASCADE, null=True)
    profile_img = models.ImageField(upload_to='profile', blank=True)

    # def get_profile_url(self):
    #     return self.profile_img.url

# class animations(models.Model):  
#     tag = models.CharField(max_length=200, primary_key = True)
#     type = models.CharField(max_length=10, default='asl')
#     video = models.FileField(upload_to='videos_uploaded',null=True, validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv'])])

#     # class Meta:
#     #     constraints = [
#     #         models.UniqueConstraint(fields=['tag', 'type'], name='id')
#     #     ]

#     def get_video_url(self):
#         return self.video.url

class animations(models.Model):  
    tag = models.CharField(max_length=200)
    type = models.CharField(max_length=10, default='asl')
    # "abc" "isl"
    # ensure "abc" "isl"
    # tagtype = "abc__isl" unique=True
    # tag = tagtype.split('__')[0]
    video = models.FileField(upload_to='videos_uploaded',null=True, validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv'])])

    def get_video_url(self):
        return self.video.url
    

USERNAME_FIELD = 'username'
REQUIRED_FIELDS =['username','password', 'email_id']