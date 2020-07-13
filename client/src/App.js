import React from 'react';
import BSNavbar from './components/BSNavbar'
import Add from './components/Add'
import UpdateColor from './components/UpdateColor'

// imported images
import jake_bw from './images/jake_bw.png';
import delya_bw from './images/delya_bw.png';
import loadGIF from './images/lock-key.gif';

// imported CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import "./custom.scss";


// imported COMPONENTS
import { Container, Row, Col, Button, ButtonGroup, DropdownButton, Dropdown, Image } from 'react-bootstrap';

let baseURL = ''

// =========================================================================
// for LOCAL -- UNCOMMENT THIS: <========================================
baseURL = 'http://localhost:8000/'

// =====================================================================================
// // to set up for HEROKU -- UNCOMMENT THIS: <========================================

// if (process.env.NODE_ENV === 'development') {
//   baseURL = 'http://localhost:8000/'
// } else {
//   baseURL = 'https://just-us-couples-app.herokuapp.com/'
//   // EXAMPLE baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
// }

console.log('current base URL:', baseURL)

const delay = ms => new Promise(res => setTimeout(res, ms));

class App extends React.Component {
  
  state = {
        isLoading: true,
        changingColor: false,
        couples: {
          "user1": {
            "name": "",
            "faveColor": "",
            "profilePic": ""
          },
          "user2": {
            "name": "",
            "faveColor": "",
            "profilePic": ""
          },
          "timeTogether": "", // <-- INTEGER
          },  
        messages: [],
        currentUser: 'Jake'
  }

  toggleChangePic = () => {
    if (this.state.changingColor === false) {
      this.setState({changingColor: true})
    } else {
      this.setState({changingColor: false})
    }
    console.log(this.state.changingColor)
  }

  toggleLoaderGif = () => {
    if (this.state.isLoading === true) {
      this.setState({isLoading: false})
    } else {
      this.setState({isLoading: true})
    }
    console.log(this.state.isLoading)
  }

  toggleChangeUser = (userName) => {
    this.setState({currentUser: userName})
  }

