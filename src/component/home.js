import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-11 offset-md-1">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Welcome to our Voting App!</h5>
              <p className="card-text">Our website is your go-to place for participating in various elections and voting for your favorite candidates! From big national elections to local community initiatives, we've got you covered.
                <br/>
                <br/>
                With our easy-to-use interface, you can navigate through upcoming elections, get to know the candidates, and cast your vote hassle-free. We're committed to making the voting process simple, transparent, and secure for everyone.
                <br/>
                <br/>
                Join us in making your voice heard and shaping the future of your community and beyond! Together, let's build a brighter tomorrow through democracy and active participation!</p>
              <Link to="/voting" className="btn btn-primary">Start Voting</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
