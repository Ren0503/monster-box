import React from 'react'
import footer from '../assets/footer.png'
import { Image } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Image src={footer} fluid />
        </footer>
    )
}

export default Footer