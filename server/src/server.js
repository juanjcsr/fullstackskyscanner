/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.

const express = require('express');
const path = require('path');

const app = express();
const livePricing = require('./live-pricing');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const staticOptionsObj = {
  extensions: ['html'],
};

if (process.env.NODE_ENV === 'production') {
  const pathRoot = path.normalize('./../client/build');
  app.use(express.static(pathRoot, staticOptionsObj));
}

app.get('/api/hello', (req, res) => {
  res.send('Hello World!');
});


const searchParamsHandler = (params, type = 'full') => {
  const p = {
    OriginPlace: params.from,
    DestinationPlace: params.to,
    OutboundDate: params.departure,
    InboundDate: params.returnd,
    cabinClass: params.fclass,
    Adults: params.adults,
    Children: params.children,
    Infants: params.infants,
  };
  if (type !== 'full') {
    p.pageIndex = params.page;
    p.pageSize = 10;
    p.session = params.session;
  }
  return p;
};

/**
  Simple flight search api wrapper, paginated.

  It returns the first batch of results based on provided params and the current page.
  By providing the oage via the 'page' param, it returns the next results in the
  the remote API

  API params and location values are here:
  http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart
*/
app.get('/api/search_page', async (req, res) => {
  try {
    const p = searchParamsHandler(req.query, 'single');
    const results = await livePricing.searchSingle({
      ...p,
    });
    return res.json(livePricing.resultsFormatter(results));
  } catch (err) {
    return res.status(500).send(err);
    // console.error(err);
  }
});

/**
  Simple flight search api wrapper.

  This endpoint longpolls Skyscanner API.

  API params and location values are here:
  http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart
*/
app.get('/api/search', async (req, res) => {
  try {
    const p = searchParamsHandler(req.query);
    console.log(p);
    const results = await livePricing.search({
    /*
     TODO: client to provide params.
     Some params are already provided for you - see live-pricing.js.
     Check API docs to see the other params you need to provide.
     */
      ...p,
    });
    // TODO - a better format for displaying results to the client
    console.log('TODO: transform results for consumption by client');
    // let out = _.groupBy(res.Itineraries, 'OutboundLegId')
    return res.json(livePricing.resultsFormatter(results));
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log('Node server listening on http://localhost:4000');
});

module.exports = { app, server };
