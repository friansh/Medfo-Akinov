import React from "react";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Carousel,
  Button,
  Modal,
  Card,
} from "react-bootstrap";
import Axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SOP: false,
      loading: true,
      coronaData: {},
    };
    this.handleSOPModalShow = this.handleSOPModalShow.bind(this);
    this.handleSOPModalHide = this.handleSOPModalHide.bind(this);
  }

  handleSOPModalShow() {
    this.setState({
      SOP: true,
    });
  }

  handleSOPModalHide() {
    this.setState({
      SOP: false,
    });
  }

  componentDidMount() {
    let self = this;
    Axios.get("https://covid19.fikrirp.com/")
      .then((response) => {
        self.setState({
          coronaData: response.data,
        });
        console.log(response.data);
      })
      .then(() =>
        self.setState({
          loading: false,
        })
      );
  }

  render() {
    if (!this.state.loading) {
      return (
        <Container className="mb-3">
          <Row>
            <Col>
              <h1
                style={{
                  color: "white",
                  textShadow: "1px 2px 3px rgba(0,0,0,0.43)",
                }}
              >
                Info Covid19 hari ini
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p
                className="text-right"
                style={{
                  color: "white",
                  textShadow: "1px 2px 3px rgba(0,0,0,0.43)",
                }}
              >
                Sumber: covid19.or.id
              </p>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col lg="8">
              <Jumbotron>
                <h1>Halo dunia!</h1>
                <p>
                  Selamat datang di Sistem Antrean Publikasi Medfo Akinov
                  <b> (SIAPMEN)</b>. <br />
                  Silahkan buka tab{" "}
                  <b>
                    <i>Request</i>
                  </b>{" "}
                  untuk menambahkan permintaan publikasi dan buka tab{" "}
                  <b>
                    <i>Status</i>
                  </b>{" "}
                  untuk melihat perkembangan proses pembuatan publikasi.
                </p>
                <hr />
                <p>Jangan lupa bahagia hari ini ;)</p>
                <Button variant="primary" onClick={this.handleSOPModalShow}>
                  SOP Kami
                </Button>
                <Modal
                  show={this.state.SOP}
                  onHide={this.handleSOPModalHide}
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>SOP Kami</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      <b>1.</b> Poster paling lambat <b>H-3</b> dari waktu
                      publikasi
                      <br />
                      <b>2.</b> Video paling lambat <b>H-7</b> dari waktu
                      publikasi
                      <br />
                      <b>3.</b> Poster dan Video paling lambat <b>H-8</b> dari
                      waktu publikasi
                      <br />
                      <b>4.</b> Live Report paling lambat <b>H-1</b> dari waktu
                      publikasi
                      <br />
                      <b>5.</b> Repost BEM Fakultas paling lambat <b>H-2</b>{" "}
                      dari waktu publikasi
                      <br />
                      <b>6.</b> Repost Eksternal Lainnya paling lambat{" "}
                      <b>H-2</b> dari waktu publikasi dihitung saat sudah
                      memberikan feedback
                      <br />
                      <br />
                      <b>Mengorder berarti menyetujui sist.</b>
                    </p>
                  </Modal.Body>
                </Modal>
              </Jumbotron>
            </Col>
            <Col lg="4">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="./carousel/1.jpg"
                    alt="Akinov"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="./carousel/2.jpg"
                    alt="Medfo"
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return null;
    }
  }
}

export default Home;
