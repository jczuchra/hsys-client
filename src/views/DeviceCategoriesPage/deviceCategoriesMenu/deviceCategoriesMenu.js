import React, { useState } from 'react';
import { Button } from 'antd';
import { useIntl, defineMessages } from 'react-intl';
import { useHistory } from 'react-router-dom';
import ActionMenu from '../../../components/ActionMenu/ActionMenu';
import { useMutation } from '@apollo/react-hooks';
import { GET_CATEGORIES, DELETE_DEVICE_CATEGORY } from '../categoriesSchemas';
import { openNotification } from '../../../common/functions/openNotification';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import styles from './deviceCategoriesMenu.module.scss';

const DeviceCategoriesMenu = ({ record }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    deleteDeviceCategory({ variables: { id: record.id } });
    setIsModalOpen(false);
  };
  const handleCancel = () => setIsModalOpen(false);

  const [deleteDeviceCategory, { deleteData, deleteLoading }] = useMutation(
    DELETE_DEVICE_CATEGORY,
    {
      onCompleted: (data) => {
        openNotification(
          formatMessage(messages.title),
          data.deleteDeviceCategory.message,
          'success'
        );
      },
      update: (cache) => {
        const { allDeviceCategories } = cache.readQuery({
          query: GET_CATEGORIES,
        });
        cache.writeQuery({
          query: GET_CATEGORIES,
          data: {
            allDeviceCategories: {
              allElements: allDeviceCategories.allElements.filter(
                (el) => el.id !== record.id
              ),
              count: allDeviceCategories.count - 1,
            },
          },
        });
      },
    }
  );

  const content = (
    <div className={styles.buttonsContainer}>
      {/* <Button
        className={styles.button}
        onClick={() => {
          history.push(`/editDevice?id=${record.id}`);
        }}>
        {formatMessage(messages.edit)}
      </Button> */}
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

export default DeviceCategoriesMenu;

const messages = defineMessages({
  title: {
    id: 'client.src.views.devicesPage.assetsMenu.title',
    defaultMessage: 'Delete',
  },
  deleteMessage: {
    id: 'client.src.views.devicesPage.assetsMenu.deleteMessage',
    defaultMessage:
      "Do you really want to delete category ''{asset}''? It will also delete all devices that belongs to this category.",
  },
  edit: {
    id: 'client.src.views.devicesPage.assetsMenu.title',
    defaultMessage: 'Edit',
  },
});
