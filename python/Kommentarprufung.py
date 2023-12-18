import matplotlib.pyplot as plt
import os
import re
import shutil
import string
import tensorflow as tf
import pandas as pd
import numpy
from sklearn.model_selection import train_test_split
from tensorflow import keras
from keras import layers
from keras import losses
import numpy as np
import torch
import pydot
import sys
from flask import jsonify

from numpy.random import seed
seed(42)

vectorisierungs_dataset = pd.read_csv(
    r"C:\Users\Mark\Desktop\reviewDetector-main\python\fakereviews.csv",
    names=["text_"])

print("hallo")

max_features = 10000
sequence_length = 250
embedding_dim = 16


def custom_standardization(input_data):
  lowercase = tf.strings.lower(input_data)
  stripped_html = tf.strings.regex_replace(lowercase, '<br />', ' ')
  return tf.strings.regex_replace(stripped_html,
                                  '[%s]' % re.escape(string.punctuation),
                                  '')

vectorize_layer = layers.TextVectorization(
    standardize=custom_standardization,
    max_tokens=max_features,
    output_mode='int',
    output_sequence_length=sequence_length)





model_two_inputs = tf.keras.saving.load_model(r"C:\Users\Mark\Desktop\reviewDetector-main\python\amazon_zwei_inputs.keras")
model_one_input = tf.keras.saving.load_model(r"C:\Users\Mark\Desktop\reviewDetector-main\python\amazon_ein_input.keras")




dataframe = pd.read_csv(
    r"C:\Users\Mark\Desktop\reviewDetector-main\python\fakereviews.csv",
    names=["category","rating","label","text_"])

one_input_df = dataframe.copy()[["label","text_"]]
one_input_df['labelzahl'] = one_input_df['label'].apply(lambda x: 1 if x=='CG' else 0)
one_input_df = one_input_df[["text_","labelzahl"]]


two_input_df = dataframe.copy()[["label","text_","rating"]]
two_input_df ['labelzahl'] = two_input_df['label'].apply(lambda x: 1 if x=='CG' else 0)
two_input_df['rating'] = two_input_df['rating'].apply(lambda x: 1 if x=='1.0' else 2 if x=='2.0' else 3 if x=='3.0' else 4 if x=='4.0'                                        
                                       else 5)
two_input_df = two_input_df[["text_","rating","labelzahl"]]


three_input_df = dataframe.copy()
three_input_df['category'] = three_input_df['category'].apply(lambda x: 1 if x=='Home_and_Kitchen_5' else 2 if x=='Sports_and_Outdoors_5' else 3 if x=='Electronics_5' else 4 if x=='Movies_and_TV_5'
                                      else 5 if x=='Tools_and_Home_Improvement_5' else 6 if x=='Kindle_Store_5' else 7 if x=='Pet_Supplies_5' else 8 if x=='Books_5'
                                      else 9 if x=='Toys_and_Games_5' else 10) 
"""if x=='Clothing_Shoes_and_Jewelry_5'"""
three_input_df['rating'] = three_input_df['rating'].apply(lambda x: 1 if x=='1.0' else 2 if x=='2.0' else 3 if x=='3.0' else 4 if x=='4.0'
                                       else 5) 
"""if x=='5.0'"""
three_input_df['labelzahl'] = three_input_df['label'].apply(lambda x: 1 if x=='CG' else 0)
three_input_df = three_input_df[["category","text_","rating","labelzahl"]]



def get_dataset_partitions_tf(ds=three_input_df, train_split=0.8, val_split=0.1, test_split=0.1):
    assert (train_split + test_split + val_split) == 1

    train_ds=ds.sample(frac=0.8)
    val_test_ds=ds.drop(train_ds.index)
    val_ds=val_test_ds.sample(frac=0.5)
    test_ds=val_test_ds.drop(val_ds.index)

    return train_ds, val_ds, test_ds

train_ds, val_ds, test_ds = get_dataset_partitions_tf(ds=three_input_df, train_split=0.8, val_split=0.1, test_split=0.1)


train_text = np.asarray(train_ds.pop('text_'))
val_text = np.asarray(val_ds.pop('text_'))
test_text = np.asarray(test_ds.pop('text_'))

vectorization_layer = vectorize_layer.adapt(train_text)
vectorization_layer = vectorize_layer.adapt(val_text)
vectorization_layer = vectorize_layer.adapt(test_text)

train_text = np.array(vectorize_layer(train_text))
val_text = np.array(vectorize_layer(val_text))
test_text = np.array(vectorize_layer(test_text))


""" def predict_review_three_inputs(text,rating,category,):

    array = [text]

    text_array = np.array(array)
    text_array[0] = text
    text_array = tf.convert_to_tensor(text_array)
    text_array = np.array(vectorize_layer(text_array))
    text_array = tf.cast(text_array, tf.int64)
    text_array = np.asarray(text_array).astype(np.int64)

    category_array = numpy.empty([1], dtype=int)
    category_array[0] = category
    category_array = tf.convert_to_tensor(category_array)
    category_array = tf.cast(category_array, tf.int64)
    category_array = np.expand_dims(category_array, axis=1)
    category_array = np.pad(category_array, ((0,0),(0,249)), mode='edge')

    rating_array = numpy.empty([1], dtype=int)
    rating_array[0] = rating
    rating_array = tf.convert_to_tensor(rating_array)
    rating_array = tf.cast(rating_array, tf.int64)
    rating_array = np.expand_dims(rating_array, axis=1)
    rating_array = np.pad(rating_array, ((0,0),(0,249)), mode='edge')


    prediction = model_three_inputs.predict(
    x={"text": text_array, "category": category_array, "rating": rating_array})

    "Werte größer als 0 sind Fake Reviews"
    return prediction[0] < 0 """

def predict_review_two_inputs(text,rating):

    array = [text]

    text_array = tf.convert_to_tensor(array)
    text_array = np.array(vectorize_layer(text_array))
    text_array = tf.cast(text_array, tf.int64)
    text_array = np.asarray(text_array).astype(np.int64)

    array2 = [rating]
    rating_array = tf.convert_to_tensor(array2)
    rating_array = tf.cast(rating_array, tf.int64)
    rating_array = np.expand_dims(rating_array, axis=1)
    rating_array = np.pad(rating_array, ((0,0),(0,249)), mode='edge')



    prediction = model_two_inputs.predict(
    x={"text": text_array, "rating": rating_array})

    if prediction[0] <= -2:
        return "real1"
    if -1 >= prediction[0] < -2:
        return "real2"
    if 0 > prediction[0] < -1:
        return "real3"
    if 0 <= prediction[0] < 1:
        return "fake3"
    if 1 <= prediction[0] < 2:
        return "fake2"
    if prediction[0] >= 2:
        return "fake1"


def predict_review_one_input(text):

    array = [text]

    array = vectorize_layer(array)

    print(array)

    prediction = model_one_input.predict(array)

    if prediction[0] <= -2:
        return "real1"
    if prediction[0] > -2 and prediction[0] <= -1:
        return "real2"
    if prediction[0] > -1 and prediction[0] <= 0:
        return "real3"
    if prediction[0] > 0 and prediction[0] <= 1:
        return "fake3"
    if prediction[0] > 1 and prediction[0] <= 2:
        return "fake2"
    if prediction[0] > 2:
        return "fake1"
    


