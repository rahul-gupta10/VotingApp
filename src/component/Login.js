import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    let history = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        document.getElementById('errormsg').innerHTML= "";
        try {
            const response = await fetch('http://localhost:40001/user/login', {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify({aadharCardNumber:aadhaarNumber,password:password})
        })
        const data = await response.json();
        if (data.success) {
            sessionStorage.setItem("authtoken",data.authtoken)
            sessionStorage.setItem("username",data.userstatus.name)
            history("/voting");
            
        }else{
            document.getElementById('errormsg').innerHTML=data.error
        }
        } catch (error) {
            setError('Status 500 Network error occur '+error.message)
        }

    };

    return (
        <div className="container mt-5">
            {error?error:
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form>
                        <h2>Login</h2>
                        <div className="mb-3">
                            <label htmlFor="aadhaarNumber" className="form-label">Aadhaar Number</label>
                            <input type="text" className="form-control" id="aadhaarNumber" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" autoComplete='off' className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div id="errormsg" style={{color:'red'}}></div>
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>}
        </div>

    );
}

export default Login;
