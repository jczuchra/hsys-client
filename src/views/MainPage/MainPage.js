import React from 'react';
import { Button, Typography } from 'antd';
import EmailForm from './emailForm/EmailForm';
import Footer from './footer/Footer';
import AboutUs from './aboutUs/AboutUs';
import Functions from './functions/Functions';

import './mainPage.scss';

const MainPage = () => {
  const { Title } = Typography;
  return (
    <div>
      <div className='heroImage'>
        <Title className='heroTitle'>
          Innovative system for hospitals and medical facilities
        </Title>
        <Button className='heroButton' size='large'>
          Check out details
        </Button>
      </div>
      <div name='functions'>
        <Functions />
      </div>
      <div name='aboutUs'>
        <AboutUs />
      </div>
      <div name='contact'>
        <EmailForm name='contact' />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
