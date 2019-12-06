import React, { useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

const Timer = ({ start, elapsed, total, onIncrement }) => {
    useEffect(() => {
        const timer = setInterval(() => {
            onIncrement(differenceInSeconds(new Date(), start));
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    // TODO: Check dis
    return(
        <>
            <div className={'instance__timer'}>
                { elapsed }
            </div>
            <p className={'instance__time'}>
                { total }
            </p>
        </>
    );
}

export default Timer;
