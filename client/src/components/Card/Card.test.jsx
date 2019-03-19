import React from 'react';
import TestRenderer from 'react-test-renderer';

import Card from './Card';

describe('Card', () => {
  it('should be rendered without data', () => {
    const component = TestRenderer.create(<Card />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be rendered correctly with data', () => {
    const itinerary = {
      OutboundLeg: {
        Id: '11235-1903250720--32302,-32753-1-13554-1903251425',
        SegmentIds: [8, 9],
        OriginStation: 11235,
        DestinationStation: 13554,
        Departure: '2019-03-25T07:20:00',
        Arrival: '2019-03-25T14:25:00',
        Duration: 425,
        JourneyMode: 'Flight',
        Stops: [9889],
        Carriers: [885, 1033],
        OperatingCarriers: [885, 1033],
        Directionality: 'Outbound',
        FlightNumbers: [{ FlightNumber: '681', CarrierId: 885 }, { FlightNumber: '34', CarrierId: 1033 }],
        SegmentsDetail: [{
          OriginStationPlace: [{
            Id: 11235, ParentId: 2343, Code: 'EDI', Type: 'Airport', Name: 'Edinburgh',
          }],
          DestinationStationPlace: [{
            Id: 9889, ParentId: 876, Code: 'BHD', Type: 'Airport', Name: 'Belfast City',
          }],
          CarrierName: [{
            Id: 885, Code: 'BE', Name: 'Flybe', ImageUrl: 'https://s1.apideeplink.com/images/airlines/BE.png', DisplayCode: 'BE',
          }],
          OperatingCarrier: 885,
          Id: 8,
          OriginStation: 11235,
          DestinationStation: 9889,
          DepartureDateTime: '2019-03-25T07:20:00',
          ArrivalDateTime: '2019-03-25T08:15:00',
          Carrier: 885,
          Duration: 55,
          FlightNumber: '681',
          JourneyMode: 'Flight',
          Directionality: 'Outbound',
        }, {
          OriginStationPlace: [{
            Id: 9889, ParentId: 876, Code: 'BHD', Type: 'Airport', Name: 'Belfast City',
          }],
          DestinationStationPlace: [{
            Id: 13554, ParentId: 4698, Code: 'LHR', Type: 'Airport', Name: 'London Heathrow',
          }],
          CarrierName: [{
            Id: 1033, Code: 'EI', Name: 'Aer Lingus', ImageUrl: 'https://s1.apideeplink.com/images/airlines/EI.png', DisplayCode: 'EI',
          }],
          OperatingCarrier: 1033,
          Id: 9,
          OriginStation: 9889,
          DestinationStation: 13554,
          DepartureDateTime: '2019-03-25T13:05:00',
          ArrivalDateTime: '2019-03-25T14:25:00',
          Carrier: 1033,
          Duration: 80,
          FlightNumber: '34',
          JourneyMode: 'Flight',
          Directionality: 'Outbound',
        }],
        OriginStationPlace: [{
          Id: 11235, ParentId: 2343, Code: 'EDI', Type: 'Airport', Name: 'Edinburgh',
        }],
        DestinationStationPlace: [{
          Id: 13554, ParentId: 4698, Code: 'LHR', Type: 'Airport', Name: 'London Heathrow',
        }],
      },
      InboundLeg: {
        Id: '13554-1903261820--32480-0-11235-1903261945',
        SegmentIds: [10],
        OriginStation: 13554,
        DestinationStation: 11235,
        Departure: '2019-03-26T18:20:00',
        Arrival: '2019-03-26T19:45:00',
        Duration: 85,
        JourneyMode: 'Flight',
        Stops: [],
        Carriers: [881],
        OperatingCarriers: [881],
        Directionality: 'Inbound',
        FlightNumbers: [{ FlightNumber: '1458', CarrierId: 881 }],
        SegmentsDetail: [{
          OriginStationPlace: [{
            Id: 13554, ParentId: 4698, Code: 'LHR', Type: 'Airport', Name: 'London Heathrow',
          }],
          DestinationStationPlace: [{
            Id: 11235, ParentId: 2343, Code: 'EDI', Type: 'Airport', Name: 'Edinburgh',
          }],
          CarrierName: [{
            Id: 881, Code: 'BA', Name: 'British Airways', ImageUrl: 'https://s1.apideeplink.com/images/airlines/BA.png', DisplayCode: 'BA',
          }],
          OperatingCarrier: 881,
          Id: 10,
          OriginStation: 13554,
          DestinationStation: 11235,
          DepartureDateTime: '2019-03-26T18:20:00',
          ArrivalDateTime: '2019-03-26T19:45:00',
          Carrier: 881,
          Duration: 85,
          FlightNumber: '1458',
          JourneyMode: 'Flight',
          Directionality: 'Inbound',
        }],
        OriginStationPlace: [{
          Id: 13554, ParentId: 4698, Code: 'LHR', Type: 'Airport', Name: 'London Heathrow',
        }],
        DestinationStationPlace: [{
          Id: 11235, ParentId: 2343, Code: 'EDI', Type: 'Airport', Name: 'Edinburgh',
        }],
      },
      OutboundLegId: '11235-1903250720--32302,-32753-1-13554-1903251425',
      InboundLegId: '13554-1903261820--32480-0-11235-1903261945',
      PricingOptions: [{
        Agents: [2365707], QuoteAgeInMinutes: 33, Price: 356.38, DeeplinkUrl: 'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=zOm%2f6FCg6gDOE4rdoXmlE7hM3pD0U74mG5ftPhdP2gYHYNfl2GcrqQa0epbDDGLd&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUK%2fen-GB%2fGBP%2febuk%2f2%2f11235.13554.2019-03-25%2c13554.11235.2019-03-26%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32302%7c681%7c11235%7c2019-03-25T07%3a20%7c9889%7c2019-03-25T08%3a15%7c55%7cKFLYSS%7cK%7c-%3bflight%7c-32753%7c34%7c9889%7c2019-03-25T13%3a05%7c13554%7c2019-03-25T14%3a25%7c80%7cVBOW26G%7cV%7c-%2cflight%7c-32480%7c1458%7c13554%7c2019-03-26T18%3a20%7c11235%7c2019-03-26T19%3a45%7c85%7cMZ0R%7cM%7c-%26carriers%3d-32302%2c-32753%2c-32480%26operators%3d-32302%3b-32753%2c-32480%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d356.38%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3debuk.11235.4698.190325.190326.1..E%7c8503076537305227810%26commercial_filters%3dfalse%26q_datetime_utc%3d2019-03-19T22%3a54%3a00%26pqid%3dtrue',
      }, {
        Agents: [3503883], QuoteAgeInMinutes: 33, Price: 357.92, DeeplinkUrl: 'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=zOm%2f6FCg6gDOE4rdoXmlE7hM3pD0U74mG5ftPhdP2gYHYNfl2GcrqQa0epbDDGLd&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUK%2fen-GB%2fGBP%2fopuk%2f2%2f11235.13554.2019-03-25%2c13554.11235.2019-03-26%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32302%7c681%7c11235%7c2019-03-25T07%3a20%7c9889%7c2019-03-25T08%3a15%7c55%7c-%7c-%7c-%3bflight%7c-32753%7c34%7c9889%7c2019-03-25T13%3a05%7c13554%7c2019-03-25T14%3a25%7c80%7c-%7c-%7c-%2cflight%7c-32480%7c1458%7c13554%7c2019-03-26T18%3a20%7c11235%7c2019-03-26T19%3a45%7c85%7c-%7c-%7c-%26carriers%3d-32302%2c-32753%2c-32480%26operators%3d-32302%3b-32753%2c-32480%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d357.92%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dopuk.11235.13554.190325.190326.1..E%7c-8015069280876441940%26commercial_filters%3dfalse%26q_datetime_utc%3d2019-03-19T22%3a54%3a00%26pqid%3dfalse',
      }, {
        Agents: [2043147], QuoteAgeInMinutes: 9, Price: 361.9, DeeplinkUrl: 'http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=zOm%2f6FCg6gDOE4rdoXmlE7hM3pD0U74mG5ftPhdP2gYHYNfl2GcrqQa0epbDDGLd&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUK%2fen-GB%2fGBP%2fbfuk%2f2%2f11235.13554.2019-03-25%2c13554.11235.2019-03-26%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32302%7c681%7c11235%7c2019-03-25T07%3a20%7c9889%7c2019-03-25T08%3a15%7c55%7cKFLY2S%7cK%7c-%3bflight%7c-32753%7c34%7c9889%7c2019-03-25T13%3a05%7c13554%7c2019-03-25T14%3a25%7c80%7cVB26OWG%7cV%7c-%2cflight%7c-32480%7c1458%7c13554%7c2019-03-26T18%3a20%7c11235%7c2019-03-26T19%3a45%7c85%7cMZ0RO%7cM%7c-%26carriers%3d-32302%2c-32753%2c-32480%26operators%3d-32302%3b-32753%2c-32480%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d361.90%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dbfuk.11235.13554.190325.190326.1..E%7c8682264064947975486%26commercial_filters%3dfalse%26q_datetime_utc%3d2019-03-19T23%3a18%3a00%26pqid%3dfalse',
      }],
      BookingDetailsLink: { Uri: '/apiservices/pricing/v1.0/b50413b6-3968-46ca-bf13-f8dfaf1db317/booking', Body: 'OutboundLegId=11235-1903250720--32302,-32753-1-13554-1903251425&InboundLegId=13554-1903261820--32480-0-11235-1903261945', Method: 'PUT' },
    };
    const agent = [{"Id":2628363,"Name":"GotoGate","ImageUrl":"https://s1.apideeplink.com/images/websites/gtuk.png","Status":"UpdatesComplete","OptimisedForMobile":true,"Type":"TravelAgent"}];
    const currency = {"Code":"GBP","Symbol":"£","ThousandsSeparator":",","DecimalSeparator":".","SymbolOnLeft":true,"SpaceBetweenAmountAndSymbol":false,"RoundingCoefficient":0,"DecimalDigits":2}
    const component = TestRenderer.create(<Card itinerary={itinerary} agent={agent} currency={currency} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
