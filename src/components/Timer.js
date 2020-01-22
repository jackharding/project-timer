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
            <time
                className={'instance__timer'}
                aria-label="Running count of time on this project for the current session"
            >
                { formatTime(elapsed) }
            </time>
            <time
                className={'instance__time'}
                aria-label="Total time spent on this project"
            >
                { total }
            </time>
        </Fragment>
    );
}

export default Timer;
