export const supervised = () => {
  return `import matplotlib.pyplot as plt 
import numpy as np 
from sklearn.model_selection import train_test_split`;
};

export const nlp = () => {
  return `#!pip install wit #Uncomment this to install
from wit import Wit
import pandas as pd`;
};

export const linear = () => {
  return `from sklearn import linear_model
from sklearn.metrics import mean_squared_error, r2_score`;
};

export const poisson = () => {
  return `from sklearn import linear_model
from sklearn.metrics import mean_poisson_deviance`;
};

export const ordinal = () => {
  return `#!pip install mord #Uncomment this to install
import mord
from sklearn.metrics import accuracy_score`;
};

export const knn = () => {
  return `from sklearn import neighbors`;
};

export const nn = () => {
  return `from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Input`;
};

export const autoencoders = () => {
  return `
import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras import datasets, layers, models, backend, optimizers`;
};

export const sklearnDatasets = () => {
  return `from sklearn import datasets`;
};

export const normalization = () => {
  return `from sklearn.preprocessing import scale`;
};

export const pca = () => {
  return `from sklearn.decomposition import PCA`;
};

export const textCleaning = () => {
  return `import re`;
};
