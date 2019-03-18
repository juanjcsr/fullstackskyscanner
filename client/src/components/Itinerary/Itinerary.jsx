import React, {PureComponent} from 'react';


import ApiUtils from './../../utils/api';
import Card from './card/Card';

class Itinerary extends PureComponent{
    constructor(props) {
        super(props)
        console.log("AFSDFSFASFASF", props)
        this.state = { 
            itineraries: props.itineraries, 
            currency: props.currency, 
        };
        // const api = new ApiUtils();
        // console.log(api)
        // this.getItineraries = this.getItineraries.bind(this, api);
        this.createCards = this.createCards.bind(this);

    }

    // componentDidMount(){
    //     console.log("mounted");
    //     this.getItineraries().then( d => {
    //         console.log("DATAAA", d);
    //         this.setState({itineraries: d.itineraries, currency: d.currencies})
    //     })
    // }

    createCards(itineraries, currency) {
        let cards = [];
        if(itineraries.length) {
            // console.log(this.state.itineraries)
            console.log("RERENDER")
            // const { itineraries, currency } = this.state;
            itineraries.map( (c,i) => {
                // console.log(c);
                cards.push(<Card key={i} itinerary={c} currency={currency}></Card>)
            })
        }
        return cards
    }


    render() {
        const { itineraries, currency } = this.props
        
        return (
            <div id="modal-container">
                <div id="pagewrap">
                    {this.createCards(itineraries, currency)}
                </div>
            </div>
            
        )
    }
}

export default Itinerary;