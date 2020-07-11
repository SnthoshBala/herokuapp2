import React, { Component } from 'react'
import {Image,ButtonGroup,Button,Card,Table} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from './MyToast'
import {Link} from 'react-router-dom'
export default class Booklist extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             books:[]
             
        }
        this.state.show=false;
    }
    componentDidMount()
    {
        this.findBooks()
    }
    findBooks()
    {
        axios.get("http://localhost:9191/books")
        .then(response=>response.data)
        .then((data)=>{
            this.setState({books:data})
            
        });
    }
    deleteBook = (bookId) => {
        axios.delete("http://localhost:9191/delete/"+bookId)
            .then(response=>{
                if(response.data !=null){
                    this.setState({"show":true})
                    setTimeout(()=> this.setState({show:false}),3000)
                    this.setState(
                        {
                            
                            books: this.state.books.filter(book => book.id !== bookId)
                            
                        }
                    )
                }
                else{
                    this.setState({"show":false})
                }
            });
    };
    
    render() {
        return (<div>
            <div style={{"display":this.state.show ? "block":"none" }}>
                <MyToast show={this.state.show} message={"Book Deleted Sucessfully"} type={"danger"} />
            </div>
            <Card className="border border-dark bg-dark text-white">
            <Card.Header> <FontAwesomeIcon icon={faList} />BookList</Card.Header>
            <Card.Body>
                <Table bordered hover striped variant="dark">
                <thead>
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>ISBN Number</th>
      <th>Price</th>
      <th>Language</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  {this.state.books.length===0 ?
    <tr align="center">
        <td colSpan="6">No Book Avaliable</td>
    </tr>:
    this.state.books.map((books)=>(
        <tr key={books.id}>
            <td>
                <Image src={books.coverPhotoURL} roundedCircle width="25" height="25"/>{books.title}
                </td>
            <td>{books.author}</td>
            <td>{books.isbnNumber}</td>
            <td>{books.price}</td>
            <td>{books.language}</td>
            <td>
                <ButtonGroup>
                <Link to={"edit/"+books.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>
                    <Button size="sm" variant="outline-danger" onClick={this.deleteBook.bind(this,books.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    ))
    }
  </tbody>
                </Table>
            </Card.Body>
            </Card>
        </div>
        )
    }
}
