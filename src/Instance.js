import React, { Fragment, useState, useEffect, useRef } from 'react';
import SVG from 'react-svg';
import { Input } from 'antd';

import Timer from './Timer';

const Instance = ({ title, time, on, sessions, onTitleChange, onStart, onStop, onRemove, onCopy }) => {

    const formatTime = (input, includeSeconds = true) => {
        let cutoff = includeSeconds ? 8 : 5;

        return new Date(input * 1000).toISOString().substr(11, cutoff);
    }

    console.log('time', time)

    let [elapsed, setElapsed] = useState(0);

    let $input = useRef(null);

    const formattedElapsed = formatTime(elapsed);
    const formattedTotal = formatTime(elapsed + time);

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
                    total={formattedTotal}
                    onIncrement={time => setElapsed(time)}
                />
            ) : (
                <p className={'instance__time'}>{ formattedTotal }</p>
            ) }

            <form onSubmit={e => {
                e.preventDefault();

                $input.current.blur();
            }}>
                <Input
                    size={'large'}
                    placeholder={'What are we tracking?'}
                    onChange={e => onTitleChange(e.target.value)}
                    value={title}
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
