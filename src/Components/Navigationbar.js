import React, { Component } from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
export default class Navigationbar extends Component {
    render() {
        return (
            <div  style={{background:"blue"}}>
               <Navbar sticky="top" bg="dark" variant="dark">
                 <Link to={""} className="navbar-brand">
                 <img
        alt=""
        src="https://img.icons8.com/dusk/64/000000/book.png"
        width="40"
        height="40"
        className="d-inline-block align-top"
      />
                 </Link> 
               <Navbar.Brand>
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Link to={""} className="nav-link">Home</Link>
      <Link to={"/add1"} className="nav-link">AddBook</Link>
      <Link to={"/list1"} className="nav-link">Booklist</Link>
    </Nav>
    </Navbar>
            </div>
        )
    }
}