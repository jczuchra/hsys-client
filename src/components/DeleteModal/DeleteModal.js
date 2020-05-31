import React from 'react';
import { Button, Modal } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { useIntl, defineMessages } from 'react-intl';
import styles from './deleteModal.module.scss';

const DeleteModal = (props) => {
  const {
    isModalOpen,
    loading,
    handleOk,
    handleCancel,
    title,
    message,
  } = props;
  const { formatMessage } = useIntl();
  return (
    <Modal
      visible={isModalOpen || loading}
      title={
        <div>
          <WarningOutlined className={styles.modalIcon} />
          {title}
        </div>
      }
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key='back'
          onClick={handleCancel}
          className={styles.modalCancel}>
          {formatMessage(messages.cancel)}
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={loading}
          onClick={handleOk}
          className={styles.deleteModalButton}>
          {formatMessage(messages.delete)}
        </Button>,
      ]}>
      <p>{message}</p>
    </Modal>
  );
};

export default DeleteModal;

const messages = defineMessages({
  delete: {
    id: 'client.src.views.components.DeleteModal.delete',
    defaultMessage: 'Delete',
  },
  cancel: {
    id: 'client.src.views.components.DeleteModalcancel',
    defaultMessage: 'Cancel',
  },
});
