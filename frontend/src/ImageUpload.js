import React, { useState } from 'react'
import placeholderimage from './images/default-image-placeholder.png'

export function ImageUpload() {

    const axios = require("axios").default;

    const [contentImage, setContentImage] = useState(placeholderimage);
    const [fileContentImage, setFileContentImage] = useState(null);

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setContentImage(reader.result)
            }
        }
        setFileContentImage(e.target.files[0])
        reader.readAsDataURL(e.target.files[0])
    }

    const sendFile = async () => {

        let url = "http://localhost:8000/generate_stylised_image";

        let formData = new FormData();
        formData.append("file", fileContentImage);

        axios.post(url, formData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })

    }

  return (
    <div className="page">
        <h1>Neural Style Transfer</h1>
        <div className="container">
            <h2 className="add-image-heading">Add your image</h2>
            <div className="img-holder">
                <img src={contentImage} alt="placeholder" height="auto" width="40%" id="content-img" className="content-img" />
            </div>
            <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler}/>
            <button onClick={sendFile}>Stylise the image</button>

        </div>
    </div>
  );
}



