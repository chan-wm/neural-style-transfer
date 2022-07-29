import React, { useState } from 'react'
import placeholderimage from './images/default-image-placeholder.png'

export function ImageUpload() {

    const [contentImage, setContentImage] = useState(placeholderimage);

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setContentImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
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

        </div>
    </div>
  );
}



