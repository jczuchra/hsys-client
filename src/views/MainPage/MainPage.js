import React from 'react';
import { Button, Typography } from 'antd';

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
    </div>
  );
};

export default MainPage;
