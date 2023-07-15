import nltk
import string

#Rule for question words
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
                return [word] + sentence
        else:
            sentence.remove(word)
            return sentence + [word]  
    elif word == "where" or word == "why":
        sentence.remove(word)
        return sentence + [word]
    else:
        return sentence


#Replace words with letters if not matched to db
def get_letters(sentence):
    database = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", 
                "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
                "D(handtalk)", "Hello", "How are you", "I(pronoun)", 
                "what", "when", "who", "why", "where", "how"]
    new_sentence = []
    for word in sentence:
        if word.lower() in database:
            new_sentence.append(word)
        else:
            letters = list(word)
            new_sentence.append(letters)
    return new_sentence


#Time-based words at the beginning of the sentence
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

