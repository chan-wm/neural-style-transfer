import React, { useState } from 'react'
import placeholderimage from './images/default-image-placeholder.png'

export function ImageUpload() {
    const axios = require("axios").default

    const [contentImage, setContentImage] = useState(placeholderimage)
    const [fileContentImage, setFileContentImage] = useState(null)
    const [stylisedImage, setStylisedImage] = useState(null)

    const imageHandler = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2){
                setContentImage(reader.result)
            }
        }
        setFileContentImage(e.target.files[0])
        reader.readAsDataURL(e.target.files[0])
    }

    const sendFile = async () => {
        let url = "http://localhost:8000/generate_stylised_image"

        let formData = new FormData()
        formData.append("file", fileContentImage)
        formData.append("style_image_string", "pattern2")

        axios.post(url, formData)
            .then(response => {
                setStylisedImage(response.data.encoded_img)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const downloadImage = () => {
        const a = document.createElement("a")
        a.download = "stylised_image.png"
        a.href = "data:image/png;base64," + stylisedImage
        a.click()
    }

  return (
    <div className="page">
        <h1>Neural Style Transfer</h1>
        <div className="container">
            <h2 className="add-image-heading">Add your image</h2>
            <div className="img-holder">
                <img src={contentImage} alt="placeholder" height="auto" width="50%" id="content-img" className="content-img" />
            </div>
            <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler}/>
            <button onClick={sendFile}>Stylise the image</button>
            <h2>Stylised Image</h2>
            <div>
                <img src={`data:image/jpeg;base64,${stylisedImage}`} alt="" height="auto" width="50%"/>
            </div>
            <button onClick={downloadImage}>Download</button>

        </div>
    </div>
  );
}



