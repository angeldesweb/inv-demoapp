import { writable } from 'svelte/store';

export const RouterStore = () => {
    const { subscribe , set } = writable('home');

    return {
        subscribe,
        navigateTo: v => set(v)
    }
}

let values = {
    register:'material',
    search:'materials',
    detail:'inbound'
}

export const ViewStore = () => {
    const { subscribe , update } = writable(values);

    return {
        subscribe,
        activeRegister: v => update(r => (r = {...r,register:v})),
        activeSearch: v => update(r => (r = {...r,search:v})),
        currentDetail: v => update(r => (r = {...r,detail:v}))
    }
}