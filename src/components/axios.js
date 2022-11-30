import axios from 'axios';

const axiosRequest = async (url, token) => {
  let result = [];
  console.log(url);
  console.log(token);
  try {
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        result = res.data;
      })
      .catch(error => {
        console.log(`axiosRequest fail: ${error}`);
      });
  } catch (error) {
    console.log('axiosRequest error: ', error);
  }

  return result;
};

export default axiosRequest;
