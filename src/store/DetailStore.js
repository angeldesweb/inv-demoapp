import { writable } from 'svelte/store';

export const RouterStore = () => {
    const { subscribe , set } = writable('home');

    return {
        subscribe,
        navigateTo: v => set(v)
    }
}

let values = {
    sell:null,
    outbound:null,
    inbound:null
}

export const DetailStore = () => {
    const { subscribe , update } = writable(values);

    return {
        subscribe,
        setInbound: v => update(r => (r = {...r,inbound:v})),
        setOutBound: v => update(r => (r = {...r,outbound:v})),
        setSell: v => update(r => (r = {...r,sell:v}))
    }
}