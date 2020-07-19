import React, { useState } from 'react';

import { Menu, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from 'react-scroll';
import Logo from '../../assets/logo-small.svg';

import './navbar.scss';

const PublicNavbar = () => {
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
          Functions
        </a>
      </Item>
      <Item key='aboutus'>
        <a
          onClick={() => {
            history.push('/');
            scrollTo('aboutUs');
            // window.onload = () => scrollTo('aboutUs');
          }}>
          About us
        </a>
      </Item>
      <Item key='contact'>
        <a
          onClick={() => {
            history.push('/');
            scrollTo('contact');
          }}>
          Contact
        </a>
      </Item>
      <Item key='login'>
        <Button size='large' onClick={() => history.push('/login')}>
          Login
        </Button>
      </Item>
      <Item key='create'>
        <Button
          type='primary'
          size='large'
          onClick={() => history.push('/createAccount')}>
          Create account
        </Button>
      </Item>
    </Menu>
  );
};

export default PublicNavbar;
