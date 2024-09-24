import React, { Fragment, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { Row, Col, Card, Table } from "react-bootstrap";
import { COLUMNS } from "../../components/table/FilteringTable/Columns";
import MOCK_DATA from "../../components/table/FilteringTable/MOCK_DATA_2.json";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { fireBase, db } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#dadde9",
    fontSize: "12px",
    fontWeight: 400,
    border: "1px solid #25262B",
  },
}));

export const AllUser = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "adminLogin"));
        const data = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        console.log(data);
        setAdminData(data);
      } catch (error) {
        console.error("Error fetching adminLogin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleSearch = async (e) => {
    const query = e.target.value.trim().toLowerCase();
    const sanitizedQuery = query.replace(/[\\|^$*+?.(){}[\]]/g, "");
    setSearch(sanitizedQuery);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const exportToExcel = (data, fileName) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };
  const tableRef = useRef(null);

  return (
    <Fragment>
      <Row>
        <div className="display_end">
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search here..."
              onChange={handleSearch}
            />
          </div>
          <label class="form-label" for="form1"></label>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>All Users</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                {/* <button onClick={() => exportToExcel(data, 'exported-data')}>Export to Excel</button> */}
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>User Id</th>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Twitter</th>
                    <th>Instagram</th>
                    <th>Telagram</th>
                    <th>Youtube</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </Table>

              <div className="d-flex justify-content-between">
                <span>
                  {/* Page{" "} */}
                  <strong>{/* {currentPage} of {totalPages} */}</strong>
                </span>
              </div>
              <div
                className="text-center mb-3 col-lg-6"
                style={{ margin: "auto" }}
              >
                <div className="filter-pagination mt-3 d-flex gap-1 justify-content-center align-content-center align-items-center">
                  <button
                    className="previous-button btn btn-primary"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <button
                    className="next-button btn btn-primary"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>

                  <span className=" ">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AllUser;
