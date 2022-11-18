import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ExternalApi = () => {
  const [message, setMessage] = useState('');
  const serverUrl = 'https://test.caseos.de/api/caseos/defaults';

  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const response = await fetch(`${serverUrl}`);

      const responseData = await response.json();
      console.log(responseData)
      setMessage(responseData.inner.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `${serverUrl}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const responseData = await response.json();
      console.log(responseData)
      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };
  const serverUrl2 = 'https://wp.artelocal.eu/api/menu/items';
  const callSecureApi2 = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `${serverUrl2}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const responseData = await response.json();
      console.log(responseData)
      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h1>External API</h1>
      <p>
        Use these buttons to call an external API. The protected API call has an
        access token in its authorization header. The API server will validate
        the access token using the Auth0 Audience value.
      </p>
      <div
        className="btn-group mt-5"
        role="group"
        aria-label="External API Requests Examples"
      >
        <button type="button" className="btn btn-primary" onClick={callApi}>
          Get Public Message
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={callSecureApi}
        >
          Get Protected Message
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={callSecureApi2}
        >
          Get Protected Message 2
        </button>
      </div>
      {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <div className="container-fluid">
            <div className="row">
              <code className="col-12 text-light bg-dark p-4">{JSON.stringify(message)}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExternalApi;