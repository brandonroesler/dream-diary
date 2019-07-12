import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './HomePage.css';

const HomePage = (props) => {
  return (
    <div className="HomePage">
      <NavBar
        user={props.user}
        handleLogout={props.handleLogout}
      />
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;