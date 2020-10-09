import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/Modal";
import CommModal from "../Modals/CommModal";

class CommTable extends Component {
  state = {};
  /* deleteItem = (cust_id) => {
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
  }; */

  render() {
    const items = this.props.comm.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{item.timestamp}</td>
          <td>{item.details}</td>
          {/* <td>{item.timestamp}</td> */}
          {/* <td>{item.cust_phn}</td> */}
          {/* <td>{item.cust_address}</td>
          <td>{item.cust_gst}</td>
          <td>{item.rem_freq}</td> */}
          <td>
            <div style={{ width: "110px" }}>
              {/* <ModalForm
                buttonLabel="Edit"
                item={item}
                updateState={this.props.updateState}
              />{" "} */}
              <CommModal
                buttonLabel="View Details"
                comm={item}
              />
              {/* <Link
                className="btn btn-info"
                to={`/comm/${item.cust_id}`}
                role="button"
              >
                View Details
              </Link> */}
            </div>
          </td>
        </tr>
      );
    });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>S. No</th>
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
