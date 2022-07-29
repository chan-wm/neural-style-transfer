from fastapi import FastAPI, File, UploadFile, Response
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
import io
from PIL import Image
import tensorflow as tf
import tensorflow_hub as hub
import cv2
from starlette.responses import StreamingResponse

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
model = hub.load('../nst_model')

def read_file_as_image(data):
    img = tf.convert_to_tensor(np.array(Image.open(io.BytesIO(data)).convert('RGB')))
    img = tf.image.convert_image_dtype(img, tf.float32)
    img = img[tf.newaxis, :]
    return img

def load_image_locally(img_path):
    img = tf.io.read_file(img_path)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)
    img = img[tf.newaxis, :]
    return img

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

@app.post("/generate_stylised_image")
async def genereate_stylised_image(
    file: UploadFile = File(...)
):
    content_image = read_file_as_image(await file.read())
    style_image = load_image_locally("../images/style/the_scream.png")
    stylised_image = model(tf.constant(content_image), tf.constant(style_image))[0]
    # stylised_image = model(tf.constant(content_image), tf.constant(style_image))[0].numpy()
    cv2.imwrite('generated_img.png', cv2.cvtColor(np.squeeze(stylised_image)*255, cv2.COLOR_BGR2RGB))

    # return StreamingResponse(io.BytesIO(stylised_image.tobytes()), media_type="image/png")

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)