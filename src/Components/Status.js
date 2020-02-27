import React from "react";
import { Badge, Button, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "undefined",
      badge: "danger",
      cacat: false
    };

    this.handleCommentClick = this.handleCommentClick.bind(this);
  }

  handleCommentClick() {
    if (
      this.props.comment === null ||
      this.props.comment === "" ||
      this.props.comment === undefined
    )
      Swal.fire("maaf, admin belum ngasih komen hehe");
    else Swal.fire(this.props.comment);
  }

  componentDidMount() {
    switch (this.props.status) {
      case "1":
        this.setState({
          status: "Belum Diproses",
          badge: "secondary"
        });
        break;

      case "2":
        this.setState({
          status: "Diproses",
          badge: "primary"
        });
        break;

      case "3":
        this.setState({
          status: "Cacat",
          badge: "warning",
          cacat: true
        });
        break;

      case "4":
        this.setState({
          status: "Selesai",
          badge: "success"
        });
        break;

      default:
        this.setState({
          status: "undefined",
          badge: "danger"
        });
        break;
    }
  }

  render() {
    if (this.state.cacat)
      return (
        <Container>
          <Row>
            <Badge variant={this.state.badge}>{this.state.status}</Badge>
          </Row>
          <Row>
            <Button
              variant="warning"
              size="sm"
              onClick={this.handleCommentClick}
              className="mt-2"
            >
              Baca Komentar
            </Button>
          </Row>
        </Container>
      );
    else return <Badge variant={this.state.badge}>{this.state.status}</Badge>;
  }
}

export default Status;
