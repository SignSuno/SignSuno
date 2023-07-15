import nltk
from nltk.tokenize import word_tokenize
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
from my_package.asl_conditionals import *

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
    

#Accept input as text from sonali's code
#text = "My name is Trusha. What is your name? I will tell you tomorrow."
#text = "My brown dog named Bruno chased a small cat yesterday."
text = "Good morning. My name is Trusha. What is your name? What are you doing? When are you going?"

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

    print(final)

for sentence in final:
    sentence = remove_punctuations(sentence)
    for each in sentence:
        #Question words
        if each in qwords:
            sentence = get_question(each, sentence)
        #Time words
        sentence = get_time(each, sentence)
        #Words to Letter list
        new_sentence = get_letters(sentence)


    sentence_list.append(new_sentence)

print(sentence_list)