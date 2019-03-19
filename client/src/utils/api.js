// example api use
// TODO put this call somewhere sensible
// TODO send parameters to server - check out `server/src/live-pricing.js`
console.log('fetching results from server...');

class ApiUtils {
    getSearch(params) {
        const urlParams = new URLSearchParams(params);
        const url = new URL('http://localhost:4000/api/search');
        url.search = urlParams
        console.log("apirequest", url)
        return fetch(url)
            .then(response => response.json())
            .then((results) => {
            console.log('TODO: something with these results:');
            console.log(results);
            return results
            })
            .catch(console.error);
    }


    getSearchByPage(params) {
        const urlParams = new URLSearchParams(params);
        const url = new URL('http://localhost:4000/api/search_page');
        url.search = urlParams
        console.log("apirequest", url)
        return fetch(url)
            .then(response => response.json())
            .then((results) => {
            console.log('TODO: something with these results:');
            console.log(results);
            return results
        })
            .catch(console.error);
    }
}

export default ApiUtils;


