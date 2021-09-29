const express = require('express')
const server = express();
 
server.all('/', (req, res) => {
    res.send('<h1>im on now thx:D</h1>');
});
 
module.exports = () => {
    server.listen(3000, () => {
        console.log('Server up.');
    });
    return true;
}