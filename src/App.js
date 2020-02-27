import React from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { Navbar, Row, Col, Container } from "react-bootstrap";
import Add from "./App/AddApp";
import Home from "./App/HomeApp";
import Edit from "./App/EditApp";
import "./style.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar bg="light" expand="md">
          <Navbar.Brand href="#home">MEDFOKINOV</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Container fluid>
              <Row>
                <Col md="auto" style={{ paddingLeft: "10px" }}>
                  <Link
                    to="/"
                    style={{ textDecoration: "inherit", color: "inherit" }}
                  >
                    Home
                  </Link>
                </Col>
                <Col md="auto" style={{ paddingLeft: "10px" }}>
                  <Link
                    to="/add"
                    style={{ textDecoration: "inherit", color: "inherit" }}
                  >
                    Request
                  </Link>
                </Col>
                <Col md="auto" style={{ paddingLeft: "10px" }}>
                  <Link
                    to="/edit"
                    style={{ textDecoration: "inherit", color: "inherit" }}
                  >
                    Status
                  </Link>
                </Col>
              </Row>
            </Container>
          </Navbar.Collapse>
        </Navbar>
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
      </BrowserRouter>
    );
  }
}

export default App;
