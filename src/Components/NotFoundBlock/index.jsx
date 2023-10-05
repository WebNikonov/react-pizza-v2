import React from 'react';

import styles from './NotFoundBlock.module.scss';

console.log(styles);

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>&#128556;</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        {' '}
        К сожалению данная страница отсутсвует в нашем интернет-магазине
      </p>
    </div>
  );
};

export default NotFoundBlock;
