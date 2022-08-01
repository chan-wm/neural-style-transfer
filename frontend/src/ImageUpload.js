import React, { useState } from 'react'
import { Button, Container, Row, Col, Card } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import placeholderimage from './images/default-image-placeholder.png'

import the_scream from './images/the_scream.png'
import the_starry_night from './images/the_starry_night.png'
import candy from './images/candy.png'
import feathers from './images/feathers.png'
import violin_and_checkerboard from './images/violin_and_checkerboard.png'
import a_lady_holding_a_flower from './images/a_lady_holding_a_flower.png'
// import hanuman from './images/hanuman.png'
// import poet_on_a_mountaintop from './images/poet_on_a_mountaintop.png'

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
        formData.append("style_image_string", "the_scream")

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
    <div className="ImageUpload">
        <Container>
        <h1>Neural Style Transfer</h1>
        <Row className="align-items-center">
            <Col md>
                <Card className="mb-3" style={{ textAlign: 'center'}} >
                    <Card.Img src={candy}/>
                    <Card.Title>Candy</Card.Title>
                </Card>
            </Col>

            <Col md>
                <div className="align-self-center">
                <Card className="mb-3" style={{ textAlign: 'center'}}>
                    <Card.Img src={the_starry_night}/>
                    <Card.Title>The Starry Night</Card.Title>
                </Card>
                </div>
            </Col>

            <Col md>
                <Card className="mb-3" style={{ textAlign: 'center'}}>
                    <Card.Img src={a_lady_holding_a_flower}/>
                    <Card.Title>A Lady Holding A Flower</Card.Title>
                </Card>
            </Col>

        </Row>

        <Row className="align-items-center">
            <Col md>
                <Card className="mb-3" style={{ textAlign: 'center'}}>
                    <Card.Img src={the_scream}/>
                    <Card.Title>Candy</Card.Title>
                </Card>
            </Col>

            <Col md>
                <Card className="mb-3" style={{ textAlign: 'center'}}>
                    <Card.Img src={feathers}/>
                    <Card.Title>Feathers</Card.Title>
                </Card>
            </Col>

            <Col md>
                <Card className="mb-3" style={{ textAlign: 'center'}}>
                    <Card.Img src={violin_and_checkerboard}/>
                    <Card.Title>Violin And Checkerboard</Card.Title>
                </Card>
            </Col>

        </Row>
        <div className="container">
            <h2 className="add-image-heading">Add your image</h2>
            <div className="img-holder">
                <img src={contentImage} alt="placeholder" height="auto" width="50%" id="content-img" className="content-img" />
            </div>
            <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler}/>
            <Button onClick={sendFile}>Stylise the image</Button>
            <h2>Stylised Image</h2>
            <div>
                <img src={`data:image/jpeg;base64,${stylisedImage}`} alt="" height="auto" width="50%"/>
            </div>
            <Button onClick={downloadImage}>Download</Button>

        </div>
        </Container>
    </div>
  );
}



