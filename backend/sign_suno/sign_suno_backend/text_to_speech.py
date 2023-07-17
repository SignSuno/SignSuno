# ##CODE 1
# # Import the required module for text to speech conversion
# from gtts import gTTS

# # This module is imported so that we can play the converted audio
# import os

# def text_speech():
#     # The text that you want to convert to audio
#     mytext = 'Welcome to geeksforgeeks!'

#     # Language in which you want to convert
#     language = 'en'

#     # Passing the text and language to the engine,
#     # here we have marked slow=False. Which tells
#     # the module that the converted audio should
#     # have a high speed
#     myobj = gTTS(text=mytext, lang=language, slow=False)

#     # Saving the converted audio in a mp3 file named
#     # welcome
#     myobj.save("welcome.mp3")

#     # Playing the converted file
#     os.system("mpg321 welcome.mp3")


##CODE 2
import gtts
from playsound import playsound
import os

def text_speech(text):
    # make request to google to get synthesis
    tts = gtts.gTTS(text)

    # save the audio file
    # if os.path.exists("D:\\Documents\\GEC Online Classes\\backend_py_3_10\\sign_suno\\hello.mp3"):
    #     os.remove("D:\\Documents\\GEC Online Classes\\backend_py_3_10\\sign_suno\\hello.mp3")

    if os.path.exists("hello.mp3"):
        os.remove("hello.mp3")

    tts.save("hello.mp3")

    # play the audio file
    playsound("hello.mp3", block=False)

# text_speech('Hello world. Nice to meet you')