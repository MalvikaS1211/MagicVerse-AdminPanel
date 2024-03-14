
import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import { Row, Col, Card, Table } from "react-bootstrap";
import { BlockList } from "../../../services/api_function";


const BlockUserList = () => {


  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const pageSize = 30
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = localStorage.getItem('userDetails');
        const parsedDetails = JSON.parse(userDetails);
        const token = parsedDetails.token
        const result = await BlockList(token);
        setApiData(result);
       // console.log(result)
        const total = result.totalCount;
        const pages = Math.ceil(total / pageSize);
        setTotalPages(pages > 0 ? pages : 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header style={{ background: "black", border: '1px solid white' }}>
              <Card.Title style={{ color: "white", margin: "auto" }}>Withdraw Block List</Card.Title>
            </Card.Header>
            <Card.Body style={{ background: "black", border: '1px solid white' }} >
              <Table responsive style={{ background: 'black', color: 'white', borderBottom: '1px solid white' }}>
                <thead>

                  <tr>

                    <th>
                      <strong>NO.</strong>

                    </th>
                    <th>
                      <strong>User</strong>

                    </th>
                  
                   
                    <th>
                      <strong>Date&Time</strong>
                    </th>
                    {/* <th>  <strong>Deposit</strong></th>
                    <th>  <strong>Withdraw</strong></th> */}
                  </tr>
                </thead>
                <tbody>
                  {apiData && apiData.data ? (
                    apiData.data.map((user, index) => (
                      <tr key={index}> {/* Added a key for each row for better performance and to avoid warnings */}
                        <td>{(currentPage - 1) * pageSize + index + 1}</td>
                        <td><span className="smaller-font">{user.user}</span></td>
                        <td>{formatTimestamp(user.updatedAt)}</td>
                        
                        <td>
                          <div className="d-flex align-items-center table-action-icon">
                            {/* Icons or actions can be added here */}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : null}
                </tbody>
              </Table>
              <div className="d-flex justify-content-between">
                <span>
                  {/* Page{" "} */}
                  <strong>{/* {currentPage} of {totalPages} */}</strong>
                </span>
                {/* <span className="table-index">
                      Go to page :{" "}
                      <input
                        type="number"
                        className="ml-2"
                        min="1"
                        max={totalPages}
                        value={inputPage}
                        onChange={(e) => setInputPage(e.target.value)}
                        style={{ width: "50px" }}
                      />
                      <button
                        className="btn btn-primary ml-2"
                        onClick={handleGoToPage}
                      >
                        Go
                      </button>
                    </span> */}
              </div>
              {/* {filteredRowCount > 0 && (
              <div
                className="text-center mb-3 col-lg-6"
                style={{ margin: "auto" }}
              >
              <div className="filter-pagination  mt-3 bg-black"  >
                  <button
                    className="previous-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    style={{background:" linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",color:"black"}}
                  >
                    {"<<"}
                  </button>

                  <button
                    className="previous-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    style={{background:" linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",color:"black"}}
                  >
                    Previous
                  </button>

                  <button
                    className="next-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={{background:" linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",color:"black"}}
                  >
                    Next
                  </button>

                  <button
                    className="next-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={{background:" linear-gradient(90deg, #a2d254 15.9%, #ffd300 98.32%)",color:"black"}}
                  >
                    {">>"}
                  </button>

                  <span className="text-white">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
                
              </div>
                  )} */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}


export default BlockUserList