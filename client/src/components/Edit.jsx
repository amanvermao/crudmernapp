import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {

  const navigate = useNavigate()
  
    const [inp, setInp] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        address: "",
        dics: ""
      });
    
      const fun1 = (e) => {
        const { name, value } = e.target;
    
        setInp((prev) => ({
          ...prev,
          [name]: value,
        }));
      };


    
      const {id} = useParams(" ")
   
      const getData = async (e) => {    
    
    
        const res = await fetch(`https://newcrudmernapp-backend.onrender.com/getuser/${id}`, { 
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
        setInp(data)
          console.log("get added");
        }
      };
    
      useEffect(()=>{
        getData();
      },[])

      const updateuser = async (e)=>{
        e.preventDefault()

        const {name, email, mobile, age, work, address, desc} =  inp;
        const res2 = await fetch(`https://newcrudmernapp-backend.onrender.com/updateuser/${id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name, email, mobile, age, work, address, desc
          })
        })

        const data2 = await res2.json()
        console.log(data2);

        if ( res2.status == 422 || !data2) {
          alert("fill the data")
        }else{
          alert("data added")
          navigate('/');
        }
      }



  return (
    <div className='container mt-5'>
    <form>
      <div className="row">
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputName" className="form-label">Name</label>
          <input type="text" name='name' value={inp.name}  className="form-control" onChange={fun1} id="exampleInputName" />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputEmail" className="form-label">Email</label>
          <input type="email" name='email' value={inp.email} className="form-control" onChange={fun1} id="exampleInputEmail" />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputAge" className="form-label">Age</label>
          <input type="text" name='age' value={inp.age}  className="form-control" onChange={fun1} id="exampleInputAge" />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputMobile" className="form-label">Mobile</label>
          <input type="text" name='mobile' value={inp.mobile} className="form-control" onChange={fun1} id="exampleInputMobile" />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputWork" className="form-label">Work</label>
          <input type="text" name='work' value={inp.work} className="form-control" onChange={fun1} id="exampleInputWork" />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputAddress" className="form-label">Address</label>
          <input type="text" name='address' value={inp.address} className="form-control" onChange={fun1} id="exampleInputAddress" />
        </div>
        <div className="mb-3 col-12">
          <label htmlFor="exampleInputDics" className="form-label">Description</label>
          <textarea name="dics" value={inp.desc} className="form-control" onChange={fun1} id="exampleInputDics" rows={5}></textarea>
        </div>
      </div>
      <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>
    </form>
  </div>
  )
}

export default Edit
