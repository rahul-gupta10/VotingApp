import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PasswordChange() {
    const history = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    // const [currentPassword, newPassword, confirmPassword] = formData;

    const onChangeHandle = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Event handler for form submission
    const handleSubmit =async (event) => {
        event.preventDefault();
        if (formData.newPassword === formData.confirmPassword) {
            try {
                const response = await fetch('http://localhost:40001/user/profile/updatePass',{
                    method:'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        authtoken: sessionStorage.getItem('authtoken')
                      },
                      body: JSON.stringify(formData)
                })
                const data = await response.json();
                if(data.success){
                    document.getElementById('msg').innerHTML = "Password updated successfully";
                    setFormData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    })
                }
                else{
                    document.getElementById('msg').innerHTML = "Failed to update password "+data.error;
                }
            } catch (error) {
                
            }
            
        }else document.getElementById('msg').innerHTML = "New passord does not match ";
        
    };

    useEffect(()=>{
        if (!sessionStorage.getItem('authtoken')) {
            history('/login');
          }
        /* eslint-disable react-hooks/exhaustive-deps */
    },[])
    

    return (
        <div className="container mt-5 col-md-4 offset-md-4">
            <h2 className="mb-4">Password Reset</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Current Password:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="form-control"
                        value={formData.currentPassword}
                        onChange={onChangeHandle}
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="form-control"
                        value={formData.newPassword}
                        onChange={onChangeHandle}
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control"
                        value={formData.confirmPassword}
                        onChange={onChangeHandle}
                        autoComplete='off'
                        required
                    />
                </div>
                <div id="msg"></div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
        </div>
    );
}

export default PasswordChange;
