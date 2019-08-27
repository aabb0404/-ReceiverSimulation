import L from 'leaflet';
import {euclideanDistance} from './util';
import {MouseData} from './data';

let map = L.map('mapId', {
    crs: L.CRS.Simple,
    doubleClickZoom: false,
    dragging: false,
});
let bounds = [[[0, 0], [20, 20]]];
L.imageOverlay('whiteBack.png', bounds).addTo(map);
let circleData = {
    x: 0,
    y: 0,
};

let drawRadius = [];
let pushMouseData = [];
let receiver = {};
let nowReceiver = {};
let removeControl;
let removes = [];
map.on('mousedown', function(event) {
    drawRadius.push([event.latlng.lat, event.latlng.lng]);
    map.on('mousemove', function(ev) {
        drawRadius.push([ev.latlng.lat, ev.latlng.lng]);
        let polyline = L.polyline(drawRadius);
        polyline.addTo(map);
    });
});
map.on('mouseup', function(ev) {
    map.off('mousemove');
    circleData.r = euclideanDistance(
        drawRadius[drawRadius.length - 1],
        drawRadius[0]
    );
    circleData.x = drawRadius[0][0];
    circleData.y = drawRadius[0][1];
    drawRadius = [];
    nowReceiver.data = MouseData(circleData);
    pushMouseData.push(nowReceiver.data);
    console.log('no' + pushMouseData.length);
    receiver.data = pushMouseData;
    for (let y = 0; y <= 20; y = y + 0.5) {
        for (let x = 0; x <= 20; x = x + 0.5) {
            let receiverDistanceSmall = [];
            let receiverColor = {};
            for (let i = 0; i <= receiver.data.length - 1; i++) {
                let distance = euclideanDistance(
                    [x, y],
                    [receiver.data[i].x, receiver.data[i].y]
                );
                receiverDistanceSmall.push(distance);
                receiverColor = Comparison(
                    receiverDistanceSmall,
                    distance,
                    i,
                    receiverColor
                );
            }
            let drawPoint = {
                x: x,
                y: y,
                fillOpacity: 1,
                r: 0.2,
            };
            if (receiverColor.r <= receiverColor.r1) {
                drawPoint.color = receiverColor.color;
                draw(drawPoint);
            } else {
                drawPoint.color = 'white';
                draw(drawPoint);
            }
        }
    }

    removeControl = draw(nowReceiver.data); // draw receiver circle
    removes.push(removeControl);

    for (let i = 0; i <= receiver.data.length - 1; i++) {
        let drawPoint = {
            x: receiver.data[i].x,
            y: receiver.data[i].y,
            color: 'black',
            fillOpacity: 1,
            r: 0.2,
            rssi: receiver.data[i].rssi,
        };
        drawData(drawPoint);
    }
});
export const Comparison = (
    receiverDistanceSmall,
    distance,
    i,
    receiverColor
) => {
    if (receiverDistanceSmall[0] >= receiverDistanceSmall[i]) {
        receiverDistanceSmall[0] = distance;
        receiverColor.color = receiver.data[i].color;
        receiverColor.r = distance;
        receiverColor.r1 = receiver.data[i].r;
    }
    return receiverColor;
};

export const draw = (r1) => {
    let clickCircle = L.circle([r1.x, r1.y], {
        color: r1.color, // 描邊色
        fillOpacity: r1.fillOpacity, // 透明度
        radius: r1.r, // 半徑，單位米
    }).addTo(map);
    return clickCircle;
};
export const drawData = (r1) => {
    L.circle([r1.x, r1.y], {
        color: r1.color, // 描邊色
        fillOpacity: r1.fillOpacity, // 透明度
        radius: r1.r, // 半徑，單位米
    })
        .addTo(map)
        .bindPopup(
            'x:' +
                r1.x.toFixed(2) +
                '\n' +
                'y:' +
                r1.y.toFixed(2) +
                '\n' +
                'Filter:' +
                r1.rssi +
                '\n'
        )
        .on('mouseover', function(ev) {
            let check = 0;
            let ans = {
                x: ev.latlng.lat,
                y: ev.latlng.lng,
            };
            for (let i = 0; i < removes.length; i++) {
                let r = re(ans, removes[i]);
                if (r) {
                    check = i;
                }
            }
            map.removeLayer(removes[check]);
            removes.splice(check, 1);
            pushMouseData.splice(check, 1);
            console.log('splice' + pushMouseData.length);
            for (let y = 0; y <= 20; y = y + 0.5) {
                for (let x = 0; x <= 20; x = x + 0.5) {
                    let receiverDistanceSmall = [];
                    let receiverColor = {};
                    for (let i = 0; i <= receiver.data.length - 1; i++) {
                        let distance = euclideanDistance(
                            [x, y],
                            [receiver.data[i].x, receiver.data[i].y]
                        );
                        receiverDistanceSmall.push(distance);
                        receiverColor = Comparison(
                            receiverDistanceSmall,
                            distance,
                            i,
                            receiverColor
                        );
                    }
                    let drawPoint = {
                        x: x,
                        y: y,
                        fillOpacity: 1,
                        r: 0.2,
                    };
                    if (receiverColor.r <= receiverColor.r1) {
                        drawPoint.color = receiverColor.color;
                        draw(drawPoint);
                    } else {
                        drawPoint.color = 'white';
                        draw(drawPoint);
                    }
                }
            }
        });
};

export const re = (ans, removeControl) => {
    if (
        ans.x == removeControl._latlng.lat &&
        ans.y == removeControl._latlng.lng
    ) {
        return true;
    }
};
map.fitBounds(bounds);
