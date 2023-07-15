import pickle

import cv2
import mediapipe as mp
import numpy as np

def sign_lang_recognition_isl():

    model_dict1 = pickle.load(open('D:\Documents\GEC Online Classes\ISL-model\Sign-Suno\model1_new.p', 'rb'))
    model_dict2 = pickle.load(open('D:\Documents\GEC Online Classes\ISL-model\Sign-Suno\model2_new.p', 'rb'))
    model1 = model_dict1['model1']
    model2 = model_dict2['model2']


    cap = cv2.VideoCapture(r"D:\Documents\GEC Online Classes\backend_py_3_10\sign_suno\videos\recorded-video.mp4")
    # cap = cv2.VideoCapture(0)

    temp_list =[]

    mp_hands = mp.solutions.hands
    mp_drawing = mp.solutions.drawing_utils
    mp_drawing_styles = mp.solutions.drawing_styles

    hands = mp_hands.Hands(static_image_mode=True, max_num_hands=2 ,min_detection_confidence=0.3)

    #labels_dict1 = {0: '1', 1: '3', 2: '4',3: '5', 4: '7',5:'8',6: '9', 7: 'A', 8: 'B',9: 'C', 10: 'D',11:'Dont_like',12:'E',13:'F',14:'G',15:'H',16:'I',17:'J',18:'K',19:'L',20:'Like',21:'Love',22:'M',23:'N',24:'O_OR_0',25:'P',26:'Q',27:'R',28:'S',29:'T',30:'U',31:'V_OR_2',32:'W_OR_6',33:'X',34:'Y',35:'Yes',36:'Z'}
    #labels_dict2 = {0: 'Baby', 1: 'Brother', 2:'Friend', 3:'Help', 4:'House', 5:'Make', 6:'More', 7:'Name', 8:'No', 9:'Pay', 10:'Play', 11:'Stop', 12:'With'}

    #labels_dict1 = {0:'1',1:'3',2:'4',3:'5',4:'7',5:'8',6:'9',7:'A',8:'B',9:'C',10:'D',11:'Dont_Like',12:'E',13:'F',14:'G',15:'H',16:'I',17:'J',18:'K',19:'L',20:'Like',21:'Love',22:'M',23:'N',24:'No',25:'O_OR_0',26:'P',27:'Q',28:'R',29:'S',30:'T',31:'U',32:'V_OR_2',33:'W_OR_6',34:'X',35:'Y',36:'Yes',37:'Z'}
    #labels_dict2 = {0:'Baby',1:'Brother',2:'Friend',3:'Help',4:'House',5:'Make',6:'More',7:'Name',8:'Pay',9:'Play',10:'Stop',11:'Wait'}

    #labels_dict1 = {0:'1', 1:'3', 2:'4', 3:'5', 4:'7', 5:'8', 6:'9', 7:'A',8:'B',9:'C',10:'D',11:'E',12:'F',13:'G',14:'H',15:'I',16:'J',17:'K',18:'L',19:'M',20:'N',21:'O_OR_0',22:'P',23:'Q',24:'R',25:'S',26:'T',27:'U',28:'V_OR_2',29:'W_OR_6',30:'X',31:'Y',32:'Z',33:'Dont_like',34:'Hello',35:'Like',36:'Love',37:'My',38:'No',39:'Space',40:'What',41:'Yes',42:'Your'}
    #labels_dict2 = {0:'Afternoon',1:'Good',2:'Help',3:'House',4:'Make',5:'More',6:'Morning',7:'Name',8:'Pay'}
    #words = ['Dont_like', 'Hello', 'Like', 'Love', 'My', 'No', 'What', 'Yes', 'Your', 'Afternoon', 'Good', 'Help','House', 'Make', 'More', 'Morning', 'Name', 'Pay']

