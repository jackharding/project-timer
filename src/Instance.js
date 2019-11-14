import React, { Fragment, useState, useEffect, useRef } from 'react';
import SVG from 'react-svg';
import { Input } from 'antd';

import Timer from './Timer';

const Instance = ({ title, time, on, sessions, onTitleChange, onStart, onStop }) => {

    let [elapsed, setElapsed] = useState(0);

    let $input = useRef(null);

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
                    elapsed={elapsed}
                    onIncrement={time => setElapsed(time)}
                />
            ) : null }

            <p className={'instance__time'}>{ time }</p>

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
                        width: '320px',
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
        </div>
    );
}

export default Instance;
