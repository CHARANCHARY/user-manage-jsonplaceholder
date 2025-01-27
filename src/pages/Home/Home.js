import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Tables from '../../components/Tables/Tables';
import Spiner from "../../components/Spiner/Spiner";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { globalState } from '../../context/GlobalContext';
import { ToastContainer } from "react-toastify";


const Home = () => {
  const {  fetchUsers } = useContext(globalState);
  const [showspin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1); // Start from page 1
  const [totalpage] = useState(2); // Initially 0
  const navigate = useNavigate();

  const adduser = () => {
    navigate("/add-user");
  };

  // Handle input change in search bar
  const handleOnchange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    fetchUsers(page, searchTerm); // Call API with updated search term
  };

  // Fetch data on component mount and page change
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSpin(false);
    }, 1200); // Hide spinner after 1.2 seconds

    fetchUsers(page, search); // Fetch data with current search term and page

    return () => clearTimeout(timeout);
  }, [search, page , search]); // Trigger API call when search or page changes

  return (
    <>
      <div className="container gradient">
        <div className="main_div">
          {/* Search and Add buttons */}
          <div className="search_add mt-4">
            <div className="search col-lg-12">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 animated-search-input"
                  aria-label="Search"
                  onChange={handleOnchange} // Trigger search on change
                />
              </Form>
            </div>
            <div className="add_btn mt-4">
              <button onClick={adduser} className="animated-button1 mt-4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                &nbsp; Add User
              </button>
            </div>
          </div>
        </div>

        {/* Show Spinner or Table */}
        {showspin ? <Spiner /> : <Tables setPage={setPage} page={page} totalpage={totalpage} />}

         <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default Home;
