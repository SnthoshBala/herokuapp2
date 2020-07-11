import React from 'react';
import './App.css';
import Navigationbar from './Components/Navigationbar';
import {Container,Row,Col} from 'react-bootstrap'
import Welcome from './Components/Welcome';
import Footer from './Components/Footer';
import Book from './Components/Book';
import Booklist from './Components/Booklist';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
function App() {
  const marginTop={
    marginTop:"20px"
  };
  return (
    <Router>
      <Navigationbar />
  <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Switch>
              <Route path="/" exact component={Welcome}/>
              <Route path="/add1" exact component={Book}/>
              <Route path="/edit/:id" exact component={Book}/>
              <Route path="/list1" exact component={Booklist}/>
            </Switch>
</Col>
</Row>
</Container>
<Footer />
    </Router>
  );
}

export default App;
