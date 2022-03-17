// Adds space between the track number and the title of mp3 files.
// e.g. 01.SongTitle -> 01. SongTitle
const {execSync} = require('child_process');
const {readdirSync} = require('fs');

let dir = readdirSync('.');
dir = dir.filter(file=>file.includes('.mp3'));

dir.forEach(file=>{
    let newName = file.split('');
    newName.splice(3,0,' ');
    newName = newName.join('')
    let str = `rename "${file}" "${newName}"`
    execSync(str)
})