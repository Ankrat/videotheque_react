import axios from 'axios';

const AuthStr = sessionStorage.getItem('Authorization');
const userId = sessionStorage.getItem('userId');
const burl = 'http://localhost:8085/api/';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': AuthStr,
};


export default {

  updateState: () => {
    return axios.put(`${burl}watchlist-mv/`);
  },

};
