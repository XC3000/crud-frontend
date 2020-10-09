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
    fetch("http://127.0.0.1:5000/comm", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cust_id: this.props.cust_id,
        timestamp: this.state.timestamp,
        details: this.state.details,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        console.log(item);
        this.props.addItemToState({
          cust_id: this.props.cust_id,
          timestamp: this.state.timestamp,
          details: this.state.details,
        });
        this.props.toggle();
        /* let { _id } = item;
        item["cust_id"] = _id;
        this.props.addItemToState(item);
        this.props.toggle(); */
        /* if (Array.isArray(item)) {
          this.props.addItemToState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        } */
      })
      .catch((err) => console.log(err));
  };

  /* submitFormEdit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/crud", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cust_name: this.state.cust_name,
        cust_email: this.state.cust_email,
        cust_phn: this.state.cust_phn,
        cust_address: this.state.cust_address,
        cust_gst: this.state.cust_gst,
        rem_freq: this.state.rem_freq,
        cust_id: this.state.cust_id,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        console.log(item);
        this.props.updateState(item);
        this.props.toggle();
        /* if (Array.isArray(item)) {
          console.log(item[0])
          this.props.updateState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        } */
  /*})
      .catch((err) => console.log(err));
  };
 */
  componentDidMount() {
    this.setState({
      timestamp: new Date().toISOString(),
    });
  }
  /* componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const {
        cust_name,
        cust_email,
        cust_phn,
        cust_address,
        cust_gst,
        rem_freq,
        cust_id,
      } = this.props.item;
      this.setState({
        cust_name,
        cust_email,
        cust_phn,
        cust_address,
        cust_gst,
        rem_freq,
        cust_id,
      });
    }
  } */

  render() {
    /* let a = new Date().toISOString(); */

    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          {/* {this.state.errors["cust_name"].length > 0 && (
            <div className="alert alert-danger">
              this.state.errors["cust_name"].map({
                (item) => item
              })
            </div>
          )} */}
          <Label for="cust_name">Timestamp</Label>
          <Input
            type="text"
            name="timestamp"
            id="timestamp"
            value={this.state.timestamp}
            /* onChange={(e) => {
              this.setState({
                timestamp: new Date().toISOString(),
              });
            }} */
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
            value={this.state.details === null ? "" : this.state.details}
            required
          />
        </FormGroup>

        <Button>Submit</Button>
      </Form>
    );
  }
}

export default FormAddComm;