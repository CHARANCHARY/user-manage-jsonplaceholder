import axios from "axios";
import { createContext, useState, useEffect } from "react";
import {  useLocation } from "react-router-dom";
import {  toast } from "react-toastify";

export const globalState = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [data, setData] = useState([]); // Stores users data
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [totalPages, setTotalPages] = useState(0); // Total number of pages
    // const navigate = useNavigate();
    const location = useLocation(); // To track route changes


    // Fetch users for a specific page
    const fetchUsers = async (page = 1, search = "") => {
        try {
          const res = await axios.get(
            `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${5}&q=${search}`
          );
          if (res.status === 200) {
            setData(res.data);
            const totalCount = res.headers['x-total-count'];
            setTotalPages(Math.ceil(totalCount / 5)); // Calculate total pages based on count
          }
        } catch (error) {
          toast.error("Failed to fetch users. Please try again later.");
          console.log("Fetch users error", error);
        }
      };
      
    // Add a new user
    // const addUser = async (formData) => {
    //     try {
    //         const res = await axios.post("https://jsonplaceholder.typicode.com/users", formData);
    //         if (res.status === 201) {
    //             setData([...data, { ...formData, id: res.data.id }]);
    //             toast.success("User added successfully!");
    //             navigate("/");
    //         }
    //     } catch (error) {
    //         toast.error("Failed to add user. Please try again later.");
    //         console.log("Add user error", error);
    //     }
    // };

    // // Edit an existing user
    // const editUser = async (id, formData) => {
    //     try {
    //         const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, formData);
    //         if (res.status === 200) {
    //             const updatedUser = res.data;
    //             const updatedData = data.map((user) => (user.id === id ? updatedUser : user));
    //             setData(updatedData);
    //             toast.success("User updated successfully!");
    //             navigate("/");
    //         }
    //     } catch (error) {
    //         toast.error("Failed to update user. Please try again later.");
    //         console.log("Edit user error", error);
    //     }
    // };

    // // Delete a user
    // const deleteUser = async (id) => {
    //     try {
    //         const res = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    //         if (res.status === 200) {
    //             const filteredData = data.filter((user) => user.id !== id);
    //             setData(filteredData);
    //             toast.success("User deleted successfully!");
    //         }
    //     } catch (error) {
    //         toast.error("Failed to delete user. Please try again later.");
    //         console.log("Delete user error", error);
    //     }
    // };

     useEffect(() => {
        fetchUsers(currentPage); // Fetch users for the current page
    }, [location, currentPage]); // Fetch when location changes or current page changes

    return (
        <globalState.Provider value={{ data, setData , currentPage, totalPages, setCurrentPage , fetchUsers}}>
            {children}
        </globalState.Provider>
    );
};