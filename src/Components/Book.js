import React, { Component } from 'react'
import {Card,Form,Button,Col} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit,faUndo,faPlusSquare,faSave, faList } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from './MyToast'
export default class Book extends Component {
    constructor(props) {
        super(props)
    
        this.state = this.intialState
        this.state.show=false;
        this.bookChange=this.bookChange.bind(this);
        this.submitBook=this.submitBook.bind(this);
    };
    intialState={
            id:'',
            title:'',
             author:'',
             isbnNumber:'',
             coverPhotoURL:'',
             price:'',
             language:''
    };
    componentDidMount(){
        const bookId = +this.props.match.params.id;
        if(bookId)
        {
            this.findBookById(bookId);
    }}
    findBookById =(bookId)=>{
        axios.get("https://java-mongodbbook.herokuapp.com/bookById/" +bookId)
        .then(response=>{
            if(response.data !=null){
                this.setState(
                    {
                        id:response.data.id,
                        title:response.data.title,
                        author:response.data.author,
                        coverPhotoURL:response.data.coverPhotoURL,
                        isbnNumber:response.data.isbnNumber,
                        price:response.data.price,
                        language:response.data.language
                    }
                )
            };
        })
        .catch((error)=>{
            console.error("Error -"+error);
        });
    }
    submitBook = event => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language
        };

        axios.post("https://java-mongodbbook.herokuapp.com/addBook", book)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true,"method":"post"});
                    setTimeout(()=> this.setState({show:false}),3000);
                }
                else
                {
                    this.setState({"show":false});
                }
            });
            this.setState(()=>this.intialState);
    };
    updateBook=event=>{

        
        event.preventDefault();

        const book = {
            id:this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language
        };

        axios.put("https://java-mongodbbook.herokuapp.com/update", book)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true,"method":"put"});
                    setTimeout(()=> this.setState({show:false}),3000);
                    setTimeout(()=> this.bookList(),3000);

                }
                else
                {
                    this.setState({"show":false});
                }
            });
            this.setState(()=>this.intialState);
    };
    bookChange=event=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    };
    resetBook=()=>{
        this.setState(()=>this.intialState);
    };
    bookList=()=>{
        return this.props.history.push("/list1");
    };
    render() {
        const{title,author,coverPhotoURL,isbnNumber,price,language}=this.state;
        return (
            <div>
                <div style={{"display":this.state.show ? "block":"none" }}>
                   <MyToast show={this.state.show} message={this.state.method ==="put" ?"Book Updated Sucessfully":"Book Saved Sucessfully"} type={"success"} /> 
                </div>
                <Card className="border border-dark bg-dark text-white">
                <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit:faPlusSquare} />{this.state.id ? "Update Book":"Add New Book"}</Card.Header>
                <Form id="bookFormid" onSubmit={this.state.id ? this.updateBook : this.submitBook} onReset={this.resetBook}>
                <Card.Body>
                    <Form.Row>
  <Form.Group as={Col} controlId="formGridTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control required autoComplete="off" type="text" name="title" value={title} onChange={this.bookChange} className="bg-dark text-white" placeholder="Enter Book Title" />
  </Form.Group>
  <Form.Group as={Col} controlId="formGridAuthor">
    <Form.Label>Author</Form.Label>
    <Form.Control required autoComplete="off" type="text" name="author" value={author} onChange={this.bookChange} className="bg-dark text-white" placeholder="Enter Book Author" />
  </Form.Group>
  </Form.Row>
  <Form.Row>
  <Form.Group as={Col} controlId="formGridIsbnNumber">
    <Form.Label>ISBN Number</Form.Label>
    <Form.Control required autoComplete="off" type="text" name="isbnNumber" value={isbnNumber} onChange={this.bookChange} className="bg-dark text-white" placeholder="Enter Book ISBN Number" />
  </Form.Group>
  <Form.Group as={Col} controlId="formGridCoverPhotoURL">
    <Form.Label>CoverPhotoURL</Form.Label>
    <Form.Control required autoComplete="off" type="text" name="coverPhotoURL" value={coverPhotoURL} onChange={this.bookChange} className="bg-dark text-white" placeholder="Enter Book CoverPhotoUrl" />
  </Form.Group>
  </Form.Row>
  <Form.Row>
  <Form.Group as={Col} controlId="formGridPrice">
    <Form.Label>Price</Form.Label>
    <Form.Control required autoComplete="off" type="text" name="price" value={price} onChange={this.bookChange} className="bg-dark text-white" placeholder="Enter Book Price" />
  </Form.Group>
  <Form.Group as={Col} controlId="formGridLanguage">
    <Form.Label>Language</Form.Label>
    <Form.Control required autoComplete="off" type="text" name="language" value={language} onChange={this.bookChange} className="bg-dark text-white" placeholder="Enter Book Language" />
  </Form.Group>
  </Form.Row>
                </Card.Body>
                <Card.Footer style={{"textAlign":"right"}}>
        <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} />{this.state.id ? "Update":"Save"}</Button>{'  '}
                    <Button size="sm" variant="info" type="reset"><FontAwesomeIcon icon={faUndo} />Reset</Button>{' '}
                    <Button size="sm" variant="info" type="button" onClick={this.bookList.bind()}><FontAwesomeIcon icon={faList} />Booklist</Button>
                </Card.Footer>
                </Form>
            </Card>
            </div>
            
        )
    }
}
