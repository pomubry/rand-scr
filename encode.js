const { readdirSync } = require("fs");
const { execSync } = require("child_process");
const { extname } = require("path");

const source = "S02";
const name =
  "Kaguya-sama wa Kokurasetai? Tensai-tachi no Renai Zunousen Season 2";

let dir = readdirSync(".");
dir = dir.filter((file) => extname(file) === ".mkv");

let sources = dir.filter((file) => file.includes(source));

sources.forEach((file, index) => {
  let idx = index + 1;
  let ep = idx < 10 ? "0" + idx : idx;
  let filename = `${name} - ${ep}.mkv`;

  // Uncomment below if folder contains OP/ED
  // let filenameNC = `${file.includes("OP") ? "OP01" : "ED" + ep}.mkv`;

  if (dir.includes(filename)) {
    console.log("Skipping " + filename + "\n");
    return;
  }

  // let cmd = `mkvmerge --ui-language en --output "./Hibike! Euphonium 2/${filename}" --no-audio --no-video --no-subtitles --no-attachments "./${file}" --language 0:ja --track-name 0:"[Judas] x265 10b" --display-dimensions 0:1920x1080 --language 1:ja --track-name 1:"[Judas] JAP Stereo (Opus 112Kbps)" --sub-charset 2:UTF-8 --language 2:en --track-name 2:English "./${dir[index]}" --track-order 1:0,1:1,1:2`;

  let cmd = `mkvmerge --priority lower --output '/home/pdrome/Downloads/Kaguya-sama Love is War S01-S02 1080p Dual Audio BDRip 10 bits DD x265-EMBER/Kaguya-sama Love is War S02 1080p Dual Audio BDRip 10 bits AAC x265-EMBER/${filename}' --audio-tracks 1 --subtitle-tracks 4 --language 0:und --track-name '0:Presented By EMBER' --display-dimensions 0:1920x1080 --language 1:ja --sub-charset 4:UTF-8 --language 4:en --track-name 4:Dialogue@GJM './${dir[index]}' --track-order 0:0,0:1,0:4`;

  console.log("\n" + cmd + "\n");
  // execSync(cmd, { stdio: "inherit" });
});
