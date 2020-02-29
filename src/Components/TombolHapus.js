import React from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";
import Swal from "sweetalert2";

class TombolHapus extends React.Component {
  constructor(props) {
    super(props);

    this.handleHapus = this.handleHapus.bind(this);
  }

  handleHapus() {
    let bodyFormData = new FormData();
    bodyFormData.set("token", "medfoAkinov2020");
    bodyFormData.set("action", "hapus");
    bodyFormData.set("id", this.props.dataId);

    let url = "https://medfokinov.fikrirp.com/api.php";
    let self = this;

    Swal.fire({
      title: "Yakin?",
      text: "Kalau salah kamu harus bikin baru lagi",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapuz!!",
      cancelButtonText: "Batal"
    }).then(result => {
      if (result.value) {
        Axios({
          method: "post",
          url: url,
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" }
        })
          .then(
            Swal.fire(
              "Sukses",
              "Berhasil dihapus! jangan lupa konfirmasi ke medinfo ya:|",
              "success"
            )
          )
          .catch(error => console.log(error.response));
        Swal.fire(
          "Dihapus!",
          "Berhasil. Konfirm ke medinfo ya hehe",
          "success"
        );
        self.props.refreshPublikasi();
      }
    });
  }

  render() {
    return (
      <Button variant="danger" size="sm" onClick={this.handleHapus}>
        Hapus
      </Button>
    );
  }
}

export default TombolHapus;
