import tensorflow_hub as hub
import tensorflow as tf
from matplotlib import pyplot as plt
import numpy as np

# model = tf.saved_model.load('nst_model')
model = hub.load('nst_model')

def load_image(img_path):
    img = tf.io.read_file(img_path)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)
    img = img[tf.newaxis, :]
    return img

content_image = load_image('images/content/otter.jpg')
style_image = load_image('images/style/the_scream.png')

stylized_image = model(tf.constant(content_image), tf.constant(style_image))[0]

f, ax = plt.subplots(nrows=1, ncols=3)
ax[0].imshow(np.squeeze(content_image))
ax[0].axis('off')
ax[1].imshow(np.squeeze(style_image))
ax[1].axis('off')
ax[2].imshow(np.squeeze(stylized_image))
ax[2].axis('off')
plt.show()