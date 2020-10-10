import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class FormMail extends React.Component {
    state = {
        subject: "Communication History",
        body: "",
        doSchedule: false,
        delay: "",
    };

    componentDidMount = () => {
        let str = "";
        this.props.cust_comm.forEach(({ details, timestamp }) => {
            str = str + `Timestamp: ${timestamp}\nDetails: ${details}\n\n`;
        });
        this.setState({ body: str });
    };

    submitFormAdd = (e) => {
        e.preventDefault();
        const { subject, body, doSchedule, delay } = this.state;
        if (
            !body ||
            !subject ||
            (doSchedule && !delay) ||
            (doSchedule && +delay > 60)
        ) {
            alert("All fields are compulsory!");
            return;
        }
        let endpoint = "mail",
            alertMsg = "Mail Sent";
        const mailDetails = {
            cust_email: this.props.cust_email,
            subject,
            body,
        };
        if (doSchedule) {
            mailDetails.delay = delay * 60;
            alert(`Mail scheduled for ${delay} minutes`);
            this.props.toggle();
            alertMsg = `Mail has been sent successfully`;
            endpoint = "schedule";
        }
        fetch("http://127.0.0.1:5000/" + endpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mailDetails),
        })
            .then((response) => {
                if (response.status === 400) {
                    throw new Error("Mail not sent!");
                } else {
                    return response.json();
                }
            })
            .then((item) => {
                alert(alertMsg);
                this.props.toggle();
            })
            .catch((err) => {
                console.log(err);
                alert("Oops! The Mail was not sent, please try again later.");
                this.props.toggle();
            });
    };

    render() {
        return (
            <Form
                onSubmit={
                    this.props.item ? this.submitFormEdit : this.submitFormAdd
                }
            >
                <FormGroup>
                    <Label for="subject">Subject</Label>
                    <Input
                        type="text"
                        name="subject"
                        id="subject"
                        value={this.state.subject}
                        onChange={(e) => {
                            this.setState({ subject: e.target.value });
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Body">Email Body</Label>
                    <Input
                        type="textarea"
                        name="Body"
                        id="Body"
                        onChange={(e) => {
                            this.setState({ body: e.target.value });
                        }}
                        value={this.state.body === null ? "" : this.state.body}
                        required
                    />
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input
                            type="checkbox"
                            checked={this.state.doSchedule}
                            onChange={() => {
                                this.setState({
                                    doSchedule: !this.state.doSchedule,
                                });
                            }}
                        />
                        Schedule Mail
                    </Label>
                </FormGroup>
                {this.state.doSchedule ? (
                    <FormGroup>
                        <Label for="delay">
                            Delay in Minutes (Max. 60mins)
                        </Label>
                        <Input
                            type="text"
                            name="delay"
                            id="delay"
                            onChange={(e) => {
                                this.setState({ delay: e.target.value });
                            }}
                            value={this.state.delay}
                            required
                        />
                    </FormGroup>
                ) : null}

                <Button>Submit</Button>
            </Form>
        );
    }
}

export default FormMail;
