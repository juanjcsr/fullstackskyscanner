import React, {PureComponent} from 'react';


import ApiUtils from './../../utils/api';
import Card from './card/Card';

class Itinerary extends PureComponent{
    constructor(props) {
        super(props)
        console.log("AFSDFSFASFASF", props)
        // const api = new ApiUtils();
        // console.log(api)
        // this.getItineraries = this.getItineraries.bind(this, api);
        this.createCards = this.createCards.bind(this);

    }

    componentDidMount(){
        console.log("mounted");
        // this.getItineraries().then( d => {
        //     console.log("DATAAA", d);
        //     this.setState({itineraries: d.itineraries, currency: d.currencies})
        // })
    }

    createCards(itineraries, currency, agents) {
        let cards = [];
        if(itineraries.length) {
            console.log(this.props.itineraries)
            console.log("RERENDER")
            // const { itineraries, currency } = this.state;
            itineraries.map( (c,i) => {
                const agent = 
                cards.push(<Card key={i} itinerary={c} currency={currency} agent={agents[c.PricingOptions[0].Agents[0]]}></Card>)
            })
        }
        return cards
    }


    render() {
        const { itineraries, currency, agents } = this.props
        
        return (
            <div id="modal-container">
                <div id="pagewrap">
                    {this.createCards(itineraries, currency, agents)}
                </div>
            </div>
            
        )
    }
}

export default Itinerary;