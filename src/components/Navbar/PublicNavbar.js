import React, { useState } from 'react';

import { Menu, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/logo-small.svg';

import './navbar.scss';

const PublicNavbar = () => {
  const [current, setCurrent] = useState(0);
  const history = useHistory();
  const { Item } = Menu;
  return (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
      mode='horizontal'
      className='menuContainer'>
      <Item key='logo'>
        <img src={Logo} width={100} height={40} />
      </Item>
      <Item className='menuButton' key='mail'>
        Functions
      </Item>
      <Item key='aboutus'>About us</Item>
      <Item key='contact'>Contact</Item>
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
