import React from 'react';

// imported CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

// imported COMPONENTS
import { Navbar, Nav } from 'react-bootstrap';

class BSNavBar extends React.Component {

    render() {
        return (
            <>
              <Navbar 
                collapseOnSelect
                expand="lg" 
                variant="dark"
              >
                <Navbar.Brand href="#home" id="brandLogo">JustUs.com</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    {/* can put other links in here - pushes Settings to RIGHT */}
                  </Nav>
                  <Nav>
                    <Nav.Link eventKey={2} href="#memes">
                      Settings
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>

</>
        )}
}

export default BSNavBar;
