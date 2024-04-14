import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    mobile: '',
    address: '',
    aadharCardNumber: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.mobile.length !== 10) {
      document.getElementById('errmsg').innerHTML = "Invalid Mobile Number"
    }
    else if (formData.aadharCardNumber.length !== 16) {
      document.getElementById('errmsg').innerHTML = "Invalid aadharCardNumber"
    }
    else if (formData.age < 18) {
      document.getElementById('errmsg').innerHTML = "Below 18 are not eligible for voting"
    }
    else {
      if (formData.role === 'voter' || 'admin') {
        const response = await fetch('http://localhost:40001/user/createuser', {
          method: 'POST', // Specify the request method
          headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.success) {
          sessionStorage.setItem("authtoken", data.authtoken)
          sessionStorage.setItem("username", data.response.name)
          history('/voting')
        }
        else {
          document.getElementById('errmsg').innerHTML = data.error
        }
      }
      else {
        document.getElementById('errmsg').innerHTML = "Please select from the list (voter or admin)"
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name<span className="text-danger">*</span></label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age<span className="text-danger">*</span></label>
              <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile</label>
              <input type="text" className="form-control" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address<span className="text-danger">*</span></label>
              <textarea className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="aadharNumber" className="form-label">Aadhar Number<span className="text-danger">*</span></label>
              <input type="text" className="form-control" id="aadharCardNumber" name="aadharCardNumber" value={formData.aadharCardNumber} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password<span className="text-danger">*</span></label>
              <input type="password" autoComplete="off" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role<span className="text-danger">*</span></label>
              {/* <input list="option" autoComplete='off' type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} />
               */}

              <select id="role" className="form-control" name="role" value={formData.role} onChange={handleChange}>
              <option value="" disabled>Select a role</option>
                <option value="voter">voter</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <datalist id='option'>
              <option value="Voter" />
              <option value="admin" />
            </datalist>
            <div id="errmsg" style={{ color: 'red' }}></div>
            <button type="submit" className="btn btn-primary" >Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
