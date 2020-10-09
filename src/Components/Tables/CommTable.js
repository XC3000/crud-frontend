import React, { Component } from "react";
import { Table } from "reactstrap";
import CommModal from "../Modals/CommModal";

class CommTable extends Component {
    state = {};

    render() {
        const items = this.props.comm.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{item.timestamp}</td>
                    <td>{item.details}</td>
                    <td>
                        <div style={{ width: "110px" }}>
                            <CommModal buttonLabel="View Details" comm={item} />
                        </div>
                    </td>
                </tr>
            );
        });

        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Sl. No</th>
                        <th>Timestamp</th>
                        <th>Details</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{items}</tbody>
            </Table>
        );
    }
}

export default CommTable;
