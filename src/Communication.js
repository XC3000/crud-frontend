import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import CommTable from "./Components/Tables/CommTable";
import CommModal from "./Components/Modals/CommModal";
import MailModal from "./Components/Modals/MailModal";

const axios = require("axios");

class Communication extends Component {
    state = {
        cust_comm: [],
        cust_id: "",
        cust_email: "",
    };

    getItems() {
        const cust_id = window.location.href.split("/")[4];
        axios({
            method: "get",
            url: `http://127.0.0.1:5000/crud/${cust_id}`,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(({ data }) => {
                const { cust_comm, cust_id, cust_email } = data;
                this.setState({
                    cust_comm,
                    cust_id,
                    cust_email,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    addItemToState = (item) => {
        this.setState((prevState) => ({
            cust_comm: [item, ...prevState.cust_comm],
        }));
    };

    updateState = (item) => {
        const itemIndex = this.state.cust_comm.findIndex(
            (data) => data.cust_id === item.cust_id
        );
        const newArray = [
            ...this.state.cust_comm.slice(0, itemIndex),
            item,
            ...this.state.cust_comm.slice(itemIndex + 1),
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
                        <h1 style={{ margin: "20px 0" }}>
                            Communication History
                        </h1>
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
                        <MailModal
                            buttonLabel="Send Mail"
                            addItemToState={this.addItemToState}
                            cust_email={this.state.cust_email}
                        />
                        <CommModal
                            buttonLabel="Add Communication"
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
