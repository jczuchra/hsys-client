import React, { useState } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/react-hooks';
import { Button, Table, Typography, Menu, Dropdown } from 'antd';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { GET_ALL_DEVICES } from './devicesSchemas';
import { columns, messages } from './devicesData';
import AddDeviceCategory from './addDeviceCategory/AddDeviceCategory';
import './devicesPage.scss';

const DevicesPage = () => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const { loading, error, data } = useQuery(GET_ALL_DEVICES);
  const [visible, setVisible] = useState(false);

  const { Title } = Typography;
  const columnData =
    data &&
    data.allDevices &&
    data.allDevices.allElements &&
    data.allDevices.allElements.map((el) => ({
      key: el.id,
      ...el,
    }));
  const count = data && data.allDevices && data.allDevices.count;

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
        columns={columns(formatMessage)}
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

export default DevicesPage;
