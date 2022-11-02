import React, { useEffect, useState } from 'react'
import data from '../data.json'
import { colorKeys, colorNames, figureKeys, figureNames, holes } from './constants'

function Main() {
    const [cardNames, setCardNames] = useState([])
    const [firstCard, setFirstCard] = useState(null)
    const [overCard, setOverCard] = useState(null)
    const [hole, setHole] = useState(0)
    const [resultString, setResultString] = useState('')

    useEffect(() => {
        let cardNames = [];
        data.cards.map(obj => {
            cardNames.push(obj.n);
            cardNames.push(obj.r);
        });

        cardNames.sort();

        setCardNames(cardNames)
    }, [])

    function reverseString(str) {
        var newString = "";
        for (var i = str.length - 1; i >= 0; i--) { newString += str[i]; }
        return newString;
    }

    function updateCard() {
        if (hole > 0 && firstCard && overCard) {
            // Find cards

            let _firstCard = data.cards.find(element => {
                return element.n === firstCard || element.r === firstCard;
            });
            let _overCard = data.cards.find(element => {
                return element.n === overCard || element.r === overCard;
            });

            var firstCardColors = _firstCard.c;
            // var firstCardFigures = firstCard.f;
            if (_firstCard.r === firstCard) {
                firstCardColors = reverseString(firstCardColors);
                // firstCardFigures = reverseString(firstCardFigures);
            }

            var overCardColors = _overCard.c;
            var overCardFigures = _overCard.f;
            if (_overCard.r === overCard) {
                overCardColors = reverseString(overCardColors);
                overCardFigures = reverseString(overCardFigures);
            }

            // Locate hole

            var positionHole = -1;
            for (let i = 1; i <= hole; i++) {
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

            if (finalString !== resultString) {
                setResultString(finalString)
            }
        }
    }

    useEffect(() => updateCard(), [firstCard, overCard, hole])

    return <div>
        <p>{firstCard} over {overCard},<br />Hole number: {hole}</p>
        <h3>Result: {resultString}</h3>
        <p>First card:</p>
        <select onChange={(e) => setFirstCard(e.target.value)}>
            {cardNames.map((cardName, n) => <option key={n}>{cardName}</option>)}
        </select>
        <p>Over:</p>
        <select onChange={(e) => setOverCard(e.target.value)}>
            {cardNames.map((cardName, n) => <option key={n}>{cardName}</option>)}
        </select>

        <p>Hole number</p>

        {holes.map((number, n) => <button key={n} onClick={() => setHole(number)}>{number}</button>)}
    </div>
}

export default Main;