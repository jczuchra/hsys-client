import React from 'react';
import { Button, Typography } from 'antd';
import { useIntl, defineMessages } from 'react-intl';
import EmailForm from './emailForm/EmailForm';
import Footer from './footer/Footer';
import AboutUs from './aboutUs/AboutUs';
import Functions from './functions/Functions';

import './mainPage.scss';

const MainPage = () => {
  const { Title } = Typography;
  const { formatMessage } = useIntl();
  return (
    <div>
      <div className='heroImage'>
        <Title className='heroTitle'>{formatMessage(messages.title)}</Title>
        <Button className='heroButton' size='large'>
          {formatMessage(messages.details)}
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

const messages = defineMessages({
  details: {
    id: 'client.src.views.mainPage.footer.details',
    defaultMessage: 'Check out details',
  },
  title: {
    id: 'client.src.views.mainPage.footer.title',
    defaultMessage: 'Innovative system for hospitals and medical facilities',
  },
});
