import React, { useState, useEffect, forwardRef } from 'react';
import { differenceInSeconds } from 'date-fns';

const Timer = ({ start, elapsed, onIncrement }) => {
    useEffect(() => {
        const timer = setInterval(() => {
            onIncrement(differenceInSeconds(new Date(), start));
        }, 1000);

        return () => {
            console.log('clearing timer')
            clearTimeout(timer);
        }
    }, []);

    return(
        <div className={'instance__timer'}>
            { elapsed }
        </div>
    );
}

export default Timer;
