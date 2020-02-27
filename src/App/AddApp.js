import React from "react";
import { Container, Row, Form, Col, Card, Button } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import Swal from "sweetalert2";
import Axios from "axios";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namarequest: "",
      divisi: "",
      tanggalpost: "",
      jampost: "",
      kategori: "",
      media: "",
      konsep: "",
      deadline: undefined
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
      divisi: e.target.id
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
      kategori: e.target.id
    });
  }

  handleRadioMedia(e) {
    this.setState({
      media: e.target.id
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
      let url = "http://192.168.100.32/medfo-akinov-backend/";
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
        .then(
          Swal.fire(
            "Sukses",
            "Berhasil ditambah! jangan lupa konfirmasi ke medinfo ya:|",
            "success"
          )
        )
        .catch(error => console.log(error.response));
    } else {
      Swal.fire("Gagal", "Isi dulu dong semua kolomnya!", "error");
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg="6">
            <Card style={{ boxShadow: "3px 3px 13px 0px rgba(0,0,0,0.32)" }}>
              <Card.Header>Mau request desain dong, Medfo!</Card.Header>
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
                  <Form.Group controlId="formDivisi">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Divisi kamu:
                    </Form.Label>
                    <Form.Check
                      type="radio"
                      name="radioDivisi"
                      label="Divisi PKM"
                      id="D1"
                      onChange={this.handleRadioDivisi}
                    />
                    <Form.Check
                      type="radio"
                      name="radioDivisi"
                      label="Divisi Inovasi"
                      id="D2"
                      onChange={this.handleRadioDivisi}
                    />
                    <Form.Check
                      type="radio"
                      name="radioDivisi"
                      label="Divisi Prestasi"
                      id="D3"
                      onChange={this.handleRadioDivisi}
                    />
                    <Form.Check
                      type="radio"
                      name="radioDivisi"
                      label="Divisi PR"
                      id="D4"
                      onChange={this.handleRadioDivisi}
                    />
                    <Form.Check
                      type="radio"
                      name="radioDivisi"
                      label="Divisi Medfo"
                      id="D5"
                      onChange={this.handleRadioDivisi}
                    />
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
                        disabledDays: {
                          after: new Date(),
                          before: this.state.deadline
                        }
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
                  <Form.Group controlId="formMedia">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Kategori publikasi:
                    </Form.Label>
                    <fieldset>
                      <Form.Check
                        type="radio"
                        label="Publikasi Proker"
                        name="radioJenisPublikasi"
                        id="K1"
                        onChange={this.handleRadioKategori}
                      />
                      <Form.Check
                        type="radio"
                        label="Publikasi Konten Informasi"
                        name="radioJenisPublikasi"
                        id="K2"
                        onChange={this.handleRadioKategori}
                      />
                      <Form.Check
                        type="radio"
                        label="Publikasi Prestasi"
                        name="radioJenisPublikasi"
                        id="K3"
                        onChange={this.handleRadioKategori}
                      />
                      <Form.Check
                        type="radio"
                        label="Publikasi Lainnya"
                        name="radioJenisPublikasi"
                        id="K4"
                        onChange={this.handleRadioKategori}
                      />
                    </fieldset>
                  </Form.Group>
                  <hr />
                  <Form.Group controlId="formMedia">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Media yang diinginkan:
                    </Form.Label>
                    <fieldset>
                      <Form.Check
                        type="radio"
                        label="Poster"
                        name="radioMedia"
                        id="M1"
                        onChange={this.handleRadioMedia}
                      />
                      <Form.Check
                        type="radio"
                        label="Video"
                        name="radioMedia"
                        id="M2"
                        onChange={this.handleRadioMedia}
                      />
                      <Form.Check
                        type="radio"
                        label="Poster dan Video"
                        name="radioMedia"
                        id="M3"
                        onChange={this.handleRadioMedia}
                      />
                    </fieldset>
                  </Form.Group>
                  <hr />
                  <Form.Group>
                    <Form.Label>Konsep:</Form.Label>
                    <Form.Control
                      as={"textarea"}
                      rows={"3"}
                      onChange={this.handleKonsepTyping}
                      placeholder="Tuangkan ide kalian serinci rinci rinci mungkin. Mis: mau minta 4 poster, poster pertama isinya x, kedua isinya y, ketiga isinya p, keempat isinya q"
                    />
                  </Form.Group>
                  <hr />
                  <Button variant="primary" onClick={this.handleSimpan}>
                    Request
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Add;
