import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Voting() {
  let history = useNavigate();
  const [CandData, setCandData] = useState([]);
  const [time, setTime] = useState();

  async function fetchCandlist() {
    const response = await fetch('http://localhost:40001/candidate/candidatelist');
    const data = await response.json()
    if (data.success) {
      setCandData(data.response)
    }
    else {
      document.body.innerHTML = data.error
    }
  }

  async function Voting(id) {

    const response = await fetch(`http://localhost:40001/candidate/vote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': sessionStorage.getItem('authtoken')
      }
    })
    const data = await response.json();
    if (data.success) {
      document.getElementById('errmsg').style.color = 'green';
      document.getElementById('errmsg').innerHTML = 'Thank you for you vote!! Your vote is recorded';
    }
    else {
      document.getElementById('errmsg').style.color = 'red';
      document.getElementById('errmsg').innerHTML = data.error;
    }
  }


  function getCurrentTime() {
    const currentTime = new Date().toLocaleTimeString();
    setTime(currentTime)
  }

  useEffect(() => {
    sessionStorage.getItem('username')?fetchCandlist():history("/login");
    

    const time = setInterval(() => {
      getCurrentTime()
    }, 1000);
    return () => {
      // Cleanup code here
      // This function will be called when the component unmounts
      clearInterval(time);
    };
  }, [history]);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className='d-flex justify-content-between'>
            <h2>Voting</h2>
            <h6 className="align-self-end">Time: {time}</h6>
          </div>
          <div id="errmsg" style={{ color: 'red' }}></div>
          <table className='voteData'>
            <thead>
              <tr>
                <th>Sr. no</th>
                <th>Candidate Name</th>
                <th>Patry</th>
              </tr>
            </thead>
            <tbody>
              {
                !time ? (
                  <tr>
                    <td colSpan="3">Loading...</td>
                  </tr>
                ) :
                  CandData.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <button className="btn btn-primary" style={{ width: '130px' }} onClick={() => Voting(item._id)}>{item.party}</button>
                        <img src={item.electionSign} alt="party sign" style={{ width: '50px', height: '50px', marginLeft: '30px' }} />
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

export default Voting;
