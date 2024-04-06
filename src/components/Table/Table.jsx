import React from "react";
import "./Table.css";
// react-icons
import { MdEdit, MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { Demo } from "../../assets";

const Table = ({ data, handleSort, handleDelete }) => {
  const handleEdit = (productId) => {
    console.log("Edit product:", productId);
  };

  const getStatusStyle = (status) => {
    let color = "";
    let backgroundColor = "";

    switch (status) {
      case "Delivered":
        color = "#1F9254";
        backgroundColor = "#EBF9F1";
        break;
      case "Process":
        color = "#CD6200";
        backgroundColor = "#FEF2E5";
        break;
      case "Canceled":
        color = "#000";
        backgroundColor = "#FBE7E8";
        break;
      default:
        break;
    }

    return { color, backgroundColor };
  };

  return (
    <table className="dash_table">
      <thead>
        <tr className="table_columns">
          <th style={{ textAlign: "center" }}>Tracking ID</th>
          <th onClick={() => handleSort("product_name")}>
            Product
            <span>
              <RxTriangleUp color="#767676"/>
              <RxTriangleDown color="#767676"/>
            </span>
          </th>
          <th onClick={() => handleSort("customer")}>
            Customer
            <span>
              <RxTriangleUp color="#767676"/>
              <RxTriangleDown color="#767676"/>
            </span>
          </th>
          <th onClick={() => handleSort("date")}>
            Date
            <span>
              <RxTriangleUp color="#767676"/>
              <RxTriangleDown color="#767676"/>
            </span>
          </th>
          <th onClick={() => handleSort("amount")}>
            Amount
            <span>
              <RxTriangleUp color="#767676"/>
              <RxTriangleDown color="#767676"/>
            </span>
          </th>
          <th onClick={() => handleSort("payment_mode")}>
            Payment Mode
            <span>
              <RxTriangleUp color="#767676"/>
              <RxTriangleDown color="#767676"/>
            </span>
          </th>
          <th onClick={() => handleSort("status")}>
            Status
            <span>
              <RxTriangleUp color="#767676"/>
              <RxTriangleDown color="#767676"/>
            </span>
          </th>
          <th style={{ textAlign: "center" }}>Actions</th>
        </tr>
      </thead>

      <tbody className="">
        {data.map((product) => (
          <tr key={product.tracking_id} className="table_columns">
            <td style={{ textAlign: "center" }}>{product.tracking_id}</td>
            <td className="img_name">
              <img src={Demo} alt="" />
              {product.product_name}
            </td>
            <td>{product.customer}</td>
            <td>{product.date}</td>
            <td>${product.amount}</td>
            <td>{product.payment_mode}</td>
            <td className="status">
              <span style={getStatusStyle(product.status)}>{product.status}</span>
            </td>
            <td style={{ textAlign: "center" }} className="table_action">
              <FaRegEdit className="edit-icon" onClick={() => handleEdit(product.tracking_id)} />
              <RiDeleteBin6Line className="delete-icon" onClick={() => handleDelete(product.tracking_id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
