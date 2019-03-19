/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.

const express = require('express');
const _ = require('lodash');

const app = express();
const livePricing = require('./live-pricing');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
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
    // pageIndex: params.page,
    // pageSize: 10,
    // session: params.session,
  };
  if (type !== 'full') {
    p.pageIndex = params.page;
    p.pageSize = 10;
    p.session = params.session;
  }
  return p;
};

/**
  Simple flight search api wrapper.

  TODO: client should provide params.

  API params and location values are here:
  http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart
*/

app.get('/api/search_page', async (req, res) => {
  try {
    const p = searchParamsHandler(req.query, 'single');
    const results = await livePricing.searchSingle({
      ...p,
    });
      // TODO - a better format for displaying results to the client
    // let out = _.groupBy(res.Itineraries, 'OutboundLegId')
    const carriers = _.groupBy(results.Carriers, 'Id');
    const agents = _.groupBy(results.Agents, 'Id');
    const places = _.groupBy(results.Places, 'Id');
    const segments = _.groupBy(results.Segments, 'Id');
    const legs = _.groupBy(results.Legs, 'Id');
    const stops = _.groupBy(results.Stops, 'Id');

    const response = {
      query: results.Query,
      itineraries: [],
      agents,
      places,
      segments,
      legs,
      carriers,
      session: results.SessionKey,
      pending: results.pending,
      page: results.page,
      currencies: results.Currencies[0],
    };
      // itineraries.Itineraries = results.Itineraries;
    const tmpItineraries = results.Itineraries.map((s) => {
      let itinerary = {};
      const [outboundLeg] = legs[s.OutboundLegId];
      const [inboundLeg] = legs[s.InboundLegId];
      const outboundSegments = [];
      const inboundSegments = [];
      // console.log(outboundLeg.Id)
      outboundLeg.SegmentIds.forEach((id) => {
        outboundSegments.push(segments[id][0]);
      });


      inboundLeg.SegmentIds.forEach((id) => {
        inboundSegments.push(segments[id][0]);
      });

      const outs = outboundSegments.map((seg) => {
        const sg = {
          OriginStationPlace: places[seg.OriginStation],
          DestinationStationPlace: places[seg.DestinationStation],
          CarrierName: carriers[seg.Carrier],
          OperatingCarrier: carriers[seg.OperatingCarrier],
          ...seg,
        };
        return sg;
      });

      const ins = inboundSegments.map((seg) => {
        const sg = {
          OriginStationPlace: places[seg.OriginStation],
          DestinationStationPlace: places[seg.DestinationStation],
          CarrierName: carriers[seg.Carrier],
          OperatingCarrier: carriers[seg.OperatingCarrier],
          ...seg,
        };
        return sg;
      });

      // outboundLeg.SegmentsDetail = outboundSegments;
      outboundLeg.SegmentsDetail = outs;
      outboundLeg.OriginStationPlace = places[outboundLeg.OriginStation];
      outboundLeg.DestinationStationPlace = places[outboundLeg.DestinationStation];

      inboundLeg.SegmentsDetail = ins;
      inboundLeg.OriginStationPlace = places[inboundLeg.OriginStation];
      inboundLeg.DestinationStationPlace = places[inboundLeg.DestinationStation];

      itinerary = {
        OutboundLeg: outboundLeg,
        InboundLeg: inboundLeg,
        ...s,
      };
      // itinerary.InboundLeg = inboundLeg;
      return itinerary;
      // itineraries.itineraries.push();
    });

    response.itineraries = tmpItineraries;

    res.json(response);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});


app.get('/api/search', async (req, res) => {
  try {
    const p = {
      OriginPlace: 'EDI',
      DestinationPlace: 'LHR',
      OutboundDate: '2019-03-19',
      InboundDate: '2019-03-22',
      Adults: 1,
      Children: 0,
      Infants: 0,
      // pageIndex: req.query.page,
      // pageSize: 10,
      // session: req.query.session
    };
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
    const carriers = _.groupBy(results.Carriers, 'Id');
    const agents = _.groupBy(results.Agents, 'Id');
    const places = _.groupBy(results.Places, 'Id');
    const segments = _.groupBy(results.Segments, 'Id');
    const legs = _.groupBy(results.Legs, 'Id');
    const stops = _.groupBy(results.Stops, 'Id');

    const itineraries = {
      itineraries: [],
      agents,
      places,
      segments,
      legs,
      carriers,
      stops,
      session: results.SessionKey,
      pending: results.pending,
      page: results.page,
      currencies: results.Currencies[0],
    };
    // itineraries.Itineraries = results.Itineraries;
    _.map(results.Itineraries, (s) => {
      outboundLeg = legs[s.OutboundLegId][0];
      inboundLeg = legs[s.InboundLegId][0];
      outboundSegments = [];
      inboundSegments = [];
      // console.log(outboundLeg.Id)
      outboundLeg.SegmentIds.map((id) => {
        segments[id][0];
        outboundSegments.push(segments[id][0]);
      });


      inboundLeg.SegmentIds.map((id) => {
        inboundSegments.push(segments[id][0]);
      });

      outboundSegments.map((seg) => {
        seg.OriginStationPlace = places[seg.OriginStation];
        seg.DestinationStationPlace = places[seg.DestinationStation];
        seg.CarrierName = carriers[seg.Carrier];
        seg.OperatingCarrier = carriers[seg.OperatingCarrier];
      });

      inboundSegments.map((seg) => {
        seg.OriginStationPlace = places[seg.OriginStation];
        seg.DestinationStationPlace = places[seg.DestinationStation];
        seg.CarrierName = carriers[seg.Carrier];
        seg.OperatingCarrier = carriers[seg.OperatingCarrier];
      });

      outboundLeg.SegmentsDetail = outboundSegments;
      outboundLeg.OriginStationPlace = places[outboundLeg.OriginStation];
      outboundLeg.DestinationStationPlace = places[outboundLeg.DestinationStation];
      inboundLeg.SegmentsDetail = inboundSegments;
      inboundLeg.OriginStationPlace = places[inboundLeg.OriginStation];
      inboundLeg.DestinationStationPlace = places[inboundLeg.DestinationStation];

      s.OutboundLeg = outboundLeg;
      s.InboundLeg = inboundLeg;

      itineraries.itineraries.push(s);
    });

    res.json(itineraries);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});
