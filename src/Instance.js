import React, { Fragment, useState, useEffect, useRef } from 'react';
import SVG from 'react-svg';
import { Input } from 'antd';

import Timer from './Timer';

const Instance = ({ title, time, on, sessions, onTitleChange, onStart, onStop, onRemove, onCopy }) => {

    const formatTime = (input, includeSeconds = true) => {
        let cutoff = includeSeconds ? 8 : 5;

        return new Date(input * 1000).toISOString().substr(11, cutoff);
    }

    let [elapsed, setElapsed] = useState(0);

    let $input = useRef(null);

    let formattedTime = formatTime(time),
        formattedElapsed = formatTime(elapsed);

    useEffect(() => {
        if($input) {
            $input.current.focus();
        }
    }, [$input]);

    useEffect(() => {
        setElapsed(0);
    }, [on]);
    // let [editing, setEditing] = useState(true);


    // const handleKeyDown = ({ code }) => {
    //     if(code === 'Enter') {
    //
    //     }
    // }
    //
    // useEffect(() => {
    //     if($input) {
    //         window.addEventListener('keydown', handleKeyDown);
    //     }
    // }, [$input]);

    return(
        <div className={`instance ${on ? 'instance--on' : ''}`}>
            { on ? (
                <Timer
                    start={sessions[0].start}
                    elapsed={formattedElapsed}
                    onIncrement={time => setElapsed(time)}
                />
            ) : null }

            <p className={'instance__time'}>{ formattedTime }</p>

            <form onSubmit={e => {
                e.preventDefault();

                onTitleChange($input.current.input.value);
                $input.current.blur();
            }}>
                <Input
                    size={'large'}
                    placeholder={'What are we tracking?'}
                    defaultValue={title}
                    ref={$input}
                    style={{
                        width: '280px',
                        maxWidth: '100%'
                    }}
                />
            </form>

            <button
                onClick={() => {
                    if(on) {
                        onStop(elapsed)
                    } else {
                        onStart();
                    }
                }}
                className={'instance__ctrl'}
            >
                <SVG src={`/icons/${on ? 'pause' : 'play'}-circle.svg`} />
            </button>

            <button
                onClick={() => onCopy(`/time ${formatTime(time)} on ${title}`)}
                className={'instance__ctrl'}
            >
                <SVG src={`/icons/svgs/regular/copy.svg`} />
            </button>

            <button
                onClick={onRemove}
                className={'instance__ctrl'}
            >
                <SVG src={`/icons/svgs/regular/times-circle.svg`} />
            </button>
        </div>
    );
}

export default Instance;
