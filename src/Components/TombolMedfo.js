import React from "react";
import {
  Button,
  Modal,
  ButtonGroup,
  Container,
  Row,
  Form
} from "react-bootstrap";
import Axios from "axios";
import Swal from "sweetalert2";

class TombolMedfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medfoModal: false,
      admin: this.props.admin
    };

    this.handleMedfoModalHide = this.handleMedfoModalHide.bind(this);
    this.handleMedfoModalShow = this.handleMedfoModalShow.bind(this);
    this.handleProses = this.handleProses.bind(this);
    this.handleCacat = this.handleCacat.bind(this);
    this.handleSelesai = this.handleSelesai.bind(this);
    this.handleAdminChange = this.handleAdminChange.bind(this);
  }

  handleAdminChange(e) {
    this.setState({
      admin: e.target.value
    });
  }

  handleProses() {
    let url = "https://medfokinov.fikrirp.com/api.php";
    let bodyFormData = new FormData();
    bodyFormData.set("token", "medfoAkinov2020");
    bodyFormData.set("action", "proses");
    bodyFormData.set("id", this.props.dataId);
    bodyFormData.set("admin", this.state.admin);

    let self = this;
    Axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() =>
        Swal.fire(
          "Berhasil",
          "Publikasi <b>" + self.props.namarequest + "</b> sudah diproses.",
          "success"
        )
      )
      .catch(() =>
        Swal.fire(
          "Gagal",
          "Publikasi <b>" + self.props.namarequest + "</b> gagal diproses.",
          "error"
        )
      )
      .then(() => {
        this.props.refreshPublikasi();
      });
  }

  handleCacat() {
    let url = "https://medfokinov.fikrirp.com/api.php";
    let bodyFormData = new FormData();
    bodyFormData.set("token", "medfoAkinov2020");
    bodyFormData.set("action", "cacat");
    bodyFormData.set("id", this.props.dataId);
    bodyFormData.set("admin", this.state.admin);

    this.handleMedfoModalHide();

    let self = this;

    Swal.fire({
      title: "Komentar dari medfo?",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Kirim"
    }).then(result => {
      bodyFormData.set("komentar", result.value);
      Axios({
        method: "post",
        url: url,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(() =>
          Swal.fire(
            "Berhasil",
            "Publikasi <b>" + self.props.namarequest + "</b> sudah dicacatkan.",
            "success"
          )
        )
        .catch(() =>
          Swal.fire(
            "Gagal",
            "Publikasi <b>" + self.props.namarequest + "</b> gagal dicacatkan.",
            "error"
          )
        )
        .then(() => {
          window.location.reload();
        });
    });
  }

  handleSelesai() {
    let url = "https://medfokinov.fikrirp.com/api.php";
    let bodyFormData = new FormData();
    bodyFormData.set("token", "medfoAkinov2020");
    bodyFormData.set("action", "selesai");
    bodyFormData.set("id", this.props.dataId);
    bodyFormData.set("admin", this.state.admin);

    this.handleMedfoModalHide();

    let self = this;

    Swal.fire({
      title: "Nomor publikasinya?",
      input: "text",
      confirmButtonText: "Kirim"
    }).then(result => {
      bodyFormData.set("nomor", result.value);
      Axios({
        method: "post",
        url: url,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(response => {
          if (response.data.status === "OK")
            Swal.fire(
              "Berhasil",
              "Publikasi <b>" + self.props.namarequest + "</b> sudah selesai.",
              "success"
            );
          else
            Swal.fire(
              "Gagal",
              "Publikasi <b>" + self.props.namarequest + "</b> gagal selesai.",
              "error"
            );
        })
        .catch(() =>
          Swal.fire(
            "Gagal",
            "Publikasi <b>" + self.props.namarequest + "</b> gagal selesai.",
            "error"
          )
        )
        .then(() => {
          this.props.refreshPublikasi();
        });
    });
  }

  handleMedfoModalHide() {
    this.setState({
      medfoModal: false
    });
  }

  handleMedfoModalShow() {
    this.setState({
      medfoModal: true
    });
  }

  render() {
    return (
      <React.Fragment>
        <Button variant="secondary" onClick={this.handleMedfoModalShow}>
          Medfo
        </Button>
        <Modal
          show={this.state.medfoModal}
          onHide={this.handleMedfoModalHide}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Publikasi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <h6>Admin:</h6>
              </Row>
              <Row>
                <Form.Control
                  as="select"
                  onChange={this.handleAdminChange}
                  defaultValue={this.state.admin}
                >
                  <option>Amin</option>
                  <option>Dian</option>
                  <option>Fikri</option>
                  <option>Ilma</option>
                </Form.Control>
              </Row>
              <Row className="mt-3">
                <h6>Proses:</h6>
              </Row>
              <Row>
                <ButtonGroup>
                  <Button variant="primary" onClick={this.handleProses}>
                    Proses
                  </Button>
                  <Button variant="warning" onClick={this.handleCacat}>
                    Cacat
                  </Button>
                  <Button variant="success" onClick={this.handleSelesai}>
                    Selesai
                  </Button>
                </ButtonGroup>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default TombolMedfo;
