import React from 'react';
import NotFoundBlock from '../Components/NotFoundBlock';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <NotFoundBlock />
      <Link to={'/'}>
        <button>Назад</button>
      </Link>
    </>
  );
};

export default NotFound;
