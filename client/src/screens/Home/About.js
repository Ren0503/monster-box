import React from 'react'
import { Container, Row, Col, Image, Jumbotron, Button } from 'react-bootstrap'

import logo from '../../assets/home.png'
import logoFixed from '../../assets/home2.png'

var sectionStyles = {
    position: 'absolute',
    width: '45rem',
    top: 'auto',
    right: '12rem',
    bottom: '21rem',
}

const About = () => (
    <Container>
        <Image src={logo} fluid />
        <img src={logoFixed} style={sectionStyles} />
        <Jumbotron>
            <h3>
                
                We share the belief of creating approachable yet simplified concepts and ideas through animation. Whether your choice is commercial ads, educational video, explainer video, …as long as it is told through animation, we can make it.
            <br />
                At Monster Box, we love to work with everyone who wants to create animated video, from local to international, because just like imagination, animation knows no boundary.
            </h3>
            <Button className="btn btn-monster">Monster Space</Button>

        </Jumbotron>
    </Container>
)

export default About