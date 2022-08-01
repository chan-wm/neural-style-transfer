import React, { useState } from 'react'
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import candy from './images/candy.png'
import the_starry_night from './images/the_starry_night.png'
import a_lady_holding_a_flower from './images/a_lady_holding_a_flower.png'
import the_scream from './images/the_scream.png'
import feathers from './images/feathers.png'
import violin_and_checkerboard from './images/violin_and_checkerboard.png'

import hummingbird from './images/hummingbird.png'
import default_stylised_image_b64 from './default_stylised_image_b64'

export function ImageUpload() {
    const axios = require("axios").default

    const [chosenStyleImage, setChosenStyleImage] = useState(a_lady_holding_a_flower)
    const [chosenStyleImageCaption, setConsenStyleImageCaption] = useState("A Lady Holding A Flower")

    const [contentImage, setContentImage] = useState(hummingbird)
    const [fileContentImage, setFileContentImage] = useState(null)
    const [stylisedImage, setStylisedImage] = useState(default_stylised_image_b64)

    function srcToFile(src, fileName, mimeType){
        return (fetch(src)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], fileName, {type:mimeType});})
        );
    }

    srcToFile('./images/hummingbird.png', 'hummingbird.png', 'image/png')
    .then(function(file){
        setFileContentImage(file)
    })

    const varToString = varObj => Object.keys(varObj)[0]

    var dict ={}
    dict["candy"] = [candy, "Candy"]
    dict["the_starry_night"] = [the_starry_night, "The Starry Night"]
    dict["a_lady_holding_a_flower"] = [a_lady_holding_a_flower, "A Lady Holding A Flower"]
    dict["the_scream"] = [the_scream, "The Scream"]
    dict["feathers"] = [feathers, "Feathers"]
    dict["violin_and_checkerboard"] = [violin_and_checkerboard, "Violin And Checkerboard"]

    const onSelectStyleImageCard = (e) => {
        setChosenStyleImage(dict[e.target.id][0])
        setConsenStyleImageCaption(dict[e.target.id][1])
    }

    const imageHandler = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2){
                setContentImage(reader.result)
            }
        }
        setFileContentImage(e.target.files[0])
        console.log(e.target.files[0])
        reader.readAsDataURL(e.target.files[0])
    }

    const sendFile = async () => {
        let url = "http://localhost:8000/generate_stylised_image"
        let style_image_string = chosenStyleImageCaption.toLowerCase().replace(" ", "_")

        let formData = new FormData()
        formData.append("file", fileContentImage)
        formData.append("style_image_string", style_image_string)

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
        <Container style={{ textAlign: 'center'}}>
        <h1>Neural Style Transfer</h1>
        <h2>Choose your style image</h2>
        <Row className="align-items-center">
            <Col md>
                <Card id="candy" className="mb-3" onClick={onSelectStyleImageCard} style={{cursor:'pointer'}}>
                    <Card.Img id="candy" className="mb-3" src={candy}/>
                    <Card.Title id="candy" className="mb-3" style={{fontWeight:'bold'}}>Candy</Card.Title>
                </Card>
            </Col>

            <Col md>
                <Card id="the_starry_night" className="mb-3" onClick={onSelectStyleImageCard} style={{cursor:'pointer'}}>
                    <Card.Img id="the_starry_night" className="mb-3" src={the_starry_night}/>
                    <Card.Title id="the_starry_night" style={{fontWeight:'bold'}}>The Starry Night</Card.Title>
                </Card>
            </Col>

            <Col md>
                <Card id="a_lady_holding_a_flower" className="mb-3" onClick={onSelectStyleImageCard} style={{cursor:'pointer'}}>
                    <Card.Img id="a_lady_holding_a_flower" className="mb-3" src={a_lady_holding_a_flower}/>
                    <Card.Title id="a_lady_holding_a_flower" style={{fontWeight:'bold'}}>A Lady Holding A Flower</Card.Title>
                </Card>
            </Col>

        </Row>

        <Row className="align-items-center">
            <Col md>
                <Card id="the_scream" className="mb-3" onClick={onSelectStyleImageCard} style={{cursor:'pointer'}}>
                    <Card.Img id="the_scream" className="mb-3" src={the_scream}/>
                    <Card.Title id="the_scream" style={{fontWeight:'bold'}}>The Scream</Card.Title>
                </Card>
            </Col>

            <Col md>
                <Card id="feathers" className="mb-3" onClick={onSelectStyleImageCard} style={{cursor:'pointer'}}>
                    <Card.Img id="feathers" className="mb-3" src={feathers}/>
                    <Card.Title id="feathers" style={{fontWeight:'bold'}}>Feathers</Card.Title>
                </Card>
            </Col>

            <Col md>
                <Card id="violin_and_checkerboard" className="mb-3" onClick={onSelectStyleImageCard} style={{cursor:'pointer'}}>
                    <Card.Img id="violin_and_checkerboard" className="mb-3" src={violin_and_checkerboard}/>
                    <Card.Title id="violin_and_checkerboard" style={{fontWeight:'bold'}}>Violin And Checkerboard</Card.Title>
                </Card>
            </Col>

        </Row>
        <Row className="align-items-center">
            <Col md>
                <Card className="mb-3">
                    <Card.Header as="h4" style={{fontWeight:'bold'}}>Chosen style image</Card.Header>
                    <Card.Img className="mb-3" src={chosenStyleImage}/>
                    <Card.Title style={{fontWeight:'bold'}}>{chosenStyleImageCaption}</Card.Title>
                </Card>
            </Col>
            <Col md>
                <Card className="mb-3">
                    <Card.Header as="h4" style={{fontWeight:'bold'}}>Add your content image</Card.Header>
                    <Card.Img className="mb-3" src={contentImage}/>
                    <Form.Group controlId="formFile" className="mb-3 mx-3">
                        <Form.Control type="file" onChange={imageHandler}/>
                    </Form.Group>
                </Card>
            </Col>
            <Button className="mb-3" onClick={sendFile}>Stylise the image</Button>
        </Row>
        <Row className="align-items-center">
            <Card className="mb-3">
                <Card.Header as="h4" style={{fontWeight:'bold'}}>Stylised image</Card.Header>
                <Card.Img className="mb-3" src={`data:image/jpeg;base64,${stylisedImage}`} alt=""/>
                <Button className="mb-3" onClick={downloadImage}>Download</Button>
            </Card>
        </Row>
        </Container>
    </div>
  );
}



