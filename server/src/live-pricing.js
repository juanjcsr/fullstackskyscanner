/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.

const fetch = require('node-fetch');
const querystring = require('querystring');
const _ = require('lodash');

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

const poll = async (location, pageIndex = -1) => {
  await throttle();
  // console.log('Polling results..', `${location}?apikey=${config.apiKey}&pageIndex=${pageIndex}`);
  try {
    const url = `${location}?apikey=${config.apiKey}`;
    const urlPage = pageIndex === -1 ? url : `${url}&pageIndex=${pageIndex}`;
    console.log('Polling results..', urlPage);
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
};

const getResults = async (location, pageRequests = false, pageIndex = 0) => {
  try {
    let response;
    if (pageRequests) {
      response = await poll(location, pageIndex);
    } else {
      response = await poll(location);
    }
    if (response.Status && response.Status === 'UpdatesComplete') {
      response.pending = false;
      response.page = pageIndex;
      return response;
    }
    if (pageRequests && response.Status && response.Status === 'UpdatesPending') {
      response.pending = true;
      response.page = 0;
      return response;
    }
    if (!pageRequests) {
      return await getResults(location);
    }
    return null;

    // return jsonresponse
  } catch (err) {
    return err;
  }
};

// Make a request to SkyScanner API to get paginated results
const searchSingle = async (params) => {
  try {
    let locationToPoll = '';

    const page = params.pageIndex ? params.pageIndex : 0;
    if (params.session) {
      locationToPoll = `http://partners.api.skyscanner.net/apiservices/pricing/uk1/v1.0/${params.session}`;
      return await getResults(locationToPoll, true, page);
    }
    locationToPoll = await createSession(params);
    console.log(locationToPoll);
    return await getResults(locationToPoll, true, page);
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

// getSegments adds places and carrier info to a single segment by their ID
const getSegments = (segments, places, carriers) => {
  const mappedSegments = segments.map((seg) => {
    const sg = {
      OriginStationPlace: places[seg.OriginStation],
      DestinationStationPlace: places[seg.DestinationStation],
      CarrierName: carriers[seg.Carrier],
      OperatingCarrier: carriers[seg.OperatingCarrier],
      ...seg,
    };
    return sg;
  });
  return mappedSegments;
};

// groups segments with their carrier and place info
// and returns them inside their corresponding itinerary's legs
const resultsFormatter = (results) => {
  // First group by Id carriers, agents, places, segments and legs to
  // make them searchable
  const carriers = _.groupBy(results.Carriers, 'Id');
  const agents = _.groupBy(results.Agents, 'Id');
  const places = _.groupBy(results.Places, 'Id');
  const segments = _.groupBy(results.Segments, 'Id');
  const legs = _.groupBy(results.Legs, 'Id');

  const response = {
    query: results.Query,
    itineraries: [],
    agents,
    session: results.SessionKey,
    pending: results.pending,
    page: results.page,
    currencies: results.Currencies[0],
  };

  // Get an array of itineraries with their corresponding leg data.
  const tmpIts = results.Itineraries.map((i) => {
    let itinerary = {};
    const [outboundLeg] = legs[i.OutboundLegId];
    const [inboundLeg] = legs[i.InboundLegId];
    const outboundSegments = [];
    const inboundSegments = [];

    outboundLeg.SegmentIds.forEach((id) => {
      outboundSegments.push(segments[id][0]);
    });


    inboundLeg.SegmentIds.forEach((id) => {
      inboundSegments.push(segments[id][0]);
    });

    // group inbound or outbound segments
    const outs = getSegments(outboundSegments, places, carriers);
    const ins = getSegments(inboundSegments, places, carriers);

    // Add places info to outbound and inbound legs
    outboundLeg.SegmentsDetail = outs;
    outboundLeg.OriginStationPlace = places[outboundLeg.OriginStation];
    outboundLeg.DestinationStationPlace = places[outboundLeg.DestinationStation];

    inboundLeg.SegmentsDetail = ins;
    inboundLeg.OriginStationPlace = places[inboundLeg.OriginStation];
    inboundLeg.DestinationStationPlace = places[inboundLeg.DestinationStation];

    // puts everything together inside the current itinerary
    itinerary = {
      OutboundLeg: outboundLeg,
      InboundLeg: inboundLeg,
      ...i,
    };
    return itinerary;
  });
  response.itineraries = tmpIts;
  return response;
};

module.exports = {
  search,
  searchSingle,
  resultsFormatter,
};
