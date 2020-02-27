import React from "react";
import { Container, Row, Col, Card, Table, ButtonGroup } from "react-bootstrap";
import Axios from "axios";
import TombolHapus from "../Components/TombolHapus";
import TombolDetail from "../Components/TombolDetail";
import TombolMedfo from "../Components/TombolMedfo";
import Divisi from "../Components/Divisi";
import Status from "../Components/Status";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pubs: [],
      editModal: false
    };

    this.refreshPublikasi = this.refreshPublikasi.bind(this);
  }

  refreshPublikasi() {
    let url = "http://192.168.100.32/medfo-akinov-backend/";
    let bodyFormData = new FormData();
    bodyFormData.set("token", "medfoAkinov2020");
    bodyFormData.set("action", "lihat");

    let self = this;
    Axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(response => {
        self.setState({
          pubs: response.data.data
        });
      })
      .catch(error => console.log(error.response));
  }

  componentDidMount() {
    this.refreshPublikasi();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg="8">
            <Card style={{ boxShadow: "3px 3px 13px 0px rgba(0,0,0,0.32)" }}>
              <Card.Header>Status kerjaan kami nich hehe</Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Request</th>
                      <th>Divisi</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.pubs.map((pub, index) => (
                      <tr key={pub.id}>
                        <td>{index + 1}.</td>
                        <td>{pub.nama_request}</td>
                        <td>
                          <Divisi divisi={pub.divisi} />
                        </td>
                        <td>
                          <Status status={pub.status} comment={pub.komentar} />
                        </td>
                        <td>
                          <ButtonGroup>
                            <TombolDetail
                              namarequest={pub.nama_request}
                              kategori={pub.kategori}
                              media={pub.media}
                              tanggalpost={pub.tanggal_post}
                              waktupost={pub.jam_post}
                              caption={pub.caption}
                              nomor={pub.nomor}
                              divisi={pub.divisi}
                              konsep={pub.konsep}
                              admin={pub.admin}
                              dataId={pub.id}
                              refreshPublikasi={this.refreshPublikasi}
                            />
                            <TombolHapus
                              dataId={pub.id}
                              refreshPublikasi={this.refreshPublikasi}
                            />
                            <TombolMedfo
                              admin={pub.admin}
                              namarequest={pub.nama_request}
                              dataId={pub.id}
                              refreshPublikasi={this.refreshPublikasi}
                            />
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Edit;
