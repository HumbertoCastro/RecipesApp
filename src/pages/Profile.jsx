import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';

function Profile() {
  let email = JSON.parse(localStorage.getItem('user'));
  if (email === null) {
    email = {
      email: '',
    };
  }
  const history = useHistory();

  return (
    <div className="profile">
      <div className="profile-title">
        <span>
          { '<div>' }
        </span>
        <h1 data-testid="page-title">Profile</h1>
        <span>
          { '<div>' }
        </span>
      </div>
      <h2 data-testid="profile-email">{ email.email }</h2>
      <button
        type="button"
        className="profile-button"
        data-testid="profile-done-btn"
        onClick={ () => {
          history.push('/done-recipes');
        } }
      >
        Done Recipes
      </button>
      <button
        type="button"
        className="profile-button"
        data-testid="profile-favorite-btn"
        onClick={ () => {
          history.push('/favorite-recipes');
        } }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        className="profile-button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('');
        } }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
