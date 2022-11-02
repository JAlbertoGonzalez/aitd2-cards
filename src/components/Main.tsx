import React, { useEffect, useState } from 'react'
import { getCardNames, getResult } from '../lib/utils'
import { holes } from './constants'

function Main() {
    const [cardNames, setCardNames] = useState<string[]>([])
    const [firstCard, setFirstCard] = useState<string>('')
    const [overCard, setOverCard] = useState<string>('')
    const [hole, setHole] = useState(0)
    const [resultString, setResultString] = useState('')

    useEffect(() => {
        setCardNames(getCardNames())
    }, [])

    const updateCard = () => setResultString(getResult(firstCard, overCard, hole));

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