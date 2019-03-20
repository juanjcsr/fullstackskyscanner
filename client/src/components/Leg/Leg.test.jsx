import React from 'react';
import TestRenderer from 'react-test-renderer';

import Leg from './Leg';

describe('Leg', () => {
  it('should be rendered without data', () => {
    const component = TestRenderer.create(<Leg />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be rendered correctly with data', () => {
    const legData = {
      Id: '11235-1903251950--32480-0-13554-1903252110',
      SegmentIds: [0],
      OriginStation: 11235,
      DestinationStation: 13554,
      Departure: '2019-03-25T19:50:00',
      Arrival: '2019-03-25T21:10:00',
      Duration: 80,
      JourneyMode: 'Flight',
      Stops: [],
      Carriers: [881],
      OperatingCarriers: [881],
      Directionality: 'Outbound',
      FlightNumbers: [{ FlightNumber: '1463', CarrierId: 881 }],
      SegmentsDetail: [{
        OriginStationPlace: [{
          Id: 11235, ParentId: 2343, Code: 'EDI', Type: 'Airport', Name: 'Edinburgh',
        }],
        DestinationStationPlace: [{
          Id: 13554, ParentId: 4698, Code: 'LHR', Type: 'Airport', Name: 'London Heathrow',
        }],
        CarrierName: [{
          Id: 881, Code: 'BA', Name: 'British Airways', ImageUrl: 'https://s1.apideeplink.com/images/airlines/BA.png', DisplayCode: 'BA',
        }],
        OperatingCarrier: 881,
        Id: 0,
        OriginStation: 11235,
        DestinationStation: 13554,
        DepartureDateTime: '2019-03-25T19:50:00',
        ArrivalDateTime: '2019-03-25T21:10:00',
        Carrier: 881,
        Duration: 80,
        FlightNumber: '1463',
        JourneyMode: 'Flight',
        Directionality: 'Outbound',
      }],
      OriginStationPlace: [{
        Id: 11235, ParentId: 2343, Code: 'EDI', Type: 'Airport', Name: 'Edinburgh',
      }],
      DestinationStationPlace: [{
        Id: 13554, ParentId: 4698, Code: 'LHR', Type: 'Airport', Name: 'London Heathrow',
      }],
    };
    const component = TestRenderer.create(<Leg legData={legData} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
