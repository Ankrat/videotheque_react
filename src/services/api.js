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
        url, {
          cancelToken: source.token,
        });

      setState({
        ...state,
        get: response.data.results,
        current_page: response.data.page,
        total_pages: response.data.total_pages,
        fetching: false,
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
          get: response.data.data,
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
        return true;
      })
      .catch((error) => {
        console.log(error);
      });
  },


  getUser: async (url, setUser, setState, state) => {
    await axios.get(url, {
      headers: { Authorization: AuthStr },
    })
      .then( res => {
        setUser(res.data.user);
        setState({
          ...state,
          fetching: true,
        });
      })
      .catch( e => {
        return false;
      } );
  },

  //=======SEGMENT=======//

  createSegment: async (urlApi, data, state, setState) => {
    await axios.post(urlApi, { segment: data }, headers)
      .then(res => setState({
        ...state,
        submit: !state.submit,
      }))
      .catch(e => console.log(e));
  },

  updateSegment: async (urlApi, data, state, setState) => {
    await axios.put(urlApi, {
      indexSegment: data.index,
      newSegmentName: data.newSegment,
    }, headers)
      .then(res => setState({
        ...state,
        submit: !state.submit,
      }))
      .catch(e => console.log(e));
  },

  removeSegment: async (urlApi, data, state, setState) => {
    await axios.delete(urlApi, {
      headers: { Authorization: AuthStr },
      data: { indexSegment: data },
    })
      .then(res => {
        setState({
          ...state,
          submit: !state.submit,
        });
      })
      .catch(e => console.log(e));
  },

  getSegmentItems: (urlApi, state, setState) => {
    axios.get(urlApi, {
      headers: { Authorization: AuthStr },
    })
      .then(response => {
        setState({
          ...state,
          get: response.data.data,
          fetching: false,
        });
      }).catch(err => {
        console.log(err);
      });
  },

};
