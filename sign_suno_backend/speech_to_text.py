import speech_recognition as sr
# from js2py import Promise


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

    #with sr.Microphone() as source:
#print("Say something!")
#audio = r.listen(source,timeout=1,phrase_time_limit=10)