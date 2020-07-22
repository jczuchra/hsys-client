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
import { useIntl, defineMessages } from 'react-intl';
import Logo from '../../../assets/logo-small.svg';

import styles from './footer.module.scss';

const Footer = () => {
  const { formatMessage } = useIntl();
  return (
    <div className={styles.footerContainer}>
      <Row gutter={[24, 24]}>
        <Col span={4} offset={4}>
          <img src={Logo} height={60} width={150} className={styles.logo} />
          <p>{formatMessage(messages.heroDescription)}</p>
        </Col>
        <Col span={4} offset={1}>
          <div className={styles.infoContainer}>
            <h3>{formatMessage(messages.documents)}</h3>
            <div>
              <a href='./docs/terms.pdf' download>
                {formatMessage(messages.regulations)}
              </a>
            </div>
            <div>
              <a href='./docs/privacy.pdf' download>
                {formatMessage(messages.privacy)}
              </a>
            </div>
          </div>
        </Col>
        <Col span={4} offset={1}>
          <div className={styles.infoContainer}>
            <h3>{formatMessage(messages.contactUs)}</h3>
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
              <p className={styles.infoParagraph}>
                {formatMessage(messages.address)}
              </p>
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
          {formatMessage(messages.copyright)}
        </Col>
      </Row>
    </div>
  );
};

const messages = defineMessages({
  copyright: {
    id: 'client.src.views.mainPage.footer.copyright',
    defaultMessage: 'Copyright 2020 ©Hsys. All rights reserved',
  },
  address: {
    id: 'client.src.views.mainPage.footer.address',
    defaultMessage: 'Cracow, Poland',
  },
  contactUs: {
    id: 'client.src.views.mainPage.footer.contactUs',
    defaultMessage: 'Contact us',
  },
  privacy: {
    id: 'client.src.views.mainPage.footer.privacy',
    defaultMessage: 'Privacy policy',
  },
  regulations: {
    id: 'client.src.views.mainPage.footer.regulations',
    defaultMessage: 'Regulations of user',
  },
  documents: {
    id: 'client.src.views.mainPage.footer.documents',
    defaultMessage: 'Documents',
  },
  heroDescription: {
    id: 'client.src.views.mainPage.footer.heroDescription',
    defaultMessage:
      'Medical devices and hospital stock managment system in the form of a convenient application which will allow you to save your time.',
  },
});

export default Footer;