### Trusha and Ishaani dataset
    #labels_dict1 = {0:'C', 1:'I', 2:'L', 3:'O', 4:'U', 5:'V', 6:'Hello ', 7:'I',8:'My ',9:'What ',10:'You '}
    #labels_dict2 = {0:'A',1:'B',2:'D',3:'E',4:'F',5:'G',6:'H',7:'J',8:'K', 9:'M',10:'N',11:'P',12:'Q',13:'R',14:'S',15:'T',16:'W',17:'X',18:'Y',19:'Z',20:'Happy ',21:'House ',22:'How ',23:'Love ',24:'Namaste ',25:'Name ',26:'Study ',27:'Thank you '}
    #words = []

### My own dataset
    labels_dict1 = {0:'C', 1:'I', 2:'J', 3:'L', 4:'O', 5:'U', 6:'V', 7:'Hello ',8:'Love ',9:'Please ',10:'Name'
                    , 11:'Space', 12:'What', 13:'You'}
    labels_dict2 = {0:'A',1:'B',2:'D',3:'E',4:'F',5:'G',6:'H',7:'K', 8:'M',9:'N',10:'P',11:'Q',12:'R',13:'S',
                    14:'T',15:'W',16:'X',17:'Y',18:'Z',19:'House ',20:'Help ',21:'How are you? ',22:'Namaste ',
                    23:'Thank you '}
    words = ['Hello','Love','Please','Name','Space','What','You','House','Help','How are you?','Namaste','Thank you']

    while True:

        data_aux = []
        x_ = []
        y_ = []

        ret, frame = cap.read()

        if not ret:
            break

        H, W, _ = frame.shape

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        results = hands.process(frame_rgb)
        if results.multi_hand_landmarks:
            n = len(results.multi_hand_landmarks)
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(
                    frame,  # image to draw
                    hand_landmarks,  # model output
                    mp_hands.HAND_CONNECTIONS,  # hand connections
                    mp_drawing_styles.get_default_hand_landmarks_style(),
                    mp_drawing_styles.get_default_hand_connections_style())

            for hand_landmarks in results.multi_hand_landmarks:
                for i in range(len(hand_landmarks.landmark)):
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y

                    x_.append(x)
                    y_.append(y)

                for i in range(len(hand_landmarks.landmark)):
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y
                    data_aux.append(x - min(x_))
                    data_aux.append(y - min(y_))
            if n==1:
                
                x1 = int(min(x_) * W) - 10
                y1 = int(min(y_) * H) - 10

                x2 = int(max(x_) * W) - 10
                y2 = int(max(y_) * H) - 10

                prediction1 = model1.predict([np.asarray(data_aux)])

                predicted_character1 = labels_dict1[int(prediction1[0])]
                # print(predicted_character1)
                temp_list.append(predicted_character1)

                # cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)
                # cv2.putText(frame, predicted_character1, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3,
                #            cv2.LINE_AA)
            else:
                x1 = int(min(x_) * W) - 10
                y1 = int(min(y_) * H) - 10

                x2 = int(max(x_) * W) - 10
                y2 = int(max(y_) * H) - 10

                prediction2 = model2.predict([np.asarray(data_aux)])

                predicted_character2 = labels_dict2[int(prediction2[0])]
                # print(predicted_character2)
                temp_list.append(predicted_character2)
                # cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)
                # cv2.putText(frame, predicted_character2, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3,
                #           cv2.LINE_AA)

        # cv2.imshow('frame', frame)
        # if cv2.waitKey(1) & 0xFF == ord('q'):
        #     is_cam_on = False

    final =[]
    print("FINAL TEMP:",temp_list)

    filtered_list = []
    current_word = None
    current_count = 0

    for word in temp_list:
        if word == current_word:
            current_count += 1
        else:
            current_word = word
            current_count = 1

        if current_count > 10:
            filtered_list.append(word)


    print("\n\ntemp:: ",filtered_list)

    for i in range(len(filtered_list)-1):
        if filtered_list[i] != filtered_list[i+1]:
            final.append(filtered_list[i])
            
    final.append(filtered_list[len(filtered_list)-1])
            
    print("\n\nekdum final",final)

    txt=""

    for i in range(len(final)):
        if final[i] == 'Space':
            txt = txt + " "

        elif final[i] in words:
           txt = txt + " " + final[i] + " "

        else:
            txt = txt + final[i]
        
    print("\n\n",txt)

    return txt


# sign_lang_recognition_isl()