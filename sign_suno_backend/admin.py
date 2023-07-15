from django.contrib import admin

# Register your models here.
from .models import *

@admin.register(user)
class userAdmin(admin.ModelAdmin):
    list_display = ["username", "name", "email_id", "password", "is_verified"]

@admin.register(favs)
class favAdmin(admin.ModelAdmin):
    list_display = ["username", "word_phrase", "freq"]

@admin.register(leader)
class leaderAdmin(admin.ModelAdmin):
    list_display = ["username", "score"]

@admin.register(animations)
class animationAdmin(admin.ModelAdmin):
    list_display = ["tag", "video"]