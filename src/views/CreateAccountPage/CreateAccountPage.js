import React from 'react';
import { Input, Typography, Form, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';
import { useIntl, defineMessages } from 'react-intl';
import { openNotification } from '../../common/functions/openNotification/openNotification';
import Hands from '../../assets/hands2.jpg';
import { CREATE_USER } from './createAccountPageSchema';

import styles from './createAccountPage.module.scss';
import './createAccountPage.scss';

const CreateAccountPage = () => {
  const history = useHistory();
  const { formatMessages } = useIntl();
  const [
    registerUser,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      openNotification('Register', data.register.message);
      window.location = '/';
    },
  });

  const { Title } = Typography;

  const onFinish = ({ email, password }) => {
    registerUser({
      variables: { password, email },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.createContainer}>
      <img src={Hands} height='100%' width='50%' />
      <div className={styles.formContainer}>
        <Title className={styles.title}>
          {formatMessages(messages.createAccount)}
        </Title>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name='email'
            wrapperCol={{ span: 12, offset: 6 }}
            rules={[
              {
                required: true,
                message: formatMessages(messages.emailWarning),
              },
            ]}>
            <Input placeholder={formatMessages(messages.email)} />
          </Form.Item>

          <Form.Item
            name='password'
            wrapperCol={{ span: 12, offset: 6 }}
            rules={[
              {
                required: true,
                message: formatMessages(messages.passwordWarning),
              },
            ]}>
            <Input.Password placeholder={formatMessages(messages.password)} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button
              type='primary'
              htmlType='submit'
              className={styles.loginButton}>
              {formatMessages(messages.createAccount)}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateAccountPage;

const messages = defineMessages({
  createAccount: {
    id: 'client.src.views.createAccountPage.createAccountPage.createAccount',
    defaultMessage: 'Create account',
  },
  password: {
    id: 'client.src.views.createAccountPage.createAccountPage.password',
    defaultMessage: 'Password',
  },
  passwordWarning: {
    id: 'client.src.views.createAccountPage.createAccountPage.passwordWarning',
    defaultMessage: 'Please input your password!',
  },
  email: {
    id: 'client.src.views.createAccountPage.createAccountPage.email',
    defaultMessage: 'Email',
  },
  emailWarning: {
    id: 'client.src.views.createAccountPage.createAccountPage.emailWarning',
    defaultMessage: 'Please input your email!',
  },
});
