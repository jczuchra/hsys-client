import React, { useState } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { Menu, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { scroller } from 'react-scroll';
import Logo from '../../assets/logo-small.svg';

import './navbar.scss';

const PublicNavbar = () => {
  const { formatMessage } = useIntl();
  const [current, setCurrent] = useState(0);
  const history = useHistory();
  const { Item } = Menu;

  const scrollTo = (name) => {
    scroller.scrollTo(name, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
      mode='horizontal'
      className='menuContainer'>
      <Item key='logo'>
        <img
          src={Logo}
          width={100}
          height={40}
          onClick={() => history.push('/')}
        />
      </Item>
      <Item className='menuButton' key='mail'>
        <a
          onClick={() => {
            history.push('/');
            scrollTo('functions');
          }}>
          {formatMessage(messages.functions)}
        </a>
      </Item>
      <Item key='aboutus'>
        <a
          onClick={() => {
            history.push('/');
            scrollTo('aboutUs');
            // window.onload = () => scrollTo('aboutUs');
          }}>
          {formatMessage(messages.aboutUs)}
        </a>
      </Item>
      <Item key='contact'>
        <a
          onClick={() => {
            history.push('/');
            scrollTo('contact');
          }}>
          {formatMessage(messages.contact)}
        </a>
      </Item>
      <Item key='login'>
        <Button size='large' onClick={() => history.push('/login')}>
          {formatMessage(messages.login)}
        </Button>
      </Item>
      <Item key='create'>
        <Button
          type='primary'
          size='large'
          onClick={() => history.push('/createAccount')}>
          {formatMessage(messages.createAccount)}
        </Button>
      </Item>
    </Menu>
  );
};

export default PublicNavbar;

const messages = defineMessages({
  createAccount: {
    id: 'client.src.components.navbar.publicNavbar.createAccount',
    defaultMessage: 'Create account',
  },
  login: {
    id: 'client.src.components.navbar.publicNavbar.login',
    defaultMessage: 'Login',
  },
  contact: {
    id: 'client.src.components.navbar.publicNavbar.contact',
    defaultMessage: 'Contact',
  },
  aboutUs: {
    id: 'client.src.components.navbar.publicNavbar.aboutUs',
    defaultMessage: 'About us',
  },
  functions: {
    id: 'client.src.components.navbar.publicNavbar.functions',
    defaultMessage: 'Functions',
  },
});
