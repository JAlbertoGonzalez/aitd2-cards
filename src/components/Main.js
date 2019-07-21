import React from 'react'
import data from '../data.json'

const colorNames = new Map([
    ['B', 'Blue'],
    ['Y', 'Yellow'],
    ['P', 'Purple'],
    ['R', 'Red'],
    ['O', 'Orange'],
    ['G', 'Green']
]);

const colorKeys = new Map([
    ['Y', 'F6'],
    ['G', 'F7'],
    ['B', 'F8'],
    ['P', 'F9'],
    ['O', 'F10'],
    ['R', 'F5+F10'],
]);

const figureNames = new Map([
    ['C', 'Clubs'],
    ['S', 'Spades'],
    ['D', 'Diamonds'],
    ['H', 'Hearts'],
]);

const figureKeys = new Map([
    ['S', 'F1'],
    ['H', 'F2'],
    ['D', 'F3'],
    ['C', 'F4'],
]);

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cardNames: [],
            firstCard: null,
            overCard: null,
            holes: [1, 2, 3, 4, 5, 6],
            hole: 0,
            resultString: ''
        }
    }

    componentDidMount() {
        var cardNames = [];
        data.cards.map(obj => {
            cardNames.push(obj.n);
            cardNames.push(obj.r);
        });

        cardNames.sort();

        this.setState({
            cardNames: cardNames
        });
    }

    reverseString(str) {
        var newString = "";
        for (var i = str.length - 1; i >= 0; i--) { newString += str[i]; }
        return newString;
    }


    updateCard() {
        if (this.state.hole > 0 && this.state.firstCard && this.state.overCard) {
            // Find cards

            var firstCard = data.cards.find(element => {
                return element.n === this.state.firstCard || element.r === this.state.firstCard;
            });
            var overCard = data.cards.find(element => {
                return element.n === this.state.overCard || element.r === this.state.overCard;
            });

            var firstCardColors = firstCard.c;
            // var firstCardFigures = firstCard.f;
            if (firstCard.r === this.state.firstCard) {
                firstCardColors = this.reverseString(firstCardColors);
                // firstCardFigures = this.reverseString(firstCardFigures);
            }

            var overCardColors = overCard.c;
            var overCardFigures = overCard.f;
            if (overCard.r === this.state.overCard) {
                overCardColors = this.reverseString(overCardColors);
                overCardFigures = this.reverseString(overCardFigures);
            }

            // Locate hole

            var positionHole = -1;
            for (let i = 1; i <= this.state.hole; i++) {
                positionHole = firstCardColors.indexOf('_', positionHole + 1)
            }

            var resultColor = overCardColors.charAt(positionHole);
            var resultFigure = overCardFigures.charAt(positionHole);

            // Final result in readable text

            var finalString = 'Error';

            if (resultColor === '_' || resultColor === '_') {
                finalString = 'Error, impossible combination'
            } else {
                finalString = colorNames.get(resultColor) + " " + figureNames.get(resultFigure) + " (Press " + figureKeys.get(resultFigure) + " " + colorKeys.get(resultColor) + ")";
            }

            if (finalString !== this.state.resultString) {
                this.setState({
                    resultString: finalString
                });
            }
        }
    }

    componentDidUpdate() {
        this.updateCard();
    }

    render() {
        return <div>
            <p>{this.state.firstCard} over {this.state.overCard},<br />Hole number: {this.state.hole}</p>
            <h3>Result: {this.state.resultString}</h3>
            <p>First card:</p>
            {this.state.cardNames.map(cardName => {
                return <button onClick={() => {
                    this.setState({
                        firstCard: cardName
                    });
                }}>{cardName}</button>
            })}
            <p>Over:</p>
            {this.state.cardNames.map(cardName => {
                return <button onClick={() => {
                    this.setState({
                        overCard: cardName
                    });
                }}>{cardName}</button>
            })}
            <p>Hole number</p>

            {this.state.holes.map(number => <button onClick={() => {
                this.setState({ hole: number });

            }}>{number}</button>)}
        </div>;
    }
}

export default Main;