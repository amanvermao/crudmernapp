import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  
const navigate = useNavigate()

  const [inp, setInp] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    desc: ""
  });

  const [image, setImage] = useState(null);

  const fun1 = (e) => {
    const { name, value } = e.target;
    setInp((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const oninputchange = (e) => {
    setImage(e.target.files[0]);
  };

  const addData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', inp.name);
    formData.append('email', inp.email);
    formData.append('age', inp.age);
    formData.append('mobile', inp.mobile);
    formData.append('work', inp.work);
    formData.append('address', inp.address);
    formData.append('desc', inp.desc);
    if (image) {
      formData.append('image', image);
    }

    const res = await fetch('http://localhost:8003/register', { 
      method: "POST",
      body: formData
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      alert("Error");
      console.log("Error");
    } else {
      alert("Data added successfully");
      console.log("Data added");
      navigate('/')
    }
  };

  return (
    <div className='container mt-5'>
      <form>
        <div className="row">
          {/* Input fields for name, email, age, mobile, work, address, and desc */}
          <div className="mb-3 col-6">
            <label htmlFor="exampleInputName" className="form-label">Name</label>
            <input type="text" name='name' value={inp.name} className="form-control" onChange={fun1} id="exampleInputName" />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="exampleInputEmail" className="form-label">Email</label>
            <input type="email" name='email' value={inp.email} className="form-control" onChange={fun1} id="exampleInputEmail" />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="exampleInputAge" className="form-label">Age</label>
            <input type="text" name='age' value={inp.age} className="form-control" onChange={fun1} id="exampleInputAge" />
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
            <label htmlFor="exampleInputDesc" className="form-label">Description</label>
            <textarea name="desc" value={inp.desc} className="form-control" onChange={fun1} id="exampleInputDesc" rows={5}></textarea>
          </div>
          <div className="mb-3 col-12">
            <label htmlFor="exampleInputImage" className="form-label">Image</label>
            <input type="file" accept='image/*' onChange={oninputchange} />
          </div>
        </div>
        <button type="submit" onClick={addData} className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Register;
