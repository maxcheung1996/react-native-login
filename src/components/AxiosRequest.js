import axios from 'axios';

const AxiosRequest = async (url, token) => {
  let result = [];
  console.log(`AxiosRequest ~ ${url}`);
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
        console.log(`AxiosRequest fail: ${error}`);
      });
  } catch (error) {
    console.log('AxiosRequest error: ', error);
  }

  return result;
};

export default AxiosRequest;
