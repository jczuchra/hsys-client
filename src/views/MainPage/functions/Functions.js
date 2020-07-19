import React from 'react';
import FunctionsImage from '../../../assets/functions.png';
import SingleCard from '../../../components/SingleCard/SingleCard';
import Devices from '../../../assets/devices.png';
import Assets from '../../../assets/assets.png';
import Doctors from '../../../assets/doctors.png';
import styles from './functions.module.scss';

const Functions = () => {
  const placeholder = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`;
  return (
    <div className={styles.functionsContainer}>
      <img className={styles.topImage} src={FunctionsImage} />
      <div className={styles.line} />
      <SingleCard title='Devices' text={placeholder} image={Devices} />
      <SingleCard title='Assets' text={placeholder} image={Assets} right />
      <SingleCard title='Devices' text={placeholder} image={Doctors} />
    </div>
  );
};

export default Functions;
