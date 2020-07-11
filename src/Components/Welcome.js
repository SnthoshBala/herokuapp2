import React, { Component } from 'react'
import {Jumbotron} from 'react-bootstrap'
export default  class Welcome extends Component {
    render() {
        return (
            <div>
                    <Jumbotron className="bg-dark text-white">
  <h1>Welcome To My Bookshop</h1>
  <blockquote className="blockquote mb-0">
  <p>
      Here You Can See the Lastest Collections of Books.
  </p>
  </blockquote>
  <footer className="blockquote-footer">Bala</footer>
</Jumbotron>
            </div>
        )
    }
}