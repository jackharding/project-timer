import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Beforeunload } from 'react-beforeunload';
import SVG from 'react-svg';
import { Input } from 'antd';

import { formatTime } from '../utils/time';

import Timer from './Timer';
import TimeInput from './TimeInput';

const Instance = ({ instance: { title, id, seconds, sessions }, on, onTitleChange, onTimeChange, onStart, onStop, onRemove, onSubmit }) => {

    const [elapsed, setElapsed] = useState(0);

    const $input = useRef(null);

    const formattedTotal = formatTime(elapsed + seconds);

    useEffect(() => {
        if($input.current && on && !title) {
            $input.current.focus();
        }
    }, [$input]);

    useEffect(() => {
        setElapsed(0);
    }, [on]);

    return(
        <div className={`instance ${on ? 'instance--on' : ''}`}>
            { on ? (
                <Fragment>
                    <Timer
                        start={sessions[0].start}
                        elapsed={elapsed}
                        total={formattedTotal}
                        onIncrement={seconds => setElapsed(seconds)}
                    />

                    <Beforeunload
                        onBeforeunload={e => {
                            e.preventDefault();

                            onStop(elapsed);
                        }}
                    />
                </Fragment>
            ) : (
                <TimeInput
                    value={elapsed + seconds}
                    onSaveTime={time => onTimeChange(time)}
                />
            ) }

            <form onSubmit={e => {
                e.preventDefault();

                $input.current.blur();
            }}>
                <Input
                    value={title}
                    placeholder={'What are we tracking?'}
                    aria-label={'Project title'}
                    ref={$input}
                    onChange={(e) => onTitleChange(e.target.value)}
                />
            </form>

            <button
                onClick={() => {
                    if(on) {
                        onStop(elapsed);
                    } else {
                        onStart();
                    }
                }}
                className={'instance__ctrl'}
                aria-label={`${on ? 'Stop' : 'Resume'} timer`}
            >
                <SVG src={`/icons/${on ? 'pause' : 'play'}-circle.svg`} />
            </button>

            <button
                onClick={onRemove}
                className={'instance__ctrl'}
                aria-label="Remove timer"
            >
                <SVG src={`/icons/svgs/regular/times-circle.svg`} />
            </button>
        </div>
    );
}

export default Instance;