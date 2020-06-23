import React from 'react';
import { notification } from 'antd';
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import './notification.scss';

export const openNotification = (title, message, type) => {
  notification.open({
    message: title,
    description: message,
    icon: icons[type],
  });
};

const icons = {
  error: <FrownOutlined style={{ color: '#be0a0aa6' }} />,
  success: <SmileOutlined style={{ color: '#37a01ca9' }} />,
};
