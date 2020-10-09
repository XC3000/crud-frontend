import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import FormMail from "./../Forms/FormMail";

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

        if (label === "Send Mail") {
            button = (
                <Button
                    color="success"
                    onClick={this.toggle}
                    style={{ float: "left", marginRight: "10px" }}
                >
                    {label}
                </Button>
            );
            title = "Send Mail";
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

                    {this.props.buttonLabel === "Send Mail" && (
                        <ModalBody>
                            <FormMail
                                toggle={this.toggle}
                                cust_email={this.props.cust_email}
                            />
                        </ModalBody>
                    )}
                </Modal>
            </div>
        );
    }
}

export default ModalForm;
