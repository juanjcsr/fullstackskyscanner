// example api use
// TODO put this call somewhere sensible
// TODO send parameters to server - check out `server/src/live-pricing.js`
console.log('fetching results from server...');

const getSearch = (params) => {
  const urlParams = new URLSearchParams(params);
  const url = new URL('http://localhost:4000/api/search');
  url.search = urlParams;
  return fetch(url)
    .then(response => response.json())
    .then(results => results)
    .catch(err => err);
};


const getSearchByPage = (params) => {
  const urlParams = new URLSearchParams(params);
  const url = new URL('http://localhost:4000/api/search_page');
  url.search = urlParams;
  return fetch(url)
    .then(response => response.json())
    .then((results) => {
      console.log(results);
      return results;
    })
    .catch(err => err);
};

// export default ApiUtils;
export {
  getSearch,
  getSearchByPage,
};
