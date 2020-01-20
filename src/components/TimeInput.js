import React, { useEffect, useState, useRef } from 'react';
import TimeField from 'react-simple-timefield';

import { formatTime, convertFormattedTimeToSeconds } from '../utils/time';

const TimeInput = (props) => {
    const [value, setValue] = useState(formatTime(props.value));

    const $input = useRef(null);

    useEffect(() => {
        if(props.value !== convertFormattedTimeToSeconds(value)) {
            setValue(formatTime(props.value));
        }
    }, [props.value]);

    return(
        <TimeField
            value={value}
            onChange={(e, v) => {
                setValue(v);
            }}
            input={
                <input
                    className={'instance__time-input'}
                    aria-label="Edit the time directly"
                    disabled={props.disabled}
                    onBlur={() => {
                        setValue(formatTime(props.value));
                    }}
                    onKeyDown={(e) => {
                        e.persist();
                        if(e.key === 'Enter') {
                            props.onSaveTime(convertFormattedTimeToSeconds(value));
                            $input.current.blur();
                        }
                    }}
                    ref={$input}
                />
            }
            showSeconds
        />
    );
}

export default TimeInput;