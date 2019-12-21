const axios = require("axios");
const rawData = {
  username: "abcdefg",
  password1: "abcdef",
  password2: "abcdef",
  email: "abcdefgh@gmail.com"
};

const data = JSON.stringify(rawData);
const type = "application/json";
const headers = { "Content-Type": type };

axios({
  method: "POST",
  url: "http://192.168.43.46:8000/auth/registration/",
  data: data,
  headers: headers
})
  .then(res => console.log(res))
  .catch(err => console.err(err));
