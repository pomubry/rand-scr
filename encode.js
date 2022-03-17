const { readdirSync } = require("fs");
const { execSync } = require("child_process");
const { extname } = require("path");

const source = "Kantai";
const name = "Hibike! Euphonium 2";

let dir = readdirSync(".");
dir = dir.filter((file) => extname(file) === ".mkv");

let sources = dir.filter((file) => file.includes(source));

sources.forEach((file, index) => {
  let idx = index + 1;
  let ep = idx < 10 ? "0" + idx : idx;
  let filename = `${name} - ${ep}.mkv`;
  // let filenameNC = `${file.includes("OP") ? "OP01" : "ED" + ep}.mkv`;

  // if (dir.includes(filename)) {
  //   console.log("Skipping " + filename + "\n");
  //   return;
  // }

  // let command = `rename "${file}" "${filename}"`;
  let cmd = `mkvmerge.exe --ui-language en --output "./Hibike! Euphonium 2/${filename}" --no-audio --no-video --no-subtitles --no-attachments "./${file}" --language 0:ja --track-name 0:"[Judas] x265 10b" --display-dimensions 0:1920x1080 --language 1:ja --track-name 1:"[Judas] JAP Stereo (Opus 112Kbps)" --sub-charset 2:UTF-8 --language 2:en --track-name 2:English "./${dir[index]}" --track-order 1:0,1:1,1:2`;

  execSync(cmd, { stdio: "inherit" });
  // console.log(cmd + "\n");
});
