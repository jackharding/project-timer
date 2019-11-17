import React, { useEffect, useState, useMemo, useCallback, Fragment } from 'react';
import { differenceInSeconds } from 'date-fns';
import SVG from 'react-svg';
import uuid from 'uuid/v4';
import { Button } from 'antd';
import 'antd/dist/antd.css';

import './App.css';

import Instance from './Instance';
import Timer from './Timer';

const createInstance = () => ({
    id: uuid(),
    title: '',
    time: 0,
    sessions: [{
        start: new Date(),
    }],
});

const storageKey = 'project-timers';

const firstInstance = createInstance();

let savedInstances = localStorage.getItem('project-timers');
savedInstances = savedInstances && JSON.parse(savedInstances);

const App = () => {

    let [active, setActive] = useState(savedInstances ? null : firstInstance.id);

    let [instances, setInstances] = useState(savedInstances ? savedInstances : [firstInstance]);

    let [updated, setUpdated] = useState(null);

    const saveInstances = () => {
        // setActive(null);
        //TODO: Need to trigger updating instances in state from here
        localStorage.setItem(storageKey, JSON.stringify(instances));
    }

    useEffect(() => {

        // window.addEventListener('beforeunload', saveInstances);

        // return () => {
        //     saveInstances();
        //     window.removeEventListener('beforeunload', saveInstances);
        // }
    }, []);

    useEffect(() => {
        if(!updated) return;

        saveInstances();
    }, [updated]);

    // console.log(active, instances)
    const activeInstance = active ? instances.find(({ id }) => id === active) : {};

    return (
        <div className="App">
            {/*<button className={'add-new'}>*/}
                {/*<span>Add new instance</span>*/}
                {/*<SVG src={'/icons/plus-circle.svg'} />*/}
            {/*</button>*/}

            { active ? (
                <Instance
                    title={activeInstance.title}
                    sessions={activeInstance.sessions}
                    time={activeInstance.time}
                    on={true}
                    onTitleChange={title => {
                        setInstances(instances.map(ins => {
                            if(active !== ins.id) return ins;

                            return {
                                ...ins,
                                title,
                            }
                        }));

                        setUpdated(new Date());
                    }}
                    onStop={(elapsed) => {
                        setInstances(instances.map(ins => {
                            if(ins.id !== active) return ins;

                            let sessions = [...ins.sessions];
                            sessions[0].end = new Date();

                            return {
                                ...ins,
                                time: ins.time + elapsed,
                                sessions,
                            }
                        }));

                        setActive(null);
                        setUpdated(new Date());
                    }}
                />
            ) : null }

            <div className="instances">
                <div className="instances__ctrls">
                    { !active ? (
                        <Button
                            type={'primary'}
                            icon={'plus'}
                            onClick={() => {
                                const newInstance = createInstance();
                                const newInstances = [newInstance, ...instances];

                                setInstances(newInstances);
                                setActive(newInstance.id);
                            }}
                        >Add new timer</Button>
                    ) : null }
                </div>

                <div className="instances__list">
                    { instances
                        .filter(({ id }) => id !== active)
                        .map((instance) => (
                            <Instance
                                title={instance.title}
                                sessions={instance.sessions}
                                time={instance.time}
                                on={active === instance.id}
                                onTitleChange={title => {
                                    setInstances(instances.map(ins => {
                                        if(instance.id !== ins.id) return ins;

                                        return {
                                            ...ins,
                                            title,
                                        }
                                    }));
                                }}
                                onStart={() => {
                                    setInstances(instances.map(ins => {
                                        if(instance.id !== ins.id) return ins;

                                        let sessions = [...ins.sessions];
                                        sessions.unshift({
                                            start: new Date(),
                                        });

                                        return {
                                            ...ins,
                                            sessions,
                                        }
                                    }));

                                    setActive(instance.id);
                                }}
                                key={`timer-${instance.id}`}
                            />
                        )
                    ) }
                </div>
            </div>

            {/*<Instance*/}
                {/*title={'Some project'}*/}
                {/*time={'2:20'}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
