import React, { useState } from 'react';

import { Menu, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Logo from '../../assets/logo-small.svg';
import { openNotification } from '../../common/functions/openNotification/openNotification';

import './navbar.scss';

const ProtectedNavbar = () => {
  const [current, setCurrent] = useState(0);
  const history = useHistory();
  const [_, __, removeCookie] = useCookies();
  const { Item } = Menu;
  return (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
      mode='horizontal'
      className='menuContainer'>
      <Item key='logo'>
        <img src={Logo} width={100} height={40} alt='logo' />
      </Item>
      <Item className='menuButton' key='devices'>
        <Button
          size='small'
          type='link'
          onClick={() => history.push('/devices')}>
          Devices
        </Button>
      </Item>
      <Item key='categories'>
        <Button
          size='small'
          type='link'
          onClick={() => history.push('/deviceCategories')}>
          Device categories
        </Button>
      </Item>
      <Item key='assets'>
        <Button
          size='small'
          type='link'
          onClick={() => history.push('/assets')}>
          Assets
        </Button>
      </Item>

      <Item key='create'>
        <Button
          type='primary'
          size='large'
          onClick={() => {
            removeCookie('refresh-token');
            openNotification('Logout', "You've been logged out succesfully!");
            history.push('/');
          }}>
          Log out
        </Button>
      </Item>
    </Menu>
  );
};

export default ProtectedNavbar;
