from rest_framework.views import APIView
# from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializer import UserSerializer, FavSerializer
from .models import *
from django.contrib.auth.hashers import check_password
from django.http import HttpResponse
import jwt, datetime

from .serializer import *
from .emails import *
from .speech_to_text import *

# Create your views here.

#Registration
class UserRegView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            send_otp_via_email(serializer.data['email_id'])
            return Response({
                'status': 200,
                'message': 'success',
                'data': serializer.data
            })
        return Response({
                'status': 400,
                'message': 'something went wrong',
                'data': serializer.errors
        })

class VerifyOTP(APIView):
    def post(self, request):
        # data = request.data
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.data['email_id']
            otp = serializer.data['otp']

            user1 = user.objects.filter(email_id = email)
            if not user1.exists():
                return Response({
                    'status': 400,
                    'message': 'something went wrong',
                    'data': serializer.errors
                })
            if not user1[0].otp == otp:
                return Response({
                    'status': 400,
                    'message': 'something went wrong',
                    'data': serializer.errors
                })
            
            user1 = user1.first()
            user1.is_verified = True
            user1.save()

            return Response({
                    'status': 200,
                    'message': 'account verified',
                    'data': ''
                })


#reset password
class ResetPassDetailsView(APIView):
    def post(self, request):
        userId = request.data['username']

        user1 = user.objects.filter(username=userId).first()
        print("*************************",user1.email_id)
        if user1 is None:
            return Response({
                'status': 400,
                'message': 'User  does not exist'
            })
        else:
            send_otp_via_email(user1.email_id)
            return Response({
                'status': 200,
                'message': 'success',
            })

class ResetPassOTPView(APIView):
    def post(self, request):
        # data = request.data
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            otp = serializer.data['otp']
            email = serializer.data['email_id']

            user1 = user.objects.filter(email_id = email)
            if not user1.exists():
                return Response({
                    'status': 400,
                    'message': 'something went wrong',
                    'data': serializer.errors
                })
            if not user1[0].otp == otp:
                return Response({
                    'status': 400,
                    'message': 'something went wrong',
                    'data': serializer.errors
                })

            return Response({
                    'status': 200,
                    'message': 'account verified',
                    'data': ''
                })

class ResetPassword(APIView):
    def post(self, request):
        serializer = ResetPassSerializer(data=request.data)
        print('serializer: ',serializer)
        
        if serializer.is_valid():
            userId = request.data['username']
            print("****user: ",userId)
            password = request.data['password']
            print("****password: ",password)
                
            user1 = user.objects.filter(username=userId).first()
            print('user1',user1)

            if user1 is not None:
                user2 = user.objects.get(username=user1.username)
                print('user2',user2)
                user2.password = make_password(password)
                user2.save()
                serializer = UserSerializer(instance=user2)
                updated_data = serializer.data

                return Response({
                'status': 200,
                'message': 'success',
                'data': updated_data
                })
        
        return Response({
                'status': 400,
                'message': 'something went wrong',
                'data': serializer.errors
        })


#login and logout
class LoginView(APIView):
    def post(self, request):
        userId = request.data['username']
        password = request.data['password']

        user1 = user.objects.filter(username=userId).first()
        stored_password = user1.password
    
        if user1 is None:
            raise AuthenticationFailed('User not found!')

        if not check_password(password, stored_password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user1.username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256') #.decode('utf-8')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'status': 200,
            'jwt': token
        }

        return response

    def get(self, request):
        token = request.headers['Authorization']
        print('Token got in: ', token)

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user1 = user.objects.filter(username=payload['id']).first()
        serializer = UserSerializer(user1)
        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'successfully logged out'
        }
        return response

class CheckUserview(APIView):
    def post(self, request):
        userId = request.data['username']

        user1 = user.objects.filter(username=userId).first()
    
        if user1 is not None:
            return Response({
                'status': 200,
            })
        
        return Response({
                'status': 400,
        })


#profile (user details)
class getUserView(APIView):
    def post(self, request):
        user_id = request.data['username']
        result = user.objects.filter(username=user_id).first()

        if result is not None:
            serializer = UserSerializer(result)
            return Response({
                'status': 200,
                'data': serializer.data
            })
        
        return Response({
                'status': 400,
        })

