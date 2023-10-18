import React from 'react';
import NotFoundBlock from '..//Components/NotFoundBlock/index';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
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
