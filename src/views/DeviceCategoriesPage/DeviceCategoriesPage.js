import React, { useState } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/react-hooks';
import { Button, Table, Typography, Menu, Dropdown } from 'antd';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { GET_CATEGORIES } from './categoriesSchemas';
import { columns, messages } from './categoriesData';
import AddDeviceCategory from '../DevicesPage/addDeviceCategory/AddDeviceCategory';
// import './devicesPage.scss';

const DeviceCategoriesPage = () => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [visible, setVisible] = useState(false);

  const { Title } = Typography;
  const columnData =
    data &&
    data.allDeviceCategories &&
    data.allDeviceCategories.allElements &&
    data.allDeviceCategories.allElements.map((el) => ({
      key: el.id,
      ...el,
    }));
  const count =
    data && data.allDeviceCategories && data.allDeviceCategories.count;

  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <Button
          type='link'
          ghost
          className='menuItem'
          onClick={() => history.push('/addDevice')}>
          {formatMessage(messages.category)}
        </Button>
      </Menu.Item>
      <Menu.Item key='1'>
        <Button
          type='link'
          ghost
          className='menuItem'
          onClick={() => setVisible(true)}>
          {formatMessage(messages.device)}
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='container'>
      <div className='headerContainer'>
        <div>
          <Title className='headerTitle'>{formatMessage(messages.title)}</Title>
          <Title className='headerSubtitle'>
            {formatMessage(messages.count, { count })}
          </Title>
        </div>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button
            type='primary'
            size='large'
            icon={<PlusOutlined />}
            className='addButton'>
            {formatMessage(messages.create)} <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <Table
        columns={columns(history)}
        dataSource={columnData}
        loading={loading}
        className='tableContainer'
      />
      <AddDeviceCategory
        visible={visible}
        setVisible={setVisible}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default DeviceCategoriesPage;
