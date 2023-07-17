from django.core.mail import send_mail
import random
from django.conf import settings
from .models import user


def send_otp_via_email(username,email):
    subject = f"Welcome to Sign Suno Family!"
    otp = random.randint(100000, 999999)
    message = f'Your OTP for email verification is: {otp}'
    # email_from = settings.EMAIL_HOST
    send_mail(subject, message, 'sign suno', [email])

    user_obj = user.objects.get(username=username, email_id = email)
    user_obj.otp = otp
    user_obj.save()