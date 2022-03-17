const fs = require("fs");
const { extname } = require("path");
const { execSync } = require("child_process");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const endTrigger = () => {
  rl.question("\nPress any key to continue. . .", function () {
    return rl.close();
  });
};

rl.question(
  "Write the string common to all videos to concatenate:\n",
  function (answer) {
    if (answer === "") return endTrigger();

    let dir = fs.readdirSync(".");
    dir = dir.filter((file) => file.includes(answer));
    if (dir.length === 0) return endTrigger();

    const outputFile = `${answer}${extname(dir[0])}`;
    if (fs.readdirSync(".").includes(outputFile)) {
      // Check first if the output filename already exists. Delete if it does.
      console.log(
        `\nThe file [\x1b[94m${outputFile}\x1b[0m] already exists. Remove it first.`
      );
      return endTrigger();
    }

    const sortAlphaNum = (a, b) => a.localeCompare(b, "en", { numeric: true });
    dir.sort(sortAlphaNum);

    let myList = "";
    dir.forEach(
      (file, index) => (myList += `${index !== 0 ? "\n" : ""}file '${file}'`)
    );
    fs.writeFileSync("mylist.txt", myList);
    console.log("\nmylist.txt has been created temporarily. . .");

    console.log("\nMerging video segments. . .");
    execSync(
      `ffmpeg -v warning -f concat -safe 0 -i mylist.txt -c copy "${outputFile}"`,
      { stdio: "inherit" }
    );
    console.log(`\n\x1b[32m${outputFile}\x1b[0m has been created.`);

    // Remove mylist.txt.
    console.log("\nRemoving mylist.txt. . .");
    fs.unlinkSync("mylist.txt");

    console.log("\n\x1b[32mVideos have been merged!\x1b[0m");
    return endTrigger();
  }
);
