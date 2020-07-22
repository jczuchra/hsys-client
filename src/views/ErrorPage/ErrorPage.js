import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';

const ErrorPage = () => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const { location } = history;
  const params = new URLSearchParams(location.search);
  const errorNumber = params.get('error');
  const message = params.get('message');
  return (
    <Result
      status={errorNumber}
      title={errorNumber}
      subTitle={formatMessage(messages.errorMessage, { error: message })}
      extra={
        <Button type='primary' onClick={() => history.push('/')}>
          {formatMessage(messages.backHome)}
        </Button>
      }
    />
  );
};

export default ErrorPage;

const messages = defineMessages({
  backHome: {
    id: 'client.src.views.errorPage.backHome',
    defaultMessage: 'Back home',
  },
  errorMessage: {
    id: 'client.src.views.errorPage.errorMessage',
    defaultMessage: 'Sorry, something went wrong. Error: {error}',
  },
});
