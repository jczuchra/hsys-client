import React, { useEffect, useState } from 'react';
import { Table, Button, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { PlusOutlined } from '@ant-design/icons';
import { openNotification } from '../../common/functions/openNotification/openNotification';
import { messages, columns, dataSource } from './assetsData';
import { GET_ASSETS } from './assetSchemas';
import './assetsPage.scss';

const AssetsPage = () => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const { loading, error, data } = useQuery(GET_ASSETS);

  const { Title } = Typography;
  const columnData =
    data &&
    data.allAssets &&
    data.allAssets.allElements &&
    data.allAssets.allElements.map((el) => ({
      key: el.id,
      ...el,
    }));
  const count = data && data.allAssets && data.allAssets.count;

  return (
    <div className='container'>
      <div className='headerContainer'>
        <div>
          <Title className='headerTitle'>{formatMessage(messages.title)}</Title>
          <Title className='headerSubtitle'>
            {formatMessage(messages.count, { count })}
          </Title>
        </div>
        <Button
          type='primary'
          size='large'
          icon={<PlusOutlined />}
          className='addButton'
          onClick={() => history.push('/createAsset')}>
          {formatMessage(messages.create)}
        </Button>
      </div>
      {console.log('Data', columnData)}
      <Table
        columns={columns}
        dataSource={columnData}
        loading={loading}
        className='tableContainer'
      />
    </div>
  );
};

export default AssetsPage;