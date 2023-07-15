# Generated by Django 4.2.1 on 2023-05-30 09:20

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='animations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=200)),
                ('type', models.CharField(default='asl', max_length=10)),
                ('video', models.FileField(null=True, upload_to='videos_uploaded', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['MOV', 'avi', 'mp4', 'webm', 'mkv'])])),
            ],
        ),
        migrations.CreateModel(
            name='user',
            fields=[
                ('username', models.CharField(max_length=10, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=200)),
                ('email_id', models.EmailField(max_length=254)),
                ('password', models.TextField(max_length=16)),
                ('is_verified', models.BooleanField(default=False)),
                ('otp', models.CharField(blank=True, max_length=6, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_img', models.ImageField(blank=True, upload_to='profile')),
                ('userId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='sign_suno_backend.user')),
            ],
        ),
        migrations.CreateModel(
            name='leader',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(default=0)),
                ('username', models.OneToOneField(db_column='user', on_delete=django.db.models.deletion.CASCADE, to='sign_suno_backend.user')),
            ],
        ),
        migrations.CreateModel(
            name='favs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word_phrase', models.TextField(max_length=200)),
                ('freq', models.IntegerField(default=1)),
                ('username', models.ForeignKey(db_column='user', null=True, on_delete=django.db.models.deletion.CASCADE, to='sign_suno_backend.user')),
            ],
        ),
    ]