class getLeaderBoardDetails(APIView):
    def post(self, request):
        userId = request.data['username']
        
        queryset = list(leader.objects.all().order_by('-score'))
        print("****************QuerySet\n",queryset)
        rank = 1
        score =0

        for record in queryset:
            serializer = ScoreSerializer(record)
            print("username:", serializer.data['username'])
            if userId == serializer.data['username']:
                score = serializer.data['score']
                break
            rank+=1

        return Response({
                'status': 200,
                'rank' : rank,
                'score' : score,

            })

#NEED TO FIXXXXXXXXX
# class detailsChangeView(APIView):
#     def post(self, request):

#         oldId = request.data['username']
#         newId = request.data['newuser']
#         newName = request.data['name']
#         newEmail = request.data['email_id']

#         print(oldId,newId,newName,newEmail)

#         record = user.objects.filter(username=oldId)
#         print("record:",record)

#         if record is not None:
#             #update values
#             # record.update(username=newId)
#             record.update(username=newId)
#             record.update(name=newName)
#             record.update(email_id=newEmail)
#             # record.username = newId
#             # record.name = newName
#             # record.email_id = newEmail
#             record.save()

#             serializer = UserSerializer(instance=record)
#             updated_data = serializer.data
#             return Response({
#                     'status': 200,
#                     'message': 'success',
#                     'data': updated_data
#                 })

#         return Response({
#             'status': 400,
#             'message': 'something went wrong',
#             # 'data': serializer.errors
#         })

class detailsChangeView(APIView):
    def put(self, request):

        oldId = request.data['username']
        newId = request.data['newuser']
        newName = request.data['name']
        newEmail = request.data['email_id']

        print(oldId,newId,newName,newEmail)

        record = user.objects.get(username=oldId)
        print("record:",record)

        if record is not None:
            #update values
            # record.update(username=newId)
            record.update(username=newId)
            record.update(name=newName)
            record.update(email_id=newEmail)
            # record.username = newId
            # record.name = newName
            # record.email_id = newEmail
            # record.save()

            serializer = UserSerializer(instance=record)
            updated_data = serializer.data
            return Response({
                    'status': 200,
                    'message': 'success',
                    'data': updated_data
                })

        return Response({
            'status': 400,
            'message': 'something went wrong',
            # 'data': serializer.errors
        })

class deleteAccountView(APIView):
    def post(self, request):
        userID = request.data['username']

        record = user.objects.filter(username=userID).first()
        print("record:",record)

        if record is not None:
           record.delete()
           return Response({
                'status': 200,
            })

        return Response({
            'status': 400,
            'message': 'something went wrong',
        })

#fav phrases
class SavePhraseView(APIView):
    def post(self, request):
        serializer = FavSerializer(data=request.data)
        print('serializer',serializer)
        # print(request.data['freq'])
        if serializer.is_valid():
            userId = request.data['username']
            word = request.data['word_phrase']
            
            user1 = favs.objects.filter(username=userId, word_phrase=word).first()
            print('user1',user1)
            # print(user1.freq)

            if user1 is None:
                serializer.save()
                return Response({
                'status': 200,
                'message': 'success',
                'data': serializer.data
            })
            else:
                user2 = favs.objects.get(username=user1.username, word_phrase=word)
                print('user2',user2)
                user2.freq = user2.freq+1
                user2.save()
                serializer = FavSerializer(instance=user2)
                updated_data = serializer.data

                # serializer.validated_data.update({'freq': user1.freq})
                # print(serializer)
                # serializer.save()
                return Response({
                    'status': 200,
                    'message': 'success',
                    'data': updated_data
                })
        return Response({
                'status': 400,
                'message': 'something went wrong',
                'data': serializer.errors
        })

class GetPhrasesView(APIView):
    def post(self, request):
        final =[]
        serializer = FavSerializer(data=request.data)
        print('serializer',serializer)

        user_id = request.data['username']
        result = list(favs.objects.filter(username=user_id).order_by('-freq'))
        print("**************************RESULT\n",result)

        for record in result:
            serializer = FavSerializer(record)
            print("SERIALISER::",serializer)
            final.append(serializer.data['word_phrase'])
        
        print("**************************FINAL\n",final)

        return Response(final)

