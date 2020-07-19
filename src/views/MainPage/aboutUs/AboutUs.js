import React from 'react';
import styles from './aboutUs.module.scss';
import AboutUsImage from '../../../assets/aboutUs.png';
import Person1 from '../../../assets/person1.png';
import Person2 from '../../../assets/person2.png';
import Person3 from '../../../assets/person3.jpg';
import { Card } from 'antd';

const { Meta } = Card;

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <img className={styles.topImage} src={AboutUsImage} />
      <div className={styles.line} />
      <div className={styles.cardsContainer}>
        <Card
          className={styles.card}
          cover={<img alt='example' src={Person1} />}>
          <Meta
            title='Chan Xen'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Pellentesque velit velit, blandit at sagittis a, tincidunt sed nisl. Donec eget cursus erat.'
          />
        </Card>
        <Card
          className={styles.card}
          cover={<img alt='example' src={Person3} />}>
          <Meta
            title='Laura Bacon'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Pellentesque velit velit, blandit at sagittis a, tincidunt sed nisl. Donec eget cursus erat.'
          />
        </Card>
        <Card
          className={styles.card}
          cover={<img alt='example' src={Person2} />}>
          <Meta
            title='Jimmy Falcon'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque velit velit, blandit at sagittis a, tincidunt sed nisl. Donec eget cursus erat.'
          />
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
