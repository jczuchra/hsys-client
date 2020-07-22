import React from 'react';
import { Input, Typography, Form, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { useCookies } from 'react-cookie';
import { defineMessages, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Hands from '../../assets/hands.jpg';
import { openNotification } from '../../common/functions/openNotification/openNotification';
import { LOGIN_USER } from './loginSchemas';

import styles from './loginPage.module.scss';

const CreateAccountPage = () => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [cookies, setCookie] = useCookies();
  const [
    loginUser,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      if (data.login.status) {
        openNotification(
          formatMessage(messages.login),
          data.login.message,
          'success'
        );
        setCookie('loggedIn', true, {
          maxAge: 60 * 60 * 60 * 12,
        });
        return history.push('/');
      }
      openNotification(
        formatMessage(messages.login),
        data.login.message,
        'error'
      );
    },
  });

  const { Title } = Typography;

  const onFinish = ({ email, password }) => {
    loginUser({
      variables: { password, email },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.loginContainer}>
      <img src={Hands} height='100%' width='50%' />
      <div className={styles.formContainer}>
        <Title className={styles.title}>
          {formatMessage(messages.accountLogin)}
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
                message: formatMessage(messages.inputWarning, {
                  element: 'email',
                }),
              },
            ]}>
            <Input placeholder={formatMessage(messages.email)} />
          </Form.Item>

          <Form.Item
            name='password'
            wrapperCol={{ span: 12, offset: 6 }}
            rules={[
              {
                required: true,
                message: formatMessage(messages.inputWarning, {
                  element: 'password',
                }),
              },
            ]}>
            <Input.Password placeholder={formatMessage(messages.password)} />
          </Form.Item>

          {/* <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button
              type='primary'
              htmlType='submit'
              className={styles.loginButton}>
              {formatMessage(messages.login)}
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
            className={styles.infoText}>
            <h3>
              {formatMessage(messages.forgot)}{' '}
              {<Link to='/'>{formatMessage(messages.username)}</Link>}/
              {<Link to='/'>{formatMessage(messages.password)}</Link>}?
            </h3>
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
            className={styles.infoText}>
            <h3>{formatMessage(messages.or)}</h3>
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
            className={styles.infoText}>
            <h3>
              {formatMessage(messages.createNewAccount)}{' '}
              {<Link to='/createAccount'>{formatMessage(messages.here)}</Link>}.
            </h3>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateAccountPage;

const messages = defineMessages({
  createNewAccount: {
    id: 'client.src.views.loginPage.createNewAccount',
    defaultMessage: 'Create new account',
  },
  here: {
    id: 'client.src.views.loginPage.here',
    defaultMessage: 'here',
  },
  or: {
    id: 'client.src.views.loginPage.or',
    defaultMessage: 'or',
  },
  forgot: {
    id: 'client.src.views.loginPage.forgot',
    defaultMessage: 'Forgot',
  },
  username: {
    id: 'client.src.views.loginPage.username',
    defaultMessage: 'Username',
  },
  password: {
    id: 'client.src.views.loginPage.password',
    defaultMessage: 'Password',
  },
  login: {
    id: 'client.src.views.loginPage.login',
    defaultMessage: 'Login',
  },
  email: {
    id: 'client.src.views.loginPage.email',
    defaultMessage: 'Email',
  },
  inputWarning: {
    id: 'client.src.views.loginPage.inputWarning',
    defaultMessage: 'Please input your {element}!',
  },
  accountLogin: {
    id: 'client.src.views.loginPage.accountLogin',
    defaultMessage: 'Account login',
  },
});
