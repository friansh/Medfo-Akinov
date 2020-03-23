import React from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { Navbar, Row, Col, Container } from "react-bootstrap";
import Add from "./App/AddApp";
import Home from "./App/HomeApp";
import Edit from "./App/EditApp";
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };

    this.handleNavToggle = this.handleNavToggle.bind(this);
    this.shrinkNav = this.shrinkNav.bind(this);
  }

  shrinkNav() {
    this.setState({
      expanded: false
    });
  }

  handleNavToggle() {
    this.setState(state => {
      return {
        expanded: !state.expanded
      };
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Container fluid>
          <Row>
            <Navbar
              bg="light"
              expand="md"
              expanded={this.state.expanded}
              onToggle={this.handleNavToggle}
            >
              <Navbar.Brand href="/">SIAPMEN</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Container fluid>
                  <Row>
                    <Col md="auto" style={{ paddingLeft: "10px" }}>
                      <Link
                        to="/"
                        style={{ textDecoration: "inherit", color: "inherit" }}
                        onClick={this.shrinkNav}
                      >
                        Home
                      </Link>
                    </Col>
                    <Col md="auto" style={{ paddingLeft: "10px" }}>
                      <Link
                        to="/add"
                        style={{ textDecoration: "inherit", color: "inherit" }}
                        onClick={this.shrinkNav}
                      >
                        Request
                      </Link>
                    </Col>
                    <Col md="auto" style={{ paddingLeft: "10px" }}>
                      <Link
                        to="/edit"
                        style={{ textDecoration: "inherit", color: "inherit" }}
                        onClick={this.shrinkNav}
                      >
                        Status
                      </Link>
                    </Col>
                  </Row>
                </Container>
              </Navbar.Collapse>
            </Navbar>
          </Row>
          <Row>
            <Container
              fluid
              style={{ backgroundColor: "#a4b0be", minHeight: "100vh" }}
              className={"pt-4 pb-5"}
            >
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/add">
                  <Add />
                </Route>
                <Route path="/edit">
                  <Edit />
                </Route>
              </Switch>
            </Container>
          </Row>
          <Row
            style={{
              minWidth: "100vh",
              minHeight: "90px",
              backgroundColor: "#212121"
            }}
          >
            <Container>
              <Row>
                <Col className="pt-4">
                  <small className="text-light">
                    Copyright &copy; 2020 Fikri Rida Pebriansyah
                    <br />
                    Departemen Akademik dan Inovasi
                  </small>
                </Col>
                <Col className="py-3 justify-content-end d-flex">
                  <img src="logo/unpad.png" height="60" alt="unpad" />
                  <img src="logo/bem.png" height="60" alt="bem" />
                  <img src="logo/xman.png" height="60" alt="xman" />
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
