/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.

const fetch = require('node-fetch');
const querystring = require('querystring');

const config = require('./config');

const PRICING_URL = `${config.skyscannerApi}apiservices/pricing/v1.0`;
const POLL_DELAY = 1000;
const STATUS_CODES = {
  CREATED: 201,
  NOT_MODIFIED: 304,
};

const formatParams = params => querystring.stringify({
  country: 'UK',
  currency: 'GBP',
  locale: 'en-GB',
  locationSchema: 'Sky',
  apiKey: config.apiKey,
  ...params,
});

const createSession = async (params) => {
  console.log('Creating a session..');
  try {
    const response = await fetch(PRICING_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formatParams(params),
    });
    if (response.status !== STATUS_CODES.CREATED) {
      const json = await response.json();
      throw new Error(JSON.stringify(json));
    }
    console.log('Session created.');
    // Location header contains URL to poll for results.
    return response.headers.get('location');
    // return jsonresponse
  } catch (err) {
    throw err;
  }
};

let cache = {};

// Used to stop the API being hit too often.
const throttle = () => new Promise(resolve => setTimeout(resolve, POLL_DELAY));

const poll = async (location, pageIndex=-1) => {
  await throttle();
  // console.log('Polling results..', `${location}?apikey=${config.apiKey}&pageIndex=${pageIndex}`);
  try {
    const url = `${location}?apikey=${config.apiKey}`
    const urlPage = pageIndex == -1 ? url : `${url}&pageIndex=${pageIndex}`
    console.log(urlPage);
    const response = await fetch(`${urlPage}`);
    if (response.status === STATUS_CODES.NOT_MODIFIED) {
      return cache;
    }
    const body = await response.json();
    cache = body;
    return body;
  } catch (err) {
    throw err;
  }
  // return jsonresponse
};

const getResults = async (location, pageRequests=false, pageIndex = 0) => {
  try {
    let response
    console.log("LONGPOLL:", pageRequests, pageIndex)
    if (pageRequests) {
      response = await poll(location, pageIndex);
    } else {
      response = await poll(location)
    }
    // const response = await poll(location, pageIndex);
    if (response.Status && response.Status === 'UpdatesComplete') {
      response.pending = false;
      response.page = pageIndex
      return response;
    } 
    if (pageRequests && response.Status && response.Status === "UpdatesPending") {
      response.pending = true;
      response.page = 0
      return response;
    }
    // if (response.Status && response.Status === "UpdatesPending") {
    //   response.pending = true;
    //   response.page = 0
    //   return response;
    // }
    if (!pageRequests) {
      return await getResults(location);
    }
    
    // return jsonresponse
  } catch (err) {
    throw err;
  }
};

const searchSingle = async (params) => {
  try {
    let locationToPoll = ""
    
    let page = !!params.pageIndex ? params.pageIndex : 0;
    console.log( " PAGE", params, page);
    if (params.session) {
      locationToPoll = `http://partners.api.skyscanner.net/apiservices/pricing/uk1/v1.0/${params.session}`
      return await getResults(locationToPoll, true, page)
    } else {
      locationToPoll = await createSession(params);
      console.log(locationToPoll)
      return await getResults(locationToPoll, true, page);
    }
    
    // return await getResults( null);
  } catch (err) {
    throw err;
  }
};

const search = async (params) => {
  try {
    const locationToPoll = await createSession(params);
    return await getResults(locationToPoll);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  search,
  searchSingle
};
