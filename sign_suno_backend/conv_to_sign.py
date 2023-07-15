import nltk
from nltk.tokenize import word_tokenize
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
# from asl_conditionals import *

import nltk
import string

# import os
# import django

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sign_suno_backend.settings')
# django.setup()


# import sys
# sys.path.append('D:\\Documents\\GEC Online Classes\\backend\sign_suno')
# print("system paths:",sys.path)
# from sign_suno_backend.models import animations
# D:\Documents\GEC Online Classes\backend\sign_suno\sign_suno_backend\models.py


##PACKAGE FUNCTIONS
#1. Rule for question words
def get_question(word, sentence):
    if word == "how" or word == "who":
        sentence.remove(word)
        return [word] + sentence
    elif word == "what" or word == "when":
        for each in sentence:
            # print(each)
            tag = nltk.pos_tag([each])
            verb = None
            #print(tag[0][1])
            if tag[0][1].startswith("VB"):
                verb = tag[0][0]
                break
        if verb:
                sentence.remove(word)
                # punct = sentence.pop()
                return [word] + sentence
        else:
            sentence.remove(word)
            # punct = sentence.pop()
            return sentence + [word]  
    elif word == "where" or word == "why":
        sentence.remove(word)
        # punct = sentence.pop()
        return sentence + [word]
    else:
        return sentence


#2. Replace words with letters if not matched to db
def get_letters(sentence, database):


    # database = ["a", "b", "bad", "bye","c", "d", "doing", "e", "f", "from", "g", 
    #             "good", "great","h", "hello", "how", "how are you", "how many", 
    #             "how much", "i", "j", "k", "l", "love", "m", "me", "meet", "my","n", 
    #             "name", "nice", "no", "o", "p", "please", "q", "r", "s", "sorry", 
    #             "t", "thank you", "u", "v", "w", "what", "when", "who", "where", 
    #             "x", "y", "yes", "you", "z"
    #             ]
    
    new_sentence = []
    for word in sentence:
        if word.lower() in database:
            new_sentence.append(word)
        else:
            letters = list(word)
            new_sentence.append(letters)
    return new_sentence


#3. Time-based words at the beginning of the sentence
time_words = ['now', 'later', 'tomorrow', 'yesterday', 'today', 'tonight', 
              'morning', 'afternoon', 'evening', 'night', 
              'week', 'weekend', 'month', 'year', 
              'season', 'holiday', 'annual', 'birthday', 'anniversary', 
              'weekday', 'weeknight', 'weekend', 'daily', 'weekly', 'monthly', 'annually', 'quarterly', 
              'seasonally', 'hourly', 'minutely', 'secondly', 
              'moment', 'midnight', 'noon', 'dawn', 'dusk', 'early', 'late', 
              'past', 'present', 'future', 'before', 'after', 'during', 'then', 'soon', 
              'already', 'recently', 'currently', 'always', 'never', 'sometimes']

def get_time(word, sentence):
    if word.lower() in time_words:
        sentence.remove(word)
        return [word] + sentence
    else:
        return sentence

#4. removing punctuations
def remove_punctuations(sentence):
    new_sentence = []
    punct_set = list(set(string.punctuation))
    # print(punct_set)
    for each in sentence:
        if each not in punct_set:
            new_sentence.append(each)
        else:
            continue
    return new_sentence


##MAIN FUNCTIONS OF MODULE
#1. Removing stop words
def remove_stop_words(nltk_tokens, stop_words):
    #Remove stopwords
    words_retained = []
    for word in nltk_tokens:
        if word not in stop_words:
            words_retained.append(word)
    new_sent = stem_lem(words_retained)
    return new_sent

def stem_lem(new_tokens):
    #Stemming and Lemmatization
    lemmatizer = WordNetLemmatizer()
    stemmer = PorterStemmer()
    asl_text = []
    for word in new_tokens:
        word = stemmer.stem(word)
        word = lemmatizer.lemmatize(word, "v")
        asl_text.append(word)
    return asl_text

#To convert list of lists into a single list of characters and words
def flatten_list(l):
    flattened_list = []
    for item in l:
        if isinstance(item, list):
            flattened_list += flatten_list(item)
        else:
            flattened_list.append(item)
    return flattened_list


def text_to_sign(t, database):
    #Accept input as text from sonali's code
    #text = "My name is Trusha. What is your name? I will tell you tomorrow."
    # text = "My brown dog named Bruno chased a small cat yesterday."
    # text = "Good morning. My name is Trusha. What is your name? What are you doing? When are you going?"
    text = t

    #Segmentation
    nltk_sents = nltk.sent_tokenize(text)
    #Customising stopwords
    stop_words = ['yourselves', 'its', 'themselves', 'am', 'is', 'are', 'were', 
                'be', 'been', 'being', 'a', 'an', 'the', 'or', 'of', 'at', 'by', 
                'above', 'off', 'further',  'once', 'such', 'nor', 'so']

    #Tokenization
    final = []
    qwords = ["when", "where", "what", "who", "how"]
    sentence_list = []
    for each in nltk_sents:
        nltk_tokens = nltk.word_tokenize(each)
        pos_tags = nltk.pos_tag(nltk_tokens)
        #print(pos_tags)
        final.append(remove_stop_words(nltk_tokens, stop_words))

    for sentence in final:
        sentence = remove_punctuations(sentence)
        for each in sentence:
            #Question words
            if each in qwords:
                sentence = get_question(each, sentence)
            #Time words
            sentence = get_time(each, sentence)
            #Words to Letter list
            new_sentence = get_letters(sentence, database)


        sentence_list.append(new_sentence)

    print("final",sentence_list)
    final_tags = flatten_list(sentence_list)

    print("\n###########\n",final_tags)
    return(final_tags)

# xyz = text_to_sign("My name is megan")