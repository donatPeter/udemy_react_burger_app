import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://udemy-react-burger-builder.firebaseio.com/'
});

export default instance;
