import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddNewUser = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  // Set input values
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  // Submit user data
  const submitUserData = async (e) => {
    e.preventDefault();

    if (!inputData.fname || !inputData.lname || !inputData.email || !inputData.department) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("https://jsonplaceholder.typicode.com/users", {
        name: `${inputData.fname} ${inputData.lname}`,
        email: inputData.email,
        company: { name: inputData.department },
      });

      if (res.status === 201) {
        toast.success("User added successfully.");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error("Failed to add user.");
      console.log("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-1">Add New User</h2>
      <Card className="shadow mt-3 p-3">
        <Form onSubmit={submitUserData}>
          <Row>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                value={inputData.fname}
                onChange={setInputValue}
                placeholder="Enter First Name"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                value={inputData.lname}
                onChange={setInputValue}
                placeholder="Enter Last Name"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={inputData.email}
                onChange={setInputValue}
                placeholder="Enter Email"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={inputData.department}
                onChange={setInputValue}
                placeholder="Enter Department"
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add User"}
            </Button>
          </Row>
        </Form>
      </Card>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddNewUser;
