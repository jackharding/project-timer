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
            <div className={'instance__timer'}>
                { formatTime(elapsed) }
            </div>
            <p className={'instance__time'}>
                { total }
            </p>
        </Fragment>
    );
}

export default Timer;
