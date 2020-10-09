import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import FormAddComm from "../Forms/FormAddComm";

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );

    const label = this.props.buttonLabel;

    let button = "";
    let title = "";

    if (label === "add communication") {
      button = (
        <Button
          color="success"
          onClick={this.toggle}
          style={{ float: "left", marginRight: "10px" }}
        >
          {label}
        </Button>
      );
      title = "Add Communication";
    } else {
      button = (
        <Button
          color="info"
          onClick={this.toggle}
          style={{ float: "left", marginRight: "10px" }}
        >
          {label} {/* View Details */}
        </Button>
      );
      title = "View Communication";
    }

    return (
      <div>
        {button}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            {title}
          </ModalHeader>

          {this.props.buttonLabel === "View Details" && (
            <ModalBody>
              <h4>Timestamp</h4>
              <p>{this.props.comm.timestamp}</p>
              <h4>Detils</h4>
              <p>{this.props.comm.details}</p>
            </ModalBody>
          )}

          {this.props.buttonLabel === "add communication" && (
            <ModalBody>
              <FormAddComm
              addItemToState={this.props.addItemToState}
              updateState={this.props.updateState}
              toggle={this.toggle}
              cust_id={this.props.cust_id} />
            </ModalBody>
          )}
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
