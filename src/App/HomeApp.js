import React from "react";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Carousel,
  Button
} from "react-bootstrap";
import Swal from "sweetalert2";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleSOP = this.handleSOP.bind(this);
  }

  handleSOP() {
    Swal.fire({
      title: "Our SOP",
      html:
        "1. Poster paling lambat H-3 dari waktu publikasi<br>" +
        "2. Video paling lambat H-7 dari waktu publikasi<br>" +
        "<br>" +
        "Mengorder berarti menyetujui sist."
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg="8">
            <Jumbotron>
              <h1>Halo dunia!</h1>
              <p>
                Divisi medfo dari Departemen Akademik dan Inovasi disini. Portal
                ini buat ngedata post kita ya. Thx.
              </p>
              <hr />
              <p>Jangan lupa bahagia hari ini ;)</p>
              <Button variant="primary" onClick={this.handleSOP}>
                SOP Kami
              </Button>
            </Jumbotron>
          </Col>
          <Col lg="4">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2014/12/15/17/16/pier-569314__340.jpg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2014/12/15/17/16/pier-569314__340.jpg"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2014/12/15/17/16/pier-569314__340.jpg"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
