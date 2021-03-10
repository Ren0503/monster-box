import React from 'react'
import { Container, Row, Col, Image, ListGroup, Badge } from 'react-bootstrap'

import logo from '../../assets/contact-logo.jpg'
import background from '../../assets/mb-contact.jpg'

const Contact = () => (
    <Container>
        <Row>
            <Col sm={4} style={{ background: '#fff' }}>
                <Image src={logo} fluid />
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <strong>Address</strong><br />
                        200, Ba Thang Hai Street, Ward 12, District 10, Ho Chi Minh City
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>CONTACT INFO</strong><br />
                        Phone: +0906.54.24.54<br />
                        Email: lam@monsterbox.media
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>SOCIAL NETWORK</strong><br />
                        <Badge className="m-2 p-2" pill variant="primary">
                            <a href="https://www.facebook.com/teammonsterbox/" style={{ color: '#fff' }}>
                                <i className="fab fa-facebook-square" />
                            </a>
                        </Badge>
                        <Badge className="m-2 p-2" pill variant="primary">
                            <a href="https://www.youtube.com/channel/UCeFDERVcNOEasm-9ZKDfzFA" style={{ color: '#fff' }}>
                                <i className="fab fa-youtube" />
                            </a>
                        </Badge>
                        <Badge className="m-2 p-2" pill variant="primary">
                            <a href="https://vimeo.com/teammonsterbox" style={{ color: '#fff' }}>
                                <i className="fab fa-vimeo" />
                            </a>
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>CAREER INFO</strong><br />
                        Please send email to: liem@monsterbox.media
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col sm={8}>
                <Image fluid src={background} />
            </Col>
        </Row>
    </Container>
)

export default Contact