import { Box, Card, Grid, MenuItem, Select, SelectChangeEvent, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
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
        <Card sx={{ margin: 3, padding: 3 }}>
            <h1>Alone in the Dark 2</h1>
            <h3>Copy protection code</h3>
            <Grid container spacing={3}>
                <Grid item xs={6} textAlign={'right'}>
                    <p>First card:</p>
                </Grid>

                <Grid item xs={6} textAlign={'left'}>
                    <Select onChange={(e: SelectChangeEvent<string>) => setFirstCard(e.target.value)}>
                        {cardNames.map((cardName, n) => {
                            return <MenuItem key={n} value={cardName}>{cardName}</MenuItem>
                        })}
                    </Select>
                </Grid>

                <Grid item xs={6} textAlign={'right'}>
                    <p>Over:</p>
                </Grid>

                <Grid item xs={6} textAlign={'left'}>
                    <Select
                        placeholder='Select one...'
                        onChange={(e: SelectChangeEvent<string>) => setOverCard(e.target.value)}>
                        {cardNames.map((cardName, n) => {
                            return <MenuItem
                                key={n}
                                value={cardName}>{cardName}</MenuItem>
                        })}
                    </Select>
                </Grid>

                <Grid item xs={6} textAlign={'right'}>
                    <p>Hole number:</p>
                </Grid>

                <Grid item xs={6} textAlign={'left'}>
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
                </Grid>

                <Grid item xs={12}>
                    <Typography>
                        <p>{firstCard} over {overCard},<br />Hole number: {hole}</p>
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <h3>Result: {resultString}</h3>
                </Grid>

            </Grid>
        </Card>
    </Box>
}

export default Main;