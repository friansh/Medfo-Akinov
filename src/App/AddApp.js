import React from "react";
import {
  Container,
  Row,
  Form,
  Col,
  Card,
  Button,
  Spinner,
  Carousel
} from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import Swal from "sweetalert2";
import Axios from "axios";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namarequest: "",
      divisi: "Divisi PKM",
      tanggalpost: "",
      jampost: "",
      kategori: "Internal - Publikasi Proker",
      media: "Poster",
      konsep: "",
      deadline: undefined,
      loading: false
    };

    this.handleSimpan = this.handleSimpan.bind(this);
    this.handleNamaRequestTyping = this.handleNamaRequestTyping.bind(this);
    this.handleRadioDivisi = this.handleRadioDivisi.bind(this);
    this.handleRadioJam = this.handleRadioJam.bind(this);
    this.handleRadioKategori = this.handleRadioKategori.bind(this);
    this.handleRadioMedia = this.handleRadioMedia.bind(this);
    this.handleKapan = this.handleKapan.bind(this);
    this.handleKonsepTyping = this.handleKonsepTyping.bind(this);
  }

  componentDidMount() {
    let deadline = new Date();
    deadline.setDate(deadline.getDate() + 3);
    this.setState({
      deadline: deadline
    });
  }

  handleKonsepTyping(e) {
    this.setState({
      konsep: e.target.value
    });
  }

  handleNamaRequestTyping(e) {
    this.setState({
      namarequest: e.target.value
    });
  }

  handleRadioDivisi(e) {
    this.setState({
      divisi: e.target.value
    });
  }

  handleKapan(kapan) {
    this.setState({
      tanggalpost: kapan
    });
  }

  handleRadioJam(e) {
    this.setState({
      jampost: e.target.id
    });
  }

  handleRadioKategori(e) {
    this.setState({
      kategori: e.target.value
    });
  }

  handleRadioMedia(e) {
    this.setState({
      media: e.target.value
    });
    let deadline = new Date();
    switch (e.target.value) {
      case "Poster":
        deadline.setDate(deadline.getDate() + 3);
        break;

      case "Video":
        deadline.setDate(deadline.getDate() + 7);
        break;

      case "Poster dan Video":
        deadline.setDate(deadline.getDate() + 8);
        break;

      case "Live Report":
        deadline.setDate(deadline.getDate() + 1);
        break;

      case "Repost":
        deadline.setDate(deadline.getDate() + 2);
        break;

      default:
        break;
    }
    this.setState({
      deadline: deadline
    });
  }

  handleSimpan() {
    if (
      this.state.namarequest !== "" &&
      this.state.divisi !== "" &&
      this.state.tanggalpost !== "" &&
      this.state.jampost !== "" &&
      this.state.kategori !== "" &&
      this.state.media !== "" &&
      this.state.konsep !== ""
    ) {
      this.setState({
        loading: true
      });
      let url = "https://medfokinov.fikrirp.com/api.php";
      let self = this;
      let bodyFormData = new FormData();
      bodyFormData.set("token", "medfoAkinov2020");
      bodyFormData.set("action", "tambah");
      bodyFormData.set("namarequest", this.state.namarequest);
      bodyFormData.set("divisi", this.state.divisi);
      bodyFormData.set("tanggalpost", this.state.tanggalpost);
      bodyFormData.set("jampost", this.state.jampost);
      bodyFormData.set("kategori", this.state.kategori);
      bodyFormData.set("media", this.state.media);
      bodyFormData.set("konsep", this.state.konsep);
      bodyFormData.set(
        "caption",
        "[JUDUL]\n\n" +
          "ISI\n\n" +
          "#<NamaProker>\n" +
          "#<HashtagDivisi>\n\n" +
          "[PASTE NOMOR REKAP KE SINI!!!]\n\n" +
          "#PadjadjaranAcademicCenter\n" +
          "#UnpadPinter\n" +
          "#KolaborasiKaryaInovasi\n\n" +
          "Departemen Akademik dan Inovasi\n" +
          "Bidang Kemahasiswaan\n" +
          "BEM Kema Unpad 2020\n" +
          "Kabinet Eksplorasi Makna"
      );
      Axios({
        method: "post",
        url: url,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(() => {
          Swal.fire(
            "Sukses",
            "Berhasil ditambah! jangan lupa konfirmasi ke medinfo ya!<br><br>" +
              "id Line: yoongie_ss (Dian)<br>" +
              "WA: 082118816441 (Dian)",
            "success"
          ).then(() => window.location.replace("/edit"));
        })
        .catch(error => console.log(error.response))
        .then(() =>
          self.setState({
            loading: false
          })
        );
    } else {
      Swal.fire("Gagal", "Isi dulu dong semua kolomnya!", "error");
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg="6" className="mb-3 mb-lg-0" style={{ padding: "0" }}>
            <Card
              style={{
                boxShadow: "3px 3px 13px 0px rgba(0,0,0,0.32)"
              }}
            >
              <Card.Header>Mau request desain dong, Medfokinov!</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formNamaRequest">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Nama request:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Mis: publikasi poster AYIC"
                      onChange={this.handleNamaRequestTyping}
                    />
                  </Form.Group>
                  <hr />
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>
                      Divisi kamu:
                    </Form.Label>
                    <Form.Control as="select" onChange={this.handleRadioDivisi}>
                      <option>Divisi PKM</option>
                      <option>Divisi Inovasi</option>
                      <option>Divisi Prestasi</option>
                      <option>Divisi Public Relation</option>
                      <option>Divisi Medfo</option>
                    </Form.Control>
                  </Form.Group>
                  <hr />
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>
                      Media yang diinginkan:
                    </Form.Label>
                    <Form.Control as="select" onChange={this.handleRadioMedia}>
                      <option>Poster</option>
                      <option>Video</option>
                      <option>Poster dan Video</option>
                      <option>Live Report</option>
                    </Form.Control>
                  </Form.Group>
                  <hr />
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>
                      Buat kapan?
                    </Form.Label>
                    <br />
                    <DayPickerInput
                      onDayChange={day => this.handleKapan(day)}
                      dayPickerProps={{
                        disabledDays: [
                          {
                            after: new Date(),
                            before: this.state.deadline
                          },
                          {
                            before: new Date()
                          }
                        ]
                      }}
                    />
                  </Form.Group>
                  <hr />
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>
                      Jam di postnya:
                    </Form.Label>
                    <fieldset>
                      <Form.Check
                        type="radio"
                        label="10:00"
                        name="radioPublishJam"
                        id="P1"
                        onChange={this.handleRadioJam}
                      />
                      <Form.Check
                        type="radio"
                        label="16:00"
                        name="radioPublishJam"
                        id="P2"
                        onChange={this.handleRadioJam}
                      />
                      <Form.Check
                        type="radio"
                        label="18:00"
                        name="radioPublishJam"
                        id="P3"
                        onChange={this.handleRadioJam}
                      />
                    </fieldset>
                  </Form.Group>
                  <hr />
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>
                      Kategori publikasi:
                    </Form.Label>
                    <Form.Control
                      as="select"
                      onChange={this.handleRadioKategori}
                    >
                      <option>Internal - Publikasi Proker</option>
                      <option>Internal - Publikasi Konten Informasi</option>
                      <option>Internal - Publikasi Prestasi</option>
                      <option>Internal - Live Report Acara</option>
                      <option>Internal - Publikasi Lainnya</option>
                      <option>Eksternal - Repost</option>
                      <option>Eksternal - Publikasi Lainnya</option>
                    </Form.Control>
                  </Form.Group>
                  <hr />
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>Konsep:</Form.Label>
                    <Form.Control
                      as={"textarea"}
                      rows={"3"}
                      onChange={this.handleKonsepTyping}
                      placeholder="Tuangkan ide kalian serinci rinci rinci mungkin. Mis: mau minta 4 poster, poster pertama isinya x, kedua isinya y, ketiga isinya p, keempat isinya q"
                    />
                  </Form.Group>
                  <hr />
                  <Container fluid>
                    <Row>
                      <Col>
                        <Button variant="primary" onClick={this.handleSimpan}>
                          Request
                        </Button>
                      </Col>
                      <Col>
                        {this.state.loading ? (
                          <Spinner className="float-right" animation="border" />
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" className="ml-lg-auto">
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
  }
}

export default Add;
