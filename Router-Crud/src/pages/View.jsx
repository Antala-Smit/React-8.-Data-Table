import React, { useState } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import './View.css'

function View() {
  const navigate = useNavigate();
  let data = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [];
  const [record, setRecord] = useState(data);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, SetSortOrder] = useState('');

  const handleDelete = (id) => {
    const updatedRecords = record.filter(user => user.id !== id);
    setRecord(updatedRecords);
    localStorage.setItem('users', JSON.stringify(updatedRecords));
  };

  const handleSelect = (id) => {
    if (selectedRecords.includes(id)) {
      setSelectedRecords(selectedRecords.filter(recordId => recordId !== id));
    } else {
      setSelectedRecords([...selectedRecords, id]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedRecords = record.filter(user => !selectedRecords.includes(user.id));
    setRecord(updatedRecords);
    setSelectedRecords([]);
    localStorage.setItem('users', JSON.stringify(updatedRecords));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value); 0
  };

  const handleSort = (e) => {
    SetSortOrder(e.target.value);
  };

  const filteredRecords = record.filter(user => {
    const fullName = `${user.firstname} ${user.lastname}`;
    return (
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.course.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }).filter(user => {
    if (statusFilter === '')
      return true;
    return user.status === statusFilter;
  });

  let sortedRecords;
  if (sortOrder === 'A-Z') {
    sortedRecords = filteredRecords.sort((a, b) => a.firstname.localeCompare(b.firstname));
  } else if (sortOrder === 'Z-A') {
    sortedRecords = filteredRecords.sort((a, b) => b.firstname.localeCompare(a.firstname));
  } else {
    sortedRecords = filteredRecords;
  }

  return (
    <div>
      <Header />

      <div className="container">
        <div className="row">
          <button className="btn btn-danger mb-2 col-1" onClick={handleDeleteSelected} disabled={selectedRecords.length === 0}>
            Delete Selected
          </button>
          <input type="search" value={searchQuery} onChange={handleSearch} placeholder='Search Here...' className='form-control mb-2 mx-3' style={{ width: "20%" }} />
          <select value={statusFilter} onChange={handleStatusFilter} className='form-control mb-2 mx-2' style={{ width: "20%" }}>
            <option>---Select Status---</option>
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>
          <select value={sortOrder} onChange={handleSort} className='form-control mb-2 mx-3' style={{ width: "20%" }}>
            <option value="">Sort by Name...</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRecords(record.map(user => user.id));
                      } else {
                        setSelectedRecords([]);
                      }
                    }}
                    checked={selectedRecords.length === record.length && record.length > 0}
                  />
                </th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Course</th>
                <th scope="col">Phone No.</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((val) => (
                <tr key={val.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRecords.includes(val.id)}
                      onChange={() => handleSelect(val.id)}
                    />
                  </td>
                  <td>{val.firstname}</td>
                  <td>{val.lastname}</td>
                  <td>{val.email}</td>
                  <td>{val.gender}</td>
                  <td>{val.course.join(' , ')}</td>
                  <td>{val.phone}</td>
                  <td>{val.date}</td>
                  <td>
                    {val.status === 'Active' ? (
                      <button className="btn btn-success btn-sm">{val.status}</button>
                    ) : (
                      <button className="btn btn-warning btn-sm">{val.status}</button>
                    )}
                  </td>
                  <td className="button">
                    <button className="btn btn-danger" onClick={() => handleDelete(val.id)}>
                      Delete
                    </button>
                    <button onClick={() => navigate('/edit', { state: val })} className="btn btn-info">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default View;
