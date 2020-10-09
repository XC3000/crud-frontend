import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "./Components/Modals/Modal";
import CommTable from "./Components/Tables/CommTable";
import CommModal from "./Components/Modals/CommModal";
/* import DataTable from "./Components/Tables/DataTable"; */

const axios = require("axios");

class Communication extends Component {
  state = {
    cust_comm: [],
    cust_id: "",
  };

  getItems() {
    const cust_id = window.location.href.split("/")[4];
    /* console.log(cust_id);
    let url_det = `http://127.0.0.1:5000/crud/${cust_id}`; */
    axios({
      method: "get",
      url: `http://127.0.0.1:5000/crud/${cust_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(({ data }) => {
        console.log(data);
        const { cust_comm, cust_id } = data;
        this.setState({
          cust_comm,
          cust_id,
        });
      })
      /* .then(function (response) {
        // handle success
        /* console.log(response.data); */
      /*let data = response.data;
        console.log(data);
        const { cust_comm } = data;
        console.log(cust_comm);
        this.setState({
          cust_comm,
        });
      }) */
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  addItemToState = (item) => {
    console.log(item);
    this.setState((prevState) => ({
      cust_comm: [...prevState.cust_comm, item],
    }));
  };

  updateState = (item) => {
    const itemIndex = this.state.cust_comm.findIndex(
      (data) => data.cust_id === item.cust_id
    );
    const newArray = [
      item,
      ...this.state.cust_comm
      /* // destructure all items from beginning to the indexed item
      ...this.state.cust_comm.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...this.state.cust_comm.slice(itemIndex + 1), */  
    ];
    this.setState({ cust_comm: newArray });
  };

  componentDidMount() {
    this.getItems();
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>Communication History</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <CommTable
              items={this.state.items}
              updateState={this.updateState}
              comm={this.state.cust_comm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm
              buttonLabel="Send Mail"
              addItemToState={this.addItemToState}
            />
            <CommModal
              buttonLabel="add communication"
              addItemToState={this.addItemToState}
              cust_id={this.state.cust_id}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Communication;
