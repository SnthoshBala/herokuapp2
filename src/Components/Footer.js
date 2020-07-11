import React, { Component } from 'react'
import {Navbar,Container,Col} from 'react-bootstrap'
export default class Footer extends Component {
    render() {
        let fullyear=new Date().getFullYear();
        return (
            <div>
                 <Navbar fixed="bottom" bg="dark" variant="dark">
                 <Container>
        <Col lg={12} className="text-center text-muted"> {fullyear}, All Rights For Bala</Col>
                 </Container>
                     </Navbar>
            </div>
        )
    }
}