import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Axios from "axios";
import Swal from "sweetalert2";

class TombolDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pubs: [],
      editModal: false,
      kategori: this.props.kategori,
      media: this.props.media,
      waktupost: this.props.waktupost,
      nomor: "BEM/B/AKINOV/",
      caption: this.props.caption,
      konsep: this.props.konsep
    };

    this.handleEditModalHide = this.handleEditModalHide.bind(this);
    this.handleEditModalShow = this.handleEditModalShow.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleKonsepTyping = this.handleKonsepTyping.bind(this);
    this.handleCaptionTyping = this.handleCaptionTyping.bind(this);
  }

  handleUpdateClick() {
    let url = "https://medfokinov.fikrirp.com/api.php";
    let bodyFormData = new FormData();
    bodyFormData.set("token", "medfoAkinov2020");
    bodyFormData.set("action", "perbarui");
    bodyFormData.set("id", this.props.dataId);
    bodyFormData.set("caption", this.state.caption);
    bodyFormData.set("konsep", this.state.konsep);

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
          "Permintaan publikasi sudah diperbarui.",
          "success"
        )
      )
      .catch(() =>
        Swal.fire("Gagal", "Permintaan publikasi gagal diperbarui.", "error")
      )
      .then(() => {
        self.setState({
          editModal: false
        });
        self.props.refreshPublikasi();
      });
  }

  handleKonsepTyping(e) {
    this.setState({
      konsep: e.target.value
    });
  }

  handleCaptionTyping(e) {
    this.setState({
      caption: e.target.value
    });
  }

  componentDidMount() {
    switch (this.state.divisi) {
      case "D1":
        this.setState(state => {
          return {
            nomor: state.nomor + "I/"
          };
        });
        break;

      case "D2":
        this.setState(state => {
          return {
            nomor: state.nomor + "II/"
          };
        });
        break;

      case "D3":
        this.setState(state => {
          return {
            nomor: state.nomor + "III/"
          };
        });
        break;

      case "D4":
        this.setState(state => {
          return {
            nomor: state.nomor + "IV/"
          };
        });
        break;

      case "D5":
        this.setState(state => {
          return {
            nomor: state.nomor + "V/"
          };
        });
        break;

      default:
        break;
    }

    switch (this.state.kategori) {
      case "Internal - Publikasi Proker":
        this.setState(state => {
          return {
            nomor: state.nomor + "I1/"
          };
        });
        break;

      case "Internal - Publikasi Konten Informasi":
        this.setState(state => {
          return {
            nomor: state.nomor + "I2/"
          };
        });
        break;

      case "Internal - Publikasi Prestasi":
        this.setState(state => {
          return {
            nomor: state.nomor + "I3/"
          };
        });
        break;

      case "Internal - Live Report Acara":
        this.setState(state => {
          return {
            nomor: state.nomor + "I4/"
          };
        });
        break;

      case "Internal - Publikasi Lainnya":
        this.setState(state => {
          return {
            nomor: state.nomor + "I5/"
          };
        });
        break;

      case "Eksternal - Repost OA":
        this.setState(state => {
          return {
            nomor: state.nomor + "E1/"
          };
        });
        break;

      case "Eksternal - Publikasi Lainnya":
        this.setState(state => {
          return {
            nomor: state.nomor + "E2/"
          };
        });
        break;

      default:
        break;
    }

    switch (this.state.waktupost) {
      case "P1":
        this.setState({
          waktupost: "10:00"
        });
        break;

      case "P2":
        this.setState({
          waktupost: "16:00"
        });
        break;

      case "P3":
        this.setState({
          waktupost: "18:00"
        });
        break;

      default:
        break;
    }

    if (this.state.nomor < 10 && this.state.nomor != null) {
      this.setState(state => {
        return {
          nomor: state.nomor + "00" + this.state.nomor
        };
      });
    } else if (this.state.nomor > 10 && this.state.nomor < 100) {
      this.setState(state => {
        return {
          nomor: state.nomor + "0" + this.state.nomor
        };
      });
    } else if (this.state.nomor > 100) {
      this.setState(state => {
        return {
          nomor: state.nomor + this.state.nomor
        };
      });
    } else {
      this.setState(state => {
        return {
          nomor: state.nomor + "[BELUM DIREGISTER]"
        };
      });
    }
  }

  handleEditModalShow() {
    this.setState({
      editModal: true
    });
  }

  handleEditModalHide() {
    this.setState({
      editModal: false
    });
  }

  render() {
    return (
      <React.Fragment>
        <Button variant="info" size="sm" onClick={this.handleEditModalShow}>
          Detail
        </Button>
        <Modal
          show={this.state.editModal}
          onHide={this.handleEditModalHide}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Publikasi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nama request:</Form.Label>
                <Form.Control
                  type={"text"}
                  defaultValue={this.props.namarequest}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nomor rekap:</Form.Label>
                <Form.Control
                  type={"text"}
                  defaultValue={this.state.nomor}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Admin:</Form.Label>
                <Form.Control
                  type={"text"}
                  defaultValue={
                    this.props.admin != null
                      ? this.props.admin
                      : "Belum Diproses, kak."
                  }
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Caption:</Form.Label>
                <Form.Control
                  as={"textarea"}
                  rows={"10"}
                  defaultValue={this.state.caption}
                  onChange={this.handleCaptionTyping}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Kategori:</Form.Label>
                <Form.Control
                  type={"text"}
                  defaultValue={this.state.kategori}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Media:</Form.Label>
                <Form.Control
                  type={"text"}
                  defaultValue={this.state.media}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tanggal Post:</Form.Label>
                <Form.Control
                  type={"text"}
                  defaultValue={this.props.tanggalpost.split("12:00:00")[0]}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Waktu Post:</Form.Label>
                <Form.Control
                  type={"text"}
                  defaultValue={this.state.waktupost}
                  disabled
                />
              </Form.Group>
              <Form.Label>Konsep:</Form.Label>
              <Form.Control
                as={"textarea"}
                rows={"10"}
                defaultValue={this.state.konsep}
                onChange={this.handleKonsepTyping}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleEditModalHide}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleUpdateClick}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default TombolDetail;
