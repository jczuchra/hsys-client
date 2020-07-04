import React from 'react';
import { Row, Col, Button } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  AimOutlined,
  FacebookFilled,
  InstagramFilled,
  YoutubeFilled,
} from '@ant-design/icons';
import Logo from '../../../assets/logo-small.svg';

import styles from './footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <Row gutter={[24, 24]}>
        <Col span={4} offset={4}>
          <img src={Logo} height={60} width={150} className={styles.logo} />
          <p>
            Medical devices and hospital stock managment system in the form of a
            convenient application which will allow you to save your time.
          </p>
        </Col>
        <Col span={4} offset={1}>
          <div className={styles.infoContainer}>
            <h3>Documents</h3>
            <div>
              <Button type='link'>Regulations of user</Button>
            </div>
            <div>
              <Button type='link'>Privacy policy</Button>
            </div>
          </div>
        </Col>
        <Col span={4} offset={1}>
          <div className={styles.infoContainer}>
            <h3>Contact us</h3>
            <div className={styles.icon}>
              <MailOutlined />
              <p className={styles.infoParagraph}>hsys@gmail.com</p>
            </div>
            <div className={styles.icon}>
              <PhoneOutlined />
              <p className={styles.infoParagraph}>+48 444 555 666</p>
            </div>
            <div className={styles.icon}>
              <AimOutlined />
              <p className={styles.infoParagraph}>Cracow, Poland</p>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.infoContainer}>
            <FacebookFilled
              className={styles.facebook}
              onClick={() => console.log('Halo')}
            />
            <InstagramFilled className={styles.instagram} />
            <YoutubeFilled className={styles.youtube} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className={styles.copyright} span={24}>
          Copyright 2020 ©Hsys. All rights reserved
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
