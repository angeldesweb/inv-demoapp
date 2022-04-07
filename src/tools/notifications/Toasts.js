import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const TopRight = new Notyf({
    duration:4000,
    position:{
        x:'right',
        y:'top'
    },
    dismissible:true
});

export const TopCenter = new Notyf({
    duration:4000,
    position:{
        x:'center',
        y:'top'
    },
    dismissible:true
});

export const TopLeft = new Notyf({
    duration:4000,
    position:{
        x:'left',
        y:'top'
    },
    dismissible:true
});

export const BottomRight = new Notyf({
    duration:4000,
    position:{
        x:'right',
        y:'bottom'
    },
    dismissible:true
});

export const BottomCenter = new Notyf({
    duration:4000,
    position:{
        x:'center',
        y:'bottom'
    },
    dismissible:true
});

export const BottomLeft = new Notyf({
    duration:4000,
    position:{
        x:'left',
        y:'bottom'
    },
    dismissible:true
});