import React, { Fragment, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

import { formatTime } from '../utils/time';

const Timer = ({ start, elapsed, total, onIncrement }) => {
    useEffect(() => {
        const timer = setInterval(() => {
            onIncrement(differenceInSeconds(new Date(), start));
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    return(
        <Fragment>
            <div 
                className={'instance__timer'}
                aria-label="Running count of time on this project for the current session"
            >
                { formatTime(elapsed) }
            </div>
            <p 
                className={'instance__time'}
                aria-label="Total time spent on this project"
            >
                { total }
            </p>
        </Fragment>
    );
}

export default Timer;
