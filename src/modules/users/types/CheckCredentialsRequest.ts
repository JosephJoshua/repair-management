type CheckCredentialsRequest = {
  body: {
    username: string;
    password: string;
    store_slug: string;
  };
};

export default CheckCredentialsRequest;
