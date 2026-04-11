import React from "react";
import Table from 'react-bootstrap/Table';
import { Avatar } from "@mui/material";
import DeleteJournalistPopup from "./DeleteJournalistPopup";
import EnumConverter from "../utilities/EnumConverter";
import "../../styles/JournalistsTable.css";

function JournalistsTable({ title, journalists }) {
  return (
    <div>
      <h2>{title}</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {journalists.map((journalist, index) => (
            <tr key={index}>
              <div className="avatarContainer">
                <Avatar
                  src={`data:image/png;base64,${journalist.profilePicture}`}
                  alt={journalist.fullName}
                  className="avatarImage"
                />
              </div>

              <td>{journalist.fullName}</td>
              <td>{journalist.username}</td>
              <td>{journalist.email}</td>
              <td>{journalist.dateOfBirth}</td>
              <td>{EnumConverter.formatEnumToText(journalist.department)}</td>
              <td><DeleteJournalistPopup journalistId={journalist.id} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default JournalistsTable;
