import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const Profilearea = (props) => {
  const { toggleLogin, isLogged } = props;

  const handleLogout = () => {
    localStorage.removeItem('userId');
    window.location.reload();
    toggleLogin();
  };

  return (
    <div className="profileArea">
      {!isLogged && (
        <button type="submit" onClick={() => toggleLogin()}>
          <PersonIcon /> Login
        </button>
      )}
      {isLogged && (
        <div className="logoutContainer">
          Bem-vindo!{' '}
          <a href="#" onClick={handleLogout}>
            <LogoutIcon />
          </a>
        </div>
      )}
    </div>
  );
};

export default Profilearea;
