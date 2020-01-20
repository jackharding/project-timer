import { differenceInDays, parseISO } from 'date-fns';
import uuid from 'uuid';

import { storageKey } from '../config/settings';

export const createInstance = (data = {}) => {
    const { input, seconds } = data;

    return {
        id: uuid(),
        title: input || '',
        seconds: seconds ? Number(seconds) : 0,
        sessions: [{
            start: new Date(),
            end: seconds ? new Date() : null
        }],
    }
}

export const loadInstances = () => {
    let savedInstances = window.localStorage.getItem(storageKey);

    return savedInstances ? JSON.parse(savedInstances) : null;
}

export const saveInstances = (data) => {
    window.localStorage.setItem(storageKey, JSON.stringify(data));
}