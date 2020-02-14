import { url, AuthStr } from './content';

import axios from 'axios';
const burl = 'http://localhost:8085/api/';



const headers = {
  'Content-Type': 'application/json',
  'Authorization': AuthStr,
};


export default {

  loadData: async (url, state, setState, source) => {
    try {
      const response = await axios.get(
        url,
        {
          cancelToken: source.token,
        });
      setState({
        ...state,
        get: response.data.results,
      });
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('caught cancel');
      } else {
        throw e;
      }
    }
  },

  updateState: () => {
    return axios.put(`${burl}watchlist-mv/`);
  },

};
