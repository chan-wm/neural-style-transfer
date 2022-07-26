import React, { useState } from 'react'
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap'
import ClipLoader from 'react-spinners/ClipLoader'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import candy from './images/candy.png'
import the_starry_night from './images/the_starry_night.png'
import a_lady_holding_a_flower from './images/a_lady_holding_a_flower.png'
import seaport_with_a_big_tower from './images/seaport_with_a_big_tower.png'
import the_scream from './images/the_scream.png'
import feathers from './images/feathers.png'
import violin_and_checkerboard from './images/violin_and_checkerboard.png'
import kandinsky_composition_vii from './images/kandinsky_composition_vii.png'

import hummingbird from './images/hummingbird.png'
import default_stylised_image_b64 from './default_stylised_image_b64'
import default_content_image_b64 from './default_content_image_b64'

export function ImageUpload() {

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
    }

    var file = dataURLtoFile(default_content_image_b64, 'hummingbird.png');

    const axios = require("axios").default

    const [chosenStyleImage, setChosenStyleImage] = useState(a_lady_holding_a_flower)
    const [chosenStyleImageCaption, setConsenStyleImageCaption] = useState("A Lady Holding A Flower")
    const [contentImage, setContentImage] = useState(hummingbird)
    const [fileContentImage, setFileContentImage] = useState(file)
    const [stylisedImage, setStylisedImage] = useState(default_stylised_image_b64)
    const [loading, setLoading] = useState(false)

    var dict ={}
    dict["candy"] = [candy, "Candy"]
    dict["the_starry_night"] = [the_starry_night, "The Starry Night"]
    dict["a_lady_holding_a_flower"] = [a_lady_holding_a_flower, "A Lady Holding A Flower"]
    dict["seaport_with_a_big_tower"] = [seaport_with_a_big_tower, "Seaport With A Big Tower"]
    dict["the_scream"] = [the_scream, "The Scream"]
    dict["feathers"] = [feathers, "Feathers"]
    dict["violin_and_checkerboard"] = [violin_and_checkerboard, "Violin And Checkerboard"]
    dict["kandinsky_composition_vii"] = [kandinsky_composition_vii, "Kandinsky Composition VII"]

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
        reader.readAsDataURL(e.target.files[0])
    }

    const sendFile = async () => {
        let url = process.env.REACT_APP_API_HOST + "generate_stylised_image"
        let style_image_string = chosenStyleImageCaption.toLowerCase().replaceAll(" ", "_")

        let formData = new FormData()
        formData.append("file", fileContentImage)
        formData.append("style_image_string", style_image_string)

        setStylisedImage(null)
        axios.post(url, formData)
            .then(response => {
                setStylisedImage(response.data.encoded_img)
                setLoading(false)
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
        <h1 style={{margin:'25px', fontWeight:'bold'}}>Neural Style Transfer</h1>
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

            <Col md>
                <Card id="seaport_with_a_big_tower" className="mb-3" onClick={onSelectStyleImageCard} style={{cursor:'pointer'}}>
                    <Card.Img id="seaport_with_a_big_tower" className="mb-3" src={seaport_with_a_big_tower}/>
                    <Card.Title id="seaport_with_a_big_tower" style={{fontWeight:'bold'}}>Seaport With A Big Tower</Card.Title>
                </Card>
            </Col>

        </Row>

        <Row className="align-items-center mb-10">
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

            <Col md>
                <Card id="kandinsky_composition_vii" className="mb-3" onClick={onSelectStyleImageCard} style={{cursor:'pointer'}}>
                    <Card.Img id="kandinsky_composition_vii" className="mb-3" src={kandinsky_composition_vii}/>
                    <Card.Title id="kandinsky_composition_vii" style={{fontWeight:'bold'}}>Kandinsky Composition VII</Card.Title>
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
            {/* <Button className="mb-3" onClick={sendFile}>Stylise the image</Button> */}
            <Button className="mb-3" onClick={function(e){ sendFile(e); setLoading(true)}}>Stylise the image</Button>
        </Row>
        <Row className="align-items-center">
            <Card className="align-items-center mb-3">
                <Card.Header as="h4" style={{fontWeight:'bold'}}>Stylised image</Card.Header>
                <ClipLoader color="#24a0ed" loading={loading} size={150} />
                <Card.Img className="mb-3" src={`data:image/jpeg;base64,${stylisedImage}`} alt=""/>
                <Button className="mb-3" style={{width:'100%'}} onClick={downloadImage}>Download</Button>
            </Card>
        </Row>
        </Container>
    </div>
  );
}



