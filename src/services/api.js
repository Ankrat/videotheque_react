import { AuthStr } from './content';

import axios from 'axios';
const burl = 'http://localhost:8085/api/';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': AuthStr,
  },
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

  details: async (url, setState) => {
    await axios.get(url)
      .then(response => {
        setState({
          get: response.data,
          genres: response.data.genres,
          country: response.data.production_countries,
          seasons: response.data.seasons,
          fetching: false });
      }).catch(err => console.log(err));
  },

  getIdItems: (urlApi, state, setState) => {
    axios.get(urlApi, {
      headers: { Authorization: AuthStr },
    })
      .then(response => {
        setState({
          ...state,
          films: response.data.data,
          fetching: false,
        });
      }).catch(err => {
        console.log(err);
      });
  },


  updateState: () => {
    return axios.put(`${burl}watchlist-mv/`);
  },

  send: async (url, data, state, setState) => {

    try {
      const response = await axios.post(url, {
        title: data.title,
        poster_path: data.poster_path,
        id_details: data.id_details,
      }, headers);
      if (response.data.code === 3) {
        setState({
          ...state,
          err_3: true,
        });
      }
    } catch (e) {
      if (e.response.data.code === 3) {
        setState({
          ...state,
          err_3: true,
        });
      }
    }
  },

  remove: (url) => {
    axios.delete(url, headers)
      .then(res => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  },

};
