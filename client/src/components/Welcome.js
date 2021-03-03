import React from 'react'
import { Link } from 'react-router-dom'
import background from '../assets/background.jpg'
import { Card } from 'react-bootstrap'

var sectionStyle = {
    width: '100%',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
}

const Welcome = () => (
    <>
        <Card className="bg-dark text-white">
            <Card.Img src={background} alt="Card image" />
            <Card.ImgOverlay>
            </Card.ImgOverlay>
        </Card>
    </>
)

export default Welcome