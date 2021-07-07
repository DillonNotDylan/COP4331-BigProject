import React from 'react'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: 500,
        alignItems:'flex'
    }
});

const marks = [
    {
        value: 0,
        label: 'Sad',
        mode: 'Locrian'
    },
    {
        value: 1,
        mode: 'Phrygian'
    },
    {
        value: 2,
        mode: 'Aeolian'
    },
    {
        value: 3,
        mode: 'Dorian'
    },
    {
        value: 4,
        mode: 'Myxolydian'
    },
    {
        value: 5,
        mode: 'Ionian'
    },
    {
        value: 6,
        label: 'Happy',
        mode: 'Lydian'
    }
]

const SliderBox = ({disableSlider}) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            
            <Slider
                color="secondary"
                defaultValue={0}
                min={0}
                max={6}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                marks={marks}
                track='false'
                disabled={disableSlider}
            />
        </div>
    )
}

export default SliderBox
