import axios from "axios";

const URI = "http://localhost:8000/api";

const RegisterHandeler = async (body) => {
  const headers = {
    "Content-type": "multipart/form-data",
  };

  const response = await axios.post(URI + "/user/register", body, {headers});
  return response.data;
};



const LoginHandeler = async (body) => {
  const headers = {
    "Content-type": "application/json",
  };

  const response = await axios.post(URI + "/user/login", body, {headers});
  return response.data;
};

export { RegisterHandeler, LoginHandeler };
