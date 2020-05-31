import React from 'react';
import { Space, Popover, Button } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import styles from './actionMenu.module.scss';

const text = <span>Actions</span>;

const ActionMenu = ({ content }) => {
  return (
    <div className={styles.popoverContainer}>
      <Popover
        placement='bottom'
        title={text}
        content={content}
        trigger='click'>
        <Button className={styles.button}>
          <EllipsisOutlined className={styles.popoverIcon} />
        </Button>
      </Popover>
    </div>
  );
};

export default ActionMenu;
