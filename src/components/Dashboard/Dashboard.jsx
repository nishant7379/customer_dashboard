import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Pic } from "../../assets";
import data from "../../data.json";
import { FaSearch } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { AddCustomer, Table } from "../index";
import { RxCross2 } from "react-icons/rx";

const Dashboard = () => {
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedData, setSortedData] = useState([]);
  const [tableData, setTableData] = useState(data);
  const [displayPage, setDisplayPage] = useState(true);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const sorted = tableData.slice().sort((a, b) => {
      if (sortColumn) {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sorted);
  }, [sortColumn, sortDirection, tableData, displayPage]);

  useEffect(() => {
    const filteredData = tableData.filter((item) => Object.values(item).some((value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase())));
    setSortedData(filteredData);
  }, [searchQuery, tableData]);

  const indexOfLastRow = currPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrPage(pageNumber);

  const handleSort = (columnName) => {
    if (columnName === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortDirection("asc");
    }
  };

  const handleRowsPerPageChange = (e) => setRowsPerPage(Number(e.target.value));

  const handleDelete = (productId) => {
    const updatedData = tableData.filter((item) => item.tracking_id !== productId);
    setTableData(updatedData);
    setDisplayPage(false);
  };

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const toggleAddCustomer = () => setShowAddCustomer(!showAddCustomer);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="dashboard">
        <div className="dash_header">
          <div className="search_div">
            <FaSearch className="search" onClick={() => setShowSearch(!showSearch)} />
            <input type="text" placeholder="Search..." onChange={handleSearch} className="search-input" style={{ display: showSearch ? "block" : "none" }} />
          </div>
          <img src={Pic} alt="Profile Pic" />
        </div>

        <div className="dash_details">
          <div className="dash_filters">
            <div className="rowsOptionDiv">
              <label htmlFor="rowsPerPage">Show</label>
              <select className="selectRows" id="rowsPerPage" value={rowsPerPage} onChange={handleRowsPerPageChange}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
              <span>Entries</span>
            </div>

            <button className="addCustomer" onClick={toggleAddCustomer}>
              <MdAdd />
              <p>Add Customer</p>
            </button>
          </div>

          <div className="data">
            <Table data={currRows} handleSort={handleSort} handleDelete={handleDelete} />
          </div>

          <div className="pagination" style={{ display: `${displayPage ? "" : "none"}` }}>
            <button className={`page_prev ${currPage === 1 ? "border-none" : ""}`} onClick={() => paginate(currPage - 1)} disabled={currPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)} className={`page_number ${currPage === index + 1 ? "bg-black" : ""}`}>
                {index + 1}
              </button>
            ))}
            <button className={`page_next ${currRows.length < rowsPerPage ? "border-none" : ""}`} onClick={() => paginate(currPage + 1)} disabled={currRows.length < rowsPerPage}>
              Next
            </button>
          </div>
        </div>
      </div>
      {showAddCustomer && (
        <div className="addCustomerContainer">
          <div className="closeIcon" onClick={toggleAddCustomer}>
            <RxCross2 />
          </div>
          <AddCustomer toggleAddCustomer={toggleAddCustomer} tableData={tableData} setTableData={setTableData} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
