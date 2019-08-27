import {calculatedDistance, calculatedRssi} from './util';
const receiver = {};
const p = [];

export const getRandomColor = () => {
    return (
        '#' +
        (function(h) {
            return new Array(7 - h.length).join('0') + h;
        })(((Math.random() * 0x1000000) << 0).toString(16))
    );
};

function getRandom(x) {
    return Math.floor(Math.random() * x) + 1;
}
function getRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const getData = () => {
    for (let i = 0; i <= 10; i++) {
        const r1 = {
            x: getRandom(15),
            y: getRandom(15),
            color: getRandomColor(),
            fillOpacity: 0,
            filter: getRandomRange(50, 60),
        };
        r1.r = calculatedDistance(r1.filter);
        p.push(r1);
    }
    receiver.data = p;
    return receiver;
};
export const MouseData = (mouse) => {
    const r1 = {
        x: mouse.x,
        y: mouse.y,
        color: getRandomColor(),
        fillOpacity: 0,
        r: mouse.r,
        scale: 1,
        // filter: getRandomRange(50, 60),
    };
    r1.rssi = calculatedRssi(r1.r);

    return r1;
};
