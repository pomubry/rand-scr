const { readdirSync } = require("fs");
const { exec } = require("child_process");

function isVideoFile(file) {
  const supportedExtensions = [
    "webm",
    "mkv",
    "flv",
    "avi",
    "MTS",
    "M2TS",
    "TS",
    "ts",
    "mov",
    "qt",
    "wmv",
    "amv",
    "mp4",
    "m4p",
    "m4v",
    "mpg",
    "mp2",
    "mpeg",
    "mpe",
    "mpv",
    "m2v",
    "svi",
    "3gp",
    "3g2",
  ];
  const extensionIndex = file.lastIndexOf(".");
  if (extensionIndex === -1) return false;
  const extensionName = file.slice(extensionIndex + 1);
  const extensionError = supportedExtensions.indexOf(extensionName);
  return extensionError !== -1;
}

function shuffleArray(array) {
  let copy = array;
  for (var i = copy.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

let errors = [];

let videos = readdirSync(".").filter((file) => {
  let isVideo = isVideoFile(file);
  if (isVideo) {
    return true;
  } else {
    errors.push(file);
    return false;
  }
});

let str = "mpv.exe";

shuffleArray(videos).forEach((vid) => (str += ` "${vid}"`));

exec(str);

console.log("You can close this window safely. . .");
if (errors.length > 1) {
  console.log(`The following won't be played:`);
  console.log(errors);
} else {
  setTimeout(() => {
    process.exit();
  }, 1000);
}
