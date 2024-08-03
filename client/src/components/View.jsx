import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './View.css';

const View = () => {
  const [userdata, setUserdata] = useState([]);
  const { id } = useParams();

  const getData = async () => {
    const res = await fetch(`http://localhost:8003/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const data = await res.json();

    if (res.status === 404 || !data) {
      alert("Error");
      console.log("Error");
    } else {
      setUserdata(data);
      console.log("get added");
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="container">
      <h1>User Details</h1>
      <div className="card">
        {userdata.image && <img src={`http://localhost:8003/${userdata.image}`} alt="profile" width="150" />}
        <p><span className="label">Name:</span> {userdata.name}</p>
        <p><span className="label">Email:</span> {userdata.email}</p>
        <p><span className="label">Job:</span> {userdata.work}</p>
        <p><span className="label">Address:</span> {userdata.address}</p>
        <p><span className="label">Description:</span> {userdata.desc}</p>
        <p><span className="label">Mobile:</span> {userdata.mobile}</p>
      </div>
    </div>
  );
};

export default View;
