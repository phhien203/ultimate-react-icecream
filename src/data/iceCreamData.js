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

export const getMenuItem = (menuItemId) => {
  return axios
    .get(`/api/menu/${menuItemId}`)
    .then(({ data }) => data)
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