  toggleUpdateLiked = (updatedMessage) => {
    // fetch(`http://localhost:8000/messages/${updatedMessage._id}`, {  
    fetch(baseURL+'messages/'+updatedMessage._id, {
      
        method: "PUT",
        body: JSON.stringify({liked: !updatedMessage.liked}),
        headers: {
          'Accept': "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }).then(res => res.json())
      .then(resJson => {
           const copyMessages = [...this.state.messages]
            const findIndex = this.state.messages.findIndex(updatedMessage => updatedMessage._id === resJson._id)
            copyMessages[findIndex].liked = resJson.liked
            this.setState({messages: copyMessages})
      })
  }

  handleAddMessage = async (event, formInputs) => {
    event.preventDefault()
    console.log(formInputs)
    // fetch('http://localhost:8000/messages', { // LOCAL
    fetch(baseURL+'messages/', { // HEROKU - remember, add https
      body: JSON.stringify(formInputs),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
  })
  .then( () => {
    this.getNewMessages() // get data from one source - the API or State, choose one
  })
  .catch(
    error => console.log(error))
  }

  handleDelete = (deletedMessage) => {    
    // fetch(`http://localhost:8000/messages/${deletedMessage._id}`, {
      fetch(baseURL+'messages/'+deletedMessage._id, {
      method: "DELETE",
      headers: {
        'Accept': "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((json) => {
        const messages = this.state.messages.filter(
          (message) => message._id !== deletedMessage._id
        );
        this.setState({ messages });
      })
      .catch((error) => console.log(error));
  };

  getCouples = () => {
    return fetch(baseURL+ 'couples')
    .then(data => {
     console.log(data)
     return data.json()
       },
       err => console.log(err)
      )
    .then(parsedData => this.setState({
       isLoading: false,
       couples: parsedData
       }),
     err => {
       return console.log(err);
     })
  }

  getMessages = async () => { // has DELAY for loading screen
    await delay(2000);
    return fetch(baseURL+ 'messages')
    .then(data => {
     console.log(data)
     return data.json()
       },
       err => console.log(err)
      )
    .then(parsedData => 
      this.setState({
        isLoading: false,
        messages: parsedData
       }),
     err=> {
     console.log(err);
    })
  }

  getNewMessages = () => { // NO DELAY for NEW messages
    return fetch(baseURL+ 'messages')
    .then(data => {
     console.log(data)
     return data.json()
       },
       err => console.log(err)
      )
    .then(parsedData => this.setState({
        isLoading: false,
        messages: parsedData
       }),
     err=> {
       console.log(err)
      })
  }

componentDidMount = () => {
    this.getCouples();
    this.getMessages();
  }

  render() {
    
    return (
      <div className="App">
          
          {/* Navbar Component - BSNavbar.js */}
          <BSNavbar/>

          <Container className="container">

            {/* MAIN SECTION row */}
            <Row className="all-content">
              
              {/* MAIN LEFT div */}
              <Col className="main-left">
                
                <Image 
                  src={jake_bw} 
                  width="200px"
                  style={
                    {
                      border:"5px solid",
                      borderTop: 0,
                      borderColor: this.state.couples.user1.faveColor
                    }
                  }
                  onClick={()=> this.toggleChangePic()}
                  fluid
                />
                {this.state.changingColor ?
                    
                    <UpdateColor
                      couple={this.state.couples}
                      // messages={this.state.messsages}
                      currentUser={this.state.currentUser}
                      // handleAddMessage={this.handleAddMessage}
                    />

                 : null}

                {/* <ButtonGroup 
                  size="sm" 
                  style={{marginTop:12}}>
                  <Button className="buttons" style={{backgroundColor: this.state.couples.user1.faveColor}}>MSG</Button>
                  <Button className="buttons" style={{backgroundColor: this.state.couples.user1.faveColor}}>PIC</Button>
                  <Button className="buttons" style={{backgroundColor: this.state.couples.user1.faveColor}}>REM</Button>
                </ButtonGroup> */}
                
                <Button 
                  className="buttons"
                  style={{backgroundColor: this.state.couples.user1.faveColor}}
                  onClick={()=> this.toggleChangeUser("Jake")}
                >
                    Use as Jake
                </Button>
                
              </Col>

              {/* MAIN CONTENT div */}
              <Col xs={7} className="main-content">
                
                <DropdownButton 
                  size="sm"
                  as={ButtonGroup}
                  style={{marginTop: 12}}
                  variant="dark"
                  title="ALL" // <-- CHANGE to whatever field it currently is
                >
                  <Dropdown.Item eventKey="1">Messages</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Pictures</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Reminders</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4" active>ALL</Dropdown.Item>
                </DropdownButton>

      {/* SHARE-ABLE CONTENT AREA =========================================== */}
      <div id="content-area">
              {this.state.messages && this.state.isLoading ? 
              // <h1 style={{marginTop:100,fontFamily:"fantasy"}}>...</h1> // show LOADING GIF until messages load
              <Image src={loadGIF} id="loading-gif"/>
              : 
              this.state.messages.map((message, index) => {
                // console.log('test')
                return (
                  <div 
                    key={index} 
                    className={
                      (message.createdBy === message.couple.user1.name) ? 'message user1' : 'message user2'
                    }
                    style={{
                      backgroundColor: (message.createdBy === message.couple.user1.name) ? (message.couple.user1.faveColor) : (message.couple.user2.faveColor),
                      border: (message.liked) ? ("5px solid") : (''),
                      borderTop: (message.liked) ? (0) : (''),
                      borderLeft: (message.liked) ? (0) : (''),
                      borderRight: (message.liked) ? (0) : (''),
                      borderColor: (message.liked) ? ("yellow") : ('')
                    }}
                    onDoubleClick={()=> this.toggleUpdateLiked(message)}
                  >
                    <div className={
                      (message.createdBy === message.couple.user1.name) ? 'user1' : 'user2'
                    }>

                      <div className="message-items">
                        {message.text}
                        <div 
                          onClick={()=> this.handleDelete(message)}
                          className="delete-button"
                        >
                          x
                        </div>
                      </div>

                      {/* {message.liked ? <>👍</> : ""} */}
                    </div>
                  </div>
                )
              })
              }

      </div> {/* END of CONTENT AREA =========================================== */}

      {/* FORM area 
      ==============================*/}
                  
                  <div id="form-space">

                    <Add
                      couple={this.state.couples}
                      messages={this.state.messsages}
                      currentUser={this.state.currentUser}
                      handleAddMessage={this.handleAddMessage}
                    />

                  </div>

      {/* END of FORM ================== */}

              </Col>

              {/* MAIN RIGHT div */}
              <Col className="main-right">
                
                <Image 
                  src={delya_bw} 
                  width="200px"
                  style={
                    {
                      border:"5px solid",
                      borderTop: 0,
                      borderColor: this.state.couples.user2.faveColor
                    }
                  }
                  fluid
                  />
                {/* <ButtonGroup size="sm" style={{marginTop:12}}>
                  <Button className="buttons" style={{backgroundColor: this.state.couples.user2.faveColor}}>MSG</Button>
                  <Button className="buttons" style={{backgroundColor: this.state.couples.user2.faveColor}}>PIC</Button>
                  <Button className="buttons" style={{backgroundColor: this.state.couples.user2.faveColor}}>REM</Button>
                </ButtonGroup> */}
                <Button 
                  className="buttons" 
                  style={{backgroundColor: this.state.couples.user2.faveColor}}
                  onClick={()=> this.toggleChangeUser("Delya")}
                >
                  Use as Delya
                </Button>


              </Col>
            </Row>

          </Container>
          {/* this is in <font color="whitesmoke">App</font> div */}
      </div>
    );
  }
}

export default App;
