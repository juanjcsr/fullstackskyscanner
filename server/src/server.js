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

/**
  Simple flight search api wrapper.

  TODO: client should provide params.

  API params and location values are here:
  http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart
*/
app.get('/api/search', async (req, res) => {
  try {

    const p = {
      OriginPlace: "EDI",
      DestinationPlace: "LHR",
      OutboundDate:"2019-03-18",
      InboundDate:"2019-03-19",
      Adults:1,
      Children:0,
      Infants:0,
      pageIndex:0,
      pageSize: 10
    };
    const results = await livePricing.search({
    /*
     TODO: client to provide params.
     Some params are already provided for you - see live-pricing.js.
     Check API docs to see the other params you need to provide.
     */
      ...p
    });
    // TODO - a better format for displaying results to the client
    console.log('TODO: transform results for consumption by client');
    // let out = _.groupBy(res.Itineraries, 'OutboundLegId')
    let carriers = _.groupBy(results.Carriers, 'Id');
    let agents = _.groupBy(results.Agents, 'Id');
    let places = _.groupBy(results.Places, 'Id');
    let segments = _.groupBy(results.Segments, 'Id')
    let legs = _.groupBy(results.Legs, 'Id');
    
    let itineraries = {
      itineraries: [],
      agents,
      places,
      segments,
      legs,
      carriers
    };
    itineraries.Itineraries = []
     _.map(results.Itineraries, (s) => {
      outboundLeg = legs[s.OutboundLegId][0]
      inboundLeg = legs[s.InboundLegId][0]
      outboundSegments = [];
      inboundSegments = [];
      console.log(outboundLeg.Id)
      outboundLeg.SegmentIds.map( id => {
        outboundSegments.push(segments[id][0]);
      })


      inboundLeg.SegmentIds.map( id => {
        inboundSegments.push(segments[id][0])
      })

      outboundSegments.map( seg => {
        seg.OriginStationPlace = places[seg.OriginStation];
        seg.DestinationStation = places[seg.DestinationStation];
        seg.CarrierName = carriers[seg.Carrier];
        seg.OperatingCarrier = carriers[seg.OperatingCarrier];
      })

      inboundSegments.map( seg => {
        seg.OriginStationPlace = places[seg.OriginStation];
        seg.DestinationStation = places[seg.DestinationStation];
        seg.CarrierName = carriers[seg.Carrier];
        seg.OperatingCarrier = carriers[seg.OperatingCarrier];
      })

      outboundLeg.SegmentsDetail = outboundSegments;
      inboundLeg.SegmentsDetail = inboundSegments;

      s.OutboundLeg = outboundLeg
      s.InboundLeg = inboundLeg

      itineraries.itineraries.push(s)
    })

    res.json(itineraries);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});
