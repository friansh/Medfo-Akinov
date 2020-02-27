import React from "react";

class Divisi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divisi: "undefined"
    };
  }

  componentDidMount() {
    switch (this.props.divisi) {
      case "D1":
        this.setState({
          divisi: "PKM"
        });
        break;

      case "D2":
        this.setState({
          divisi: "Inovasi"
        });
        break;

      case "D3":
        this.setState({
          divisi: "Prestasi"
        });
        break;

      case "D4":
        this.setState({
          divisi: "Public Relation"
        });
        break;

      case "D5":
        this.setState({
          divisi: "Medinfo"
        });
        break;

      default:
        this.setState = {
          divisi: "undefined"
        };
        break;
    }
  }

  render() {
    return this.state.divisi;
  }
}

export default Divisi;
