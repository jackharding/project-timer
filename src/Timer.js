import React, { Fragment, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

const Timer = React.forwardRef(({ start, elapsed, total, onIncrement }, ref) => {
    
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
                ref={ref}
            >
                { elapsed }
            </div>
            <p className={'instance__time'}>
                { total }
            </p>
        </Fragment>
    );
});

export default Timer;