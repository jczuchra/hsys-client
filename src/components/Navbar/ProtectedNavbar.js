import React, { useState } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { Menu, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Logo from '../../assets/logo-small.svg';
import { openNotification } from '../../common/functions/openNotification/openNotification';

import './navbar.scss';

const ProtectedNavbar = () => {
  const { formatMessage } = useIntl();
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
        <img
          src={Logo}
          width={100}
          height={40}
          alt='logo'
          onClick={() => history.push('/')}
        />
      </Item>
      <Item className='menuButton' key='devices'>
        <Button
          size='small'
          type='link'
          onClick={() => history.push('/devices')}>
          {formatMessage(messages.devices)}
        </Button>
      </Item>
      <Item key='categories'>
        <Button
          size='small'
          type='link'
          onClick={() => history.push('/deviceCategories')}>
          {formatMessage(messages.categories)}
        </Button>
      </Item>
      <Item key='assets'>
        <Button
          size='small'
          type='link'
          onClick={() => history.push('/assets')}>
          {formatMessage(messages.assets)}
        </Button>
      </Item>

      <Item key='logout'>
        <Button
          type='primary'
          size='large'
          onClick={() => {
            removeCookie('loggedIn');
            openNotification('Logout', "You've been logged out succesfully!");
            history.push('/');
          }}>
          {formatMessage(messages.logout)}
        </Button>
      </Item>
    </Menu>
  );
};

export default ProtectedNavbar;

const messages = defineMessages({
  logout: {
    id: 'client.src.components.navbar.protectedNavbar.logout',
    defaultMessage: 'Log out',
  },
  assets: {
    id: 'client.src.components.navbar.protectedNavbar.assets',
    defaultMessage: 'Assets',
  },
  categories: {
    id: 'client.src.components.navbar.protectedNavbar.categories',
    defaultMessage: 'Device categories',
  },
  devices: {
    id: 'client.src.components.navbar.protectedNavbar.devices',
    defaultMessage: 'Devices',
  },
});
