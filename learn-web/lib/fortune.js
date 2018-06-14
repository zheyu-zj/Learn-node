let forTunes = [
    'red',
    'green',
    'black',
    'white',
    'pink',
    'orange',
    'yellow'
];
exports.getTunes = () => (forTunes[Math.floor(Math.random() * forTunes.length)]);