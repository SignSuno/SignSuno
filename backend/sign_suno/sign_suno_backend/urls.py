from django.urls import path
# from .views import UserRegView, VerifyOTP, LoginView, LogoutView, SavePhraseView,GetPhrasesView,ResetPassDetailsView
from .views import *

urlpatterns = [
    path('register', UserRegView.as_view()),
    path('verify_otp', VerifyOTP.as_view()),
    
    path('pass_reset_details', ResetPassDetailsView.as_view()),
    path('pass_reset_otp', ResetPassOTPView.as_view()),
    path('pass_reset', ResetPassword.as_view()),

    path('logout', LogoutView.as_view()),
    path('login', LoginView.as_view()),
    path('userCheck', CheckUserview.as_view()), #for checking if user exists
    path('profile_user', getUserView.as_view()),
    path('change_details', detailsChangeView.as_view()),
    path('delete_account', deleteAccountView.as_view()),

    path('profile_pic', getProfileView.as_view()),
    path('upload_profile', UploadProfileView.as_view()),


    path('save_phrase', SavePhraseView.as_view()),
    path('getPhrases', GetPhrasesView.as_view()),
    path('delete_phrase', DeletePhraseView.as_view()),

    path('create_leaderboard_user', createLeaderView.as_view()),
    path('leaderboard_users', AllUsersView.as_view()),
    path('current_user', CurrentUserView.as_view()),
    path('update_score', updateScoreView.as_view()),
    path('user_rank_xp', getLeaderBoardDetails.as_view()),

    path('speech_text', SpeechTextView.as_view()),
    path('text_sign', TextSignView.as_view()),
    path('animate', AnimationView.as_view()),
    path('asl_sign_detection', ASLDetectionView.as_view()),
    path('isl_sign_detection', ISLDetectionView.as_view()),
    path('text_speech', TextSpeechView.as_view()),

]