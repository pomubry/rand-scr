const { execSync } = require("child_process");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Paste all the links you want to download:\n", function (answer) {
  const cmd = `ytdl -f "bestvideo[height<=1080]+bestaudio/best" ${answer}`;
  execSync(cmd, { stdio: "inherit" });
  //   console.log(cmd);
  return rl.close();
});