class DeletePhraseView(APIView):
    def post(self, request):
        serializer = FavSerializer(data=request.data)
        print('serializer',serializer)
        # print(request.data['freq'])
        if serializer.is_valid():
            userId = request.data['username']
            word = request.data['word_phrase']
            
            user1 = favs.objects.filter(username=userId, word_phrase=word).first()
            print('user1',user1)
            # print(user1.freq)

            if user1 is None:
                serializer.save()
                return Response({
                'status': 200,
                'message': 'success',
                'data': serializer.data
            })
            else:
                user2 = favs.objects.get(username=user1.username, word_phrase=word)
                print('user2',user2)
                user2.freq = user2.freq+1
                user2.save()
                serializer = FavSerializer(instance=user2)
                updated_data = serializer.data

                # serializer.validated_data.update({'freq': user1.freq})
                # print(serializer)
                # serializer.save()
                return Response({
                    'status': 200,
                    'message': 'success',
                    'data': updated_data
                })
        return Response({
                'status': 400,
                'message': 'something went wrong',
                'data': serializer.errors
        })
    

#leaderboard
class createLeaderView(APIView):
    def post(self,request):
        userId = request.data['username']
        serializer = ScoreSerializer(data=request.data)
        if serializer.is_valid():
            user1 = leader.objects.filter(username=userId).first()

            if user1 is None:
                serializer.save()
                return Response({
                    'status': 200,
                    'message': 'success',
                    'data': serializer.data
                })
        return Response({
                'status': 400,
                'message': 'something went wrong',
                'data': serializer.errors
        })

#leaderboard_users
class AllUsersView(APIView):
    def get(self, request):
        #dict inside list

        final =[]
        serializer = ScoreSerializer(data=request.data)
        # print('serializer',serializer)

        queryset = list(leader.objects.all().order_by('-score'))
        print(queryset)
        rank = 1

        for record in queryset:
            rec = {}
            serializer1 = ScoreSerializer(record)
            rec['rank']=rank
            rank+=1
            rec['username']=serializer1.data['username']
            rec['score']=serializer1.data['score']

            name = user.objects.filter(username=serializer1.data['username']).first()
            serializer2 = UserSerializer(name)
            print("SERIALISER2:",serializer2)
            rec['name']=serializer2.data['name']

            final.append(rec)
        
        print("**************************FINAL\n",final)

        return Response(final)

class CurrentUserView(APIView):
    def post(self, request):

        record ={}
        serializer = ScoreSerializer(data=request.data)
        print('serializer',serializer)

        queryset = leader.objects.filter(username=request.data['username']).first()
        print(queryset)

        serializer1 = ScoreSerializer(queryset)
        record['username']=serializer1.data['username']
        record['score']=serializer1.data['score']

        name = user.objects.filter(username=serializer1.data['username']).first()
        serializer2 = UserSerializer(name)
        print("SERIALISER2:",serializer2)
        record['name']=serializer2.data['name']

        print("**************************FINAL\n",record)

        return Response(record)

class updateScoreView(APIView):
    def post(self, request):
        serializer = ScoreSerializer(data=request.data)
        print('serializer::',serializer)

        # if serializer.is_valid():
        userId = request.data['username']

        print('userid::',userId)
        
        queryset = leader.objects.filter(username=userId).first()

        if queryset is not None:
            print('queryset',queryset)
            queryset.score = queryset.score+5
            queryset.save()
            serializer = ScoreSerializer(instance=queryset)
            updated_data = serializer.data

            return Response({
                'status': 200,
                'message': 'success',
                'data': updated_data
            })
        return Response({
            'status': 400,
            'message': 'something went wrong',
            'data': serializer.errors
        })


#communications
class SpeechTextView(APIView):
     def get(self, request):
        result = speech_text()
        return Response({'status': 200,'text': result})

#animations
# def video_view(request, video_id):
#     xyz = animations.objects.get(tag=video_id)
#     video_file = xyz.video
#     response = HttpResponse(video_file, content_type='video/mp4')
#     # response['Content-Disposition'] = f'inline; filename="{video.video_file.name}"'
#     return response

class AnimationView(APIView):
    def post(self, request):

        final = []
        tags = request.data['tags']
        print(tags)

        for val in tags:
            sign = animations.objects.filter(tag=val).first()
            print("SIGN:",sign)
            

            if sign is not None:
                serializer = AnimationSerializer(sign)
                # print("SERIALISER::",serializer)
                # print("TAG IS:",serializer.data['tag'])
                video_file = serializer.data['video']
                print("Video file:",video_file)
                # video_url = HttpResponse(video_file, content_type='video/mp4')
                # video_url = video_file.url
                # video_url = request.build_absolute_uri(video_file.url)
                # print("video URL: ",video_url)

                # video_file = serializer.data['video']
                # video_url = request.build_absolute_uri(video_file.url)
                final.append(video_file)
                print('FINAL:',final)
        # return HttpResponse(final)

        return Response({
            'status': 200,
            'message': 'success',
            'videos': final
        })
    
