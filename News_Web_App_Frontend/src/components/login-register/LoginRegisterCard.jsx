import React from 'react';
import { Image, Button } from 'react-bootstrap';
import Skyline from '../../assets/images/sky.jpg';
import '../../styles/LoginRegisterCard.css';
import { Link } from 'react-router-dom';

function LoginRegisterCard() {
  return (
    <div className="page-container">
      <div className="card-content-container">
        <div className="new-login-register-container">
          <div className="new-image-container">
            <Image
              src={Skyline}
              alt="Cover Image"
              className="image"
            />
            <div className="overlay"></div>
          </div>
          <div className="overlay-text">
            <h1>Access the best of Marro News!</h1>
            <div className="flex-container-spaced">
            <Link to="/login">
                  <Button id="center" variant='light' className="submit">LOGIN</Button>
                </Link>
              <h2>OR</h2>
              <Link to="/register">
                  <Button id="center" variant='light' className="submit">REGISTER</Button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegisterCard;
