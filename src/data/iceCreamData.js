import axios from 'axios';

export const getMenu = () => {
  return axios.get('/api/menu').then((response) => {
    return response.data.sort((a, b) => {
      if (a.iceCream.name < b.iceCream.name) {
        return -1;
      }
      if (a.iceCream.name > b.iceCream.name) {
        return 1;
      }
      return 0;
    });
  });
};

export const getIceCreams = () => {
  return axios.get('/api/menu/stock-ice-creams').then((response) => {
    return response.data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  });
};

export const getIceCream = (id) => {
  return axios
    .get(`/api/menu/stock-ice-creams/${id.toString()}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getMenuItem = (menuItemId) => {
  return axios
    .get(`/api/menu/${menuItemId}`)
    .then(({ data }) => data)
    .catch((err) => {
      throw err;
    });
};

export const addMenuItem = (menuItem) => {
  return axios
    .post('/api/menu', menuItem)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const updateMenuItem = (menuItem) => {
  return axios
    .put(`/api/menu/${menuItem.id}`, menuItem)
    .then(({ data }) => data)
    .catch((err) => {
      throw err;
    });
};

export const deleteMenuItem = (menuItemId) => {
  return axios.delete(`/api/menu/${menuItemId}`);
};
