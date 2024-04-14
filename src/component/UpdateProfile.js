import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const history = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    mobile: '',
    address: '',
    aadharCardNumber: '',
    password: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('http://localhost:40001/user/profile', {
        method: 'GET',
        headers: {
          authtoken: sessionStorage.getItem('authtoken')
        }
      })
      const data = await response.json();
      setFormData(data.response);
      
    } catch (error) {
      document.body.style.padding = "30px";
      document.body.innerHTML = "Network response was not ok " + error;
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch('http://localhost:40001/user/updateprofile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authtoken: sessionStorage.getItem('authtoken')
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data) {
        sessionStorage.setItem('username', formData.name)
        document.getElementById('msg').innerHTML = "Profile Updated successfully! redirecting to home...";
        document.getElementById('msg').style.color = 'green';
        document.getElementById('msg').style.fontSize = '18px';

        setTimeout(() => {
            history('/')
        }, 3000);

      }

    } catch (error) {
      document.body.innerHTML = "Someting went wrong while fetching " + error
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>Update Profile</h2>
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
              <input type="email" autoComplete='off' className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
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
              <input type="text" disabled className="form-control" id="aadharCardNumber" name="aadharCardNumber" value={formData.aadharCardNumber} required />
            </div>

            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role<span className="text-danger">*</span></label>
              {/* <input list="option" autoComplete='off' type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} />
               */}

              <select id="role" disabled className="form-control" name="role" value={formData.role}>
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
            <div id="msg"></div>
            <button type="submit" className="btn btn-primary" >Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
