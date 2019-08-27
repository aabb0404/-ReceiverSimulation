const estimate = 50;
const n = 2;
export const calculatedDistance = (rssi) => {
    const exponent = (Math.abs(rssi) - estimate) / (10 * n);
    const distance = Math.pow(10, exponent);
    return distance.toFixed(2);
};
// log10(distance)
export const calculatedRssi = (distance) => {
    const exponent = Math.log10(distance);
    const rssi = exponent * n * 10 + 50;
    // = 10 ^ ((Math.abs(rssi) - 50) / (10 * 2));
    return (rssi * -1).toFixed(2);
};
export const euclideanDistance = (point, center) => {
    const _x = Math.pow(point[0] - center[0], 2);
    const _y = Math.pow(point[1] - center[1], 2);
    const D = Math.sqrt(_x + _y);
    return D;
};
export const chooseColor = (c) => {
    // const comp = c1 - c2;
    if (c.r <= c.r1) {
        return c.color;
    } else return null;
};
