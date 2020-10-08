import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddEditForm extends React.Component {
  state = {
    cust_name: "",
    cust_email: "",
    cust_phn: "",
    cust_address: "",
    cust_gst: "",
    rem_freq: "",
    cust_id: "",
    errors: {
      cust_name: [],
    },
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
    fetch("http://127.0.0.1:5000/crud", {
      method: "post",
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
        let { _id } = item;
        item["cust_id"] = _id;
        this.props.addItemToState(item);
        this.props.toggle();
        /* if (Array.isArray(item)) {
          this.props.addItemToState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        } */
      })
      .catch((err) => console.log(err));
  };

  submitFormEdit = (e) => {
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
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
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
  }

  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          {this.state.errors["cust_name"].length > 0 && (
            <div className="alert alert-danger">
              error
            </div>
          )}
          <Label for="cust_name">cust_name</Label>
          <Input
            type="text"
            className="form-control"
            name="cust_name"
            id="cust_name"
            onChange={this.onChange}
            value={this.state.cust_name === null ? "" : this.state.cust_name}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </FormGroup>
        <FormGroup>
          <Label for="cust_email">cust_email</Label>
          <Input
            type="email"
            name="cust_email"
            id="cust_email"
            onChange={this.onChange}
            value={this.state.cust_email === null ? "" : this.state.cust_email}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="cust_phn">cust_phn</Label>
          <Input
            type="text"
            name="cust_phn"
            id="cust_phn"
            onChange={this.onChange}
            value={this.state.cust_phn === null ? "" : this.state.cust_phn}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="cust_address">cust_address</Label>
          <Input
            type="text"
            name="cust_address"
            id="cust_address"
            onChange={this.onChange}
            value={
              this.state.cust_address === null ? "" : this.state.cust_address
            }
            placeholder="ex. 555-555-5555"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="cust_gst">cust_gst</Label>
          <Input
            type="text"
            name="cust_gst"
            id="cust_gst"
            onChange={this.onChange}
            value={this.state.cust_gst === null ? "" : this.state.cust_gst}
            placeholder="City, State"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="rem_freq">rem_freq</Label>
          <Input
            type="text"
            name="rem_freq"
            id="rem_freq"
            onChange={this.onChange}
            value={this.state.rem_freq}
            required
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm;
