import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/Modal";

class DataTable extends Component {
    deleteItem = (cust_id) => {
        let confirmDelete = window.confirm("Delete item forever?");
        if (confirmDelete) {
            fetch("http://127.0.0.1:5000/crud", {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cust_id,
                }),
            })
                .then((response) => response.json())
                .then((item) => {
                    this.props.deleteItemFromState(cust_id);
                })
                .catch((err) => console.log(err));
        }
    };

    render() {
        const items = this.props.items.map((item) => {
            return (
                <tr key={item.cust_id}>
                    <th scope="row">{item.cust_id}</th>
                    <td>{item.cust_name}</td>
                    <td>{item.cust_email}</td>
                    <td>{item.cust_phn}</td>
                    <td>{item.cust_address}</td>
                    <td>{item.cust_gst}</td>
                    <td>{item.rem_freq}</td>
                    <td>
                        <div style={{ width: "110px" }}>
                            <ModalForm
                                buttonLabel="Edit"
                                item={item}
                                updateState={this.props.updateState}
                            />{" "}
                            <Button
                                color="danger"
                                onClick={() => this.deleteItem(item.cust_id)}
                            >
                                Del
                            </Button>
                        </div>
                    </td>
                </tr>
            );
        });

        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>cust_id</th>
                        <th>cust_name</th>
                        <th>cust_email</th>
                        <th>cust_phn</th>
                        <th>cust_address</th>
                        <th>cust_gst</th>
                        <th>rem_freq</th>
                    </tr>
                </thead>
                <tbody>{items}</tbody>
            </Table>
        );
    }
}

export default DataTable;
