import Axios from 'axios';
import {BASE_URL_APP} from '../Utils/Contstant';

const qs = require('qs');
const UserApi = Axios.create({
  baseURL: BASE_URL_APP,
  timeout: 80000,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default UserApi;
