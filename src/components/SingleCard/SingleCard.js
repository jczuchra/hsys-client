import React from 'react';
import styles from './singleCard.module.scss';

const SingleCard = ({ image, title, text, right }) => {
  return (
    <div className={right ? styles.right : styles.container}>
      {!right && (
        <div className={styles.imageContainer}>
          <img className={styles.image} src={image} />
        </div>
      )}
      <div className={styles.descriptionContainer}>
        <h1 className={right ? styles.rightTitle : styles.title}>{title}</h1>
        <p className={right ? styles.rightDescription : styles.description}>
          {text}
        </p>
      </div>
      {right && (
        <div className={styles.imageContainer}>
          <img className={styles.image} src={image} />
        </div>
      )}
    </div>
  );
};

export default SingleCard;
