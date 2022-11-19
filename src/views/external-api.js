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
  const callApi2 = async () => {
    try {
      const response = await fetch(`${serverUrl2}`);

      const responseData = await response.json();
      console.log(responseData)
      setMessage(responseData.inner.message);
    } catch (error) {
      setMessage(error.message);
    }
  };
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

  const serverUrl3 = 'http://104.248.36.102:3001/ingredients';
  const callApi3 = async () => {
    try {
      const response = await fetch(`${serverUrl3}`);

      const responseData = await response.json();
      console.log(responseData)
      setMessage(responseData.inner.message);
    } catch (error) {
      setMessage(error.message);
    }
  };
  const callSecureApi3 = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `${serverUrl3}`,
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
        style={{ display: "block" }}
        role="group"
        aria-label="External API Requests Examples"
      >
        <div style={{ display: "flex" }}>
          <button type="button" className="btn btn-primary" style={{ margin: "5px", flex: "1 0 50%" }} onClick={callApi}>
            Get Public https://test.caseos.de/api/caseos/defaults
          </button>
          <button
            type="button"
            style={{ margin: "5px", flex: "1 0 50%" }}
            className="btn btn-primary"
            onClick={callSecureApi}
          >
            Get Protected https://test.caseos.de/api/caseos/defaults
          </button>
        </div>
        <div style={{ display: "flex" }}>
          <button type="button" className="btn btn-primary" style={{ margin: "5px", flex: "1 0 50%", 'background-color': "rgb(110 110 110)" }} onClick={callApi2}>
            Get Public https://wp.artelocal.eu/api/menu/items
          </button>
          <button
            type="button"
            style={{ margin: "5px", flex: "1 0 50%", 'background-color': "rgb(110 110 110)" }}
            className="btn btn-primary"
            onClick={callSecureApi2}
          >
            Get Protected https://wp.artelocal.eu/api/menu/items
          </button>
        </div>
        <div style={{ display: "flex" }}>
          <button type="button" className="btn btn-primary" style={{ margin: "5px", flex: "1 0 50%", 'background-color': "rgb(110 110 110)" }} onClick={callApi3}>
            Get Public http://104.248.36.102:3001/ingredients
          </button>
          <button
            type="button"
            style={{ margin: "5px", flex: "1 0 50%", 'background-color': "rgb(110 110 110)" }}
            className="btn btn-primary"
            onClick={callSecureApi3}
          >
            Get Protected http://104.248.36.102:3001/ingredients
          </button>
        </div>
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