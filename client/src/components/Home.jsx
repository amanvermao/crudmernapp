import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const [userdata, setUserdata] = useState([])
  console.log(userdata);

  const getData = async (e) => {
    const res = await fetch('https://newcrudmernapp-backend.onrender.com/getdata', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      alert("Error");
      console.log("Error");
    } else {
      setUserdata(data)
      console.log("get added");
    }
  };

  useEffect(() => {
    getData();
  }, [])

  const deleteuser = async (id) => {
    const res2 = await fetch(`https://newcrudmernapp-backend.onrender.com/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const deletedata = await res2.json()

    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("something went wrong on delete data");
    } else {
      console.log("user deleted");
      getData();
    }
  }

  return (
    <div className='container'>
      <Link to={'./Ragister'}><button type="button" className="btn btn-success mt-4">add+</button></Link>

      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Job</th>
            <th scope="col">Number</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            userdata.map((element, id) => {
              return (
                <tr key={id}>
                  <th scope="row">{id + 1}</th>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.work}</td>
                  <td>{element.mobile}</td>
                  <td>
                    {element.image && <img src={`https://newcrudmernapp-backend.onrender.com/${element.image}`} alt="profile" width="50" />}
                  </td>
                  <td>
                    <button onClick={() => deleteuser(element._id)} type="button" className="btn btn-danger">delete</button>
                    <Link to={`./Edit/${element._id}`}><button type="button" className="btn btn-warning">update</button></Link>
                    <Link to={`./View/${element._id}`}><button type="button" className="btn btn-success">view</button></Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home
