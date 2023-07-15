import speech_recognition as sr

#trial code
# def speech_text():
#     r = sr.Recognizer()
#     print("Please Talk")
#     with sr.Microphone() as source:
#         # Records audio for 5 seconds and stores in a variable called audio
#         audio_data = r.listen(source)
#         print("Recognizing audio...")
#         text = r.recognize_google(audio_data, language='en-US', punctuation=True)
#         text = text.lower()
#         print(text)
    
#     return(text)


#sonali's code
def speech_text():
    r = sr.Recognizer()
    print("Please Talk")
    with sr.Microphone() as source:
        # Records audio for 5 seconds and stores in a variable called audio
        audio_data = r.record(source, duration=3)
        print("Recognizing audio...")
        text = r.recognize_google(audio_data)
        text = text.lower()
        print(text)
    
    return(text)
