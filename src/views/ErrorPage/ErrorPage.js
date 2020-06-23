import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';

const ErrorPage = () => {
  const history = useHistory();
  const { location } = history;
  const params = new URLSearchParams(location.search);
  const errorNumber = params.get('error');
  return (
    <Result
      status={errorNumber}
      title={errorNumber}
      subTitle='Sorry, something went wrong.'
      extra={
        <Button type='primary' onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default ErrorPage;
