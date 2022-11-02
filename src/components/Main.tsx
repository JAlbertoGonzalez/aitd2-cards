import { Box, Card, MenuItem, Select, SelectChangeEvent, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
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

    return <Box>
        <Card>
            <Typography>
                <p>{firstCard} over {overCard},<br />Hole number: {hole}</p>
            </Typography>
            <h3>Result: {resultString}</h3>
            <p>First card:</p>
            <Select onChange={(e: SelectChangeEvent<string>) => setFirstCard(e.target.value)}>
                {cardNames.map((cardName, n) => {
                    return <MenuItem key={n} value={cardName}>{cardName}</MenuItem>
                })}
            </Select>
            <p>Over:</p>
            <Select
                placeholder='Select one...'
                onChange={(e: SelectChangeEvent<string>) => setOverCard(e.target.value)}>
                {cardNames.map((cardName, n) => {
                    return <MenuItem
                        key={n}
                        value={cardName}>{cardName}</MenuItem>
                })}
            </Select>

            <p>Hole number</p>

            <ToggleButtonGroup
                value={hole}
                exclusive
                onChange={(e, value) => setHole(value)}>
                {holes.map((number, n) => {
                    return <ToggleButton
                        value={number}
                        key={n}>{number}</ToggleButton>
                })}
            </ToggleButtonGroup>

        </Card>
    </Box>
}

export default Main;