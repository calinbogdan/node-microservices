import React, { useState } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);

    axios.get("http://localhost:5000/employees")
        .then(({ data }) => setEmployees(data));
      
    return (
        <Container>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employment Date</th>
                </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => {
                        const {firstName, lastName, startedWorkingOn } = employee;
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{firstName}</td>
                                <td>{lastName}</td>
                                <td>{new Date(startedWorkingOn).toLocaleDateString()}</td>
                            </tr>)
                    })}          
                </tbody>
            </Table>
        </Container>);
};

export default EmployeesList;