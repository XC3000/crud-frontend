import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class FormAddComm extends React.Component {
    state = {
        details: "",
        timestamp: "",
    };

    onChange = (e) => {
        let errors = { ...this.state.errors };
        this.setState({ [e.target.name]: e.target.value });
        let { value, name } = e.target;
        switch (name) {
            case "cust_name":
                errors.cust_name =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            default:
                break;
        }
        this.setState({
            errors,
        });
    };

    submitFormAdd = (e) => {
        e.preventDefault();
        const commObj = {
            cust_id: this.props.cust_id,
            timestamp: this.state.timestamp,
            details: this.state.details,
        };
        fetch("http://127.0.0.1:5000/comm", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commObj),
        })
            .then((response) => response.json())
            .then((item) => {
                this.props.addItemToState(commObj);
                this.props.toggle();
            })
            .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.setState({
            timestamp: new Date().toISOString(),
        });
    }

    render() {
        return (
            <Form
                onSubmit={
                    this.props.item ? this.submitFormEdit : this.submitFormAdd
                }
            >
                <FormGroup>
                    <Label for="cust_name">Timestamp</Label>
                    <Input
                        type="text"
                        name="timestamp"
                        id="timestamp"
                        value={this.state.timestamp}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="details">Details</Label>
                    <Input
                        type="text"
                        name="details"
                        id="details"
                        onChange={this.onChange}
                        value={
                            this.state.details === null
                                ? ""
                                : this.state.details
                        }
                        required
                    />
                </FormGroup>

                <Button>Submit</Button>
            </Form>
        );
    }
}

export default FormAddComm;
