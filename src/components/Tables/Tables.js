import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import './table.css';
import { globalState } from '../../context/GlobalContext';
import Paginations from '../pagination/Paginations';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Tables = () => {
  const { data, currentPage, totalPages, setCurrentPage } = useContext(globalState);
  const navigate = useNavigate();

  return (
    <div className="container">
      <Row>
        <div className="col ">
          <Card className="shadow-lg rounded-3">
            <Table className="align-items-center table-styled" responsive="sm" bordered>
              <thead>
                <tr className="table-header">
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.length > 0 &&
                  data.map((i) => (
                    <tr key={i.id}>
                      <td>{i.id}</td>
                      <td>{i.name.split(' ')[0]}</td>
                      <td>{i.name.split(' ')[1]}</td>
                      <td>{i.email}</td>
                      <td>{i.company.name}</td>
                      <td>
                      <Dropdown>
                      <Dropdown.Toggle variant="light" className="action custom-dropdown-toggle" id="dropdown-basic">
                        <FaBars /> {/* Only the bar icon is visible here */}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{   position : 'static'}}>
                        <Dropdown.Item onClick={() => navigate(`/userprofile/${i.id}`)}>
                          <span>View</span>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate(`/edit/${i.id}`)}>
                          <span>Edit</span>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate(`/delete/${i.id}`)}>
                          <span>Delete</span>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </div>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default Tables;
