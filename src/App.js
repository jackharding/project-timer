import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

import './scss/index.scss';

import { saveInstances, createInstance, loadInstances } from './utils/instances';

import Instance from './components/Instance';

const App = () => {

    const [active, setActive] = useState(null);
    const [instances, setInstances] = useState([]);

    const updateInstances = (data) => {
        setInstances(data);
        saveInstances(data);
    }

    const handleTitleChange = (title, instance) => {
        updateInstances(instances.map(ins => {
            if(instance.id !== ins.id) return ins;

            return {
                ...ins,
                title,
            }
        }));
    }

    useEffect(() => {
        const savedInstances = loadInstances();
        const firstInstance = createInstance();

        const hasInstances = savedInstances && !!savedInstances.length;

        setActive(hasInstances ? null : firstInstance.id);
        setInstances(hasInstances ? savedInstances : [firstInstance]);
    }, []);

    const activeInstance = active ? instances.find(({ id }) => id === active) : {};

    return(
        <div className="App">
            { active ? (
                <Instance
                    instance={activeInstance}
                    on={true}
                    onTitleChange={title => handleTitleChange(title, activeInstance)}
                    onStop={elapsed => {
                        updateInstances(instances.map(ins => {
                            if(ins.id !== active) return ins;

                            let sessions = [...ins.sessions];
                            sessions[0].end = new Date();

                            return {
                                ...ins,
                                seconds: ins.seconds + elapsed,
                                sessions,
                            }
                        }));

                        setActive(null);
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

                                updateInstances(newInstances);
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
                                instance={instance}
                                key={`timer-${instance.id}`}
                                onTitleChange={title => handleTitleChange(title, instance)}
                                onTimeChange={seconds => {
                                    updateInstances(instances.map(ins => {
                                        if(ins.id !== instance.id) return ins;

                                        return {
                                            ...ins,
                                            seconds,
                                        }
                                    }));
                                }}
                                onStart={() => {
                                    updateInstances(instances.map(ins => {
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
                                onRemove={() => {
                                    if(window.confirm('Are you sure you want to remove this?')) {
                                        updateInstances(instances.filter(ins => ins.id !== instance.id));
                                    }
                                }}
                            />
                        )) }
                </div>
            </div>
        </div>
    );
}

export default App;