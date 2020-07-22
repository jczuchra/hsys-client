import React, { useState } from 'react';
import { Button } from 'antd';
import { useIntl, defineMessages } from 'react-intl';
import { useHistory } from 'react-router-dom';
import ActionMenu from '../../../components/ActionMenu/ActionMenu';
import { useMutation } from '@apollo/react-hooks';
import { GET_ALL_DEVICES, DELETE_DEVICE } from '../devicesSchemas';
import { openNotification } from '../../../common/functions/openNotification';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import styles from './deviceMenu.module.scss';

const DeviceMenu = ({ record }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    deleteDevice({ variables: { id: record.id } });
    setIsModalOpen(false);
  };
  const handleCancel = () => setIsModalOpen(false);

  const [deleteDevice, { deleteData, deleteLoading }] = useMutation(
    DELETE_DEVICE,
    {
      onCompleted: (data) => {
        openNotification(
          formatMessage(messages.title),
          data.deleteDevice.message,
          'success'
        );
      },
      update: (cache, { data: { addDevice } }) => {
        const { allDevices } = cache.readQuery({ query: GET_ALL_DEVICES });
        cache.writeQuery({
          query: GET_ALL_DEVICES,
          data: {
            allDevices: {
              allElements: allDevices.allElements.filter(
                (el) => el.id !== record.id
              ),
              count: allDevices.count - 1,
            },
          },
        });
      },
    }
  );

  const content = (
    <div className={styles.buttonsContainer}>
      <Button
        className={styles.button}
        onClick={() => {
          history.push(`/editDevice?id=${record.id}`);
        }}>
        {formatMessage(messages.edit)}
      </Button>
      <Button
        className={styles.deleteButton}
        onClick={() => {
          setIsModalOpen(true);
        }}>
        {formatMessage(messages.title)}
      </Button>
      <DeleteModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        loading={deleteLoading}
        isModalOpen={isModalOpen}
        title={formatMessage(messages.title)}
        message={formatMessage(messages.deleteMessage, { asset: record.name })}
      />
    </div>
  );
  return <ActionMenu content={content} />;
};

export default DeviceMenu;

const messages = defineMessages({
  title: {
    id: 'client.src.views.devicesPage.deviceMenu.title',
    defaultMessage: 'Delete',
  },
  deleteMessage: {
    id: 'client.src.views.devicesPage.deviceMenu.deleteMessage',
    defaultMessage: "Do you really want to delete ''{asset}''?",
  },
  edit: {
    id: 'client.src.views.devicesPage.edit',
    defaultMessage: 'Edit',
  },
});
