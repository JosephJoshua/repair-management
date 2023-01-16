type AddUserRequest = {
  body: {
    username: string;
    password: string;
    store_id: string;
    profile_url?: string;
  };
};

export default AddUserRequest;
