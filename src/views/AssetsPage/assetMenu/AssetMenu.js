import React, { useState } from 'react';
import { Button } from 'antd';
import { useIntl, defineMessages } from 'react-intl';
import { useHistory } from 'react-router-dom';
import ActionMenu from '../../../components/ActionMenu/ActionMenu';
import { useMutation } from '@apollo/react-hooks';
import { GET_ASSETS, DELETE_ASSET } from '../assetSchemas';
import { openNotification } from '../../../common/functions/openNotification';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import styles from './assetMenu.module.scss';

const AssetMenu = ({ record }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    deleteAsset({ variables: { id: record.id } });
    setIsModalOpen(false);
  };
  const handleCancel = () => setIsModalOpen(false);

  const [deleteAsset, { deleteData, deleteLoading }] = useMutation(
    DELETE_ASSET,
    {
      onCompleted: (data) => {
        openNotification(
          formatMessage(messages.title),
          data.deleteAsset.message,
          'success'
        );
      },
      update: (cache, { data: { addAsset } }) => {
        const { allAssets } = cache.readQuery({ query: GET_ASSETS });
        cache.writeQuery({
          query: GET_ASSETS,
          data: {
            allAssets: {
              allElements: allAssets.allElements.filter(
                (el) => el.id !== record.id
              ),
              count: allAssets.count - 1,
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
          history.push(`/editAsset?id=${record.id}`);
        }}>
        Edit
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

export default AssetMenu;

const messages = defineMessages({
  title: {
    id: 'client.src.views.assetsPage.assetsMenu.title',
    defaultMessage: 'Delete',
  },
  deleteMessage: {
    id: 'client.src.views.assetsPage.assetsMenu.deleteMessage',
    defaultMessage: "Do you really want to delete ''{asset}''?",
  },
});
