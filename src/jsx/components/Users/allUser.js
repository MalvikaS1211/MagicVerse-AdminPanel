import React, { Fragment, useEffect, useState,useMemo } from "react";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import { Row, Col, Card, Table } from "react-bootstrap";
// import { useTable, usePagination } from "react-table";
import { allUser } from "../../../services/api_function";
import { Link } from "react-router-dom";
import {COLUMNS} from "../../components/table/FilteringTable/Columns"
import MOCK_DATA  from "../../components/table/FilteringTable/MOCK_DATA_2.json"
//import './table.css';

export const AllUser = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [search, setSearch] = useState("");
  const pageSize = 30;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await allUser(currentPage, pageSize);
        setApiData(result.usersData );
        const total = result.totalUsers;
        const pages = Math.ceil(total / pageSize);
        setTotalPages(pages > 0 ? pages : 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleEditClick = (phoneNumber) => {
    console.log("Edit Clicked for phoneNumber:", phoneNumber);
  };
//   const handleGoToPage = () => {
//     const pageNumber = parseInt(inputPage);
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//       setInputPage("");
//     } else {
//       console.error("Invalid page number");
//     }
//   };
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  const columns = useMemo( () => COLUMNS, [] )
	const data = useMemo( () => MOCK_DATA, [] )
	const tableInstance = useTable({
		columns,
		data,	
		initialState : {pageIndex : 0}
	}, useFilters, useGlobalFilter, usePagination)
	
	const { 
		getTableProps, 
		getTableBodyProps, 
		headerGroups, 
		prepareRow,
		state,
		page,
		gotoPage,
		pageCount,
		pageOptions,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setGlobalFilter,
	} = tableInstance
	const {globalFilter, pageIndex} = state
  const filteredData = useMemo(() => {
    return apiData.filter(
      (item) =>
        item.userId.toLowerCase().includes(search.toLowerCase()) ||
        item.user.toLowerCase().includes(search.toLowerCase())
    );
  }, [apiData, search]);
  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title> All Users</Card.Title>
            </Card.Header>
            <Card.Body>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Table responsive>
              {/* <thead>
							   {headerGroups.map(headerGroup => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map(column => (
											<th {...column.getHeaderProps()}>
												{column.render('Header')}
												{column.canFilter ? column.render('Filter') : null}
											</th>
										))}
									</tr>
							   ))}
                 <input type="text" placeholder="Search..." />
    
							</thead> */}
             <thead>

             </thead>
             <thead>
             </thead>
              <thead>
                  <tr>
                    {/* <th className="width50"></th> */}
                    <th>
                      <strong>NO.</strong>
                    </th>
                    
                    <th>
                      <strong> UserID</strong>
                    </th>
                    <th>
                      <strong>User</strong>
                    </th>
                    <th>
                      <strong>referrerId</strong>
                    </th>
                    <th>
                      <strong>Leval</strong>
                    </th>
                    <th>
                      <strong>Team Business</strong>
                    </th>
                    <th>
                      <strong>Date</strong>
                    </th>
                    <th>  <strong>Team</strong></th>
                  </tr>
                </thead>
                <tbody>
                  {apiData?.map((user, index) => (
                    <tr>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{user.userId}</td>
                      <td>   <span className="smaller-font">{user.user}</span></td>
                      <td>{user.referrerId}</td>
                      <td>{user.rank}</td>
                      <td>{user.teamBusiness}</td>
                      <td>{formatTimestamp(user.createdAt)}</td>
                      <td>
                        <div className="d-flex align-items-center table-action-icon">
                          <Link
                            to={`/team-list?user=${encodeURIComponent(
                              user.user
                            )}`}
                            className="btn btn-primary light shadow btn-xs sharp me-1"
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
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
              <div
                className="text-center mb-3 col-lg-6"
                style={{ margin: "auto" }}
              >
                <div className="filter-pagination  mt-3">
                  <button
                    className="previous-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    {"<<"}
                  </button>

                  <button
                    className="previous-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <button
                    className="next-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>

                  <button
                    className="next-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    {">>"}
                  </button>

                  <span>
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
