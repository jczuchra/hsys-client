import React from 'react';
import { Button, Typography, Breadcrumb, Form } from 'antd';
import { useIntl, defineMessages } from 'react-intl';
import { useHistory } from 'react-router-dom';
import './createContainer.scss';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const CreateContainer = (props) => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const { formItems, backTo, currentPage, title, onSubmit, id } = props;

  const { Title } = Typography;

  const onFinish = (values) => {
    const variables = id ? { ...values, id } : { ...values };
    onSubmit({ variables });
  };
  return (
    <div className='createContainer'>
      <Breadcrumb className='breadcrumb'>
        <Breadcrumb.Item>
          <Button type='link' size='small' onClick={() => history.goBack()}>
            {backTo}
          </Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{currentPage}</Breadcrumb.Item>
      </Breadcrumb>
      <div className='createHeaderContainer'>
        <Title className='headerTitle'>{title}</Title>
      </div>
      <div className='createFormContainer'>
        <Form
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}>
          {formItems}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <div className='buttonsContainer'>
              <Button
                type='primary'
                size='large'
                className='createButton cancelButton'
                onClick={() => history.goBack()}>
                {formatMessage(messages.cancel)}
              </Button>
              <Button
                type='primary'
                size='large'
                className='createButton'
                htmlType='submit'>
                {formatMessage(messages.save)}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateContainer;

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const messages = defineMessages({
  cancel: {
    id: 'client.src.components.createContainer.cancel',
    defaultMessage: 'Cancel',
  },
  save: {
    id: 'client.src.components.createContainer.create',
    defaultMessage: 'Save',
  },
});
