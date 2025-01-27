import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginations = ({ currentPage, setCurrentPage, totalPages }) => {
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Pagination>
            <Pagination.Prev onClick={handlePrev} />
            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                    key={index}
                    active={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={handleNext} />
        </Pagination>
    );
};

export default Paginations;
