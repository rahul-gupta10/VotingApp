import React, { useEffect } from 'react';
import { useState } from 'react';

function ViewVotes() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const fetchvote = async () => {
        try {
            const response = await fetch('http://localhost:40001/candidate/getCount');
            const responseData = await response.json();

            if (responseData.success) {
                setData(responseData.result);
            } else {
                console.error('API request was not successful');
            }

        } catch (error) {
            
            // document.getElementById('viewVote').innerHTML = "Network response was not ok "+error.message;
            setError('Network response was not ok: ' + error.message);
        }

    }

    useEffect(() => {
        fetchvote();
        return () => {
            // Cleanup code here
            // This function will be called when the component unmounts
        };
    }, []);

    return (
        error?error :
        <div className="container mt-5">
            <h2>Get Vote Details</h2>


            <table className='voteData'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Party Name</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.name}>
                            <td>{item.candname}</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewVotes;
