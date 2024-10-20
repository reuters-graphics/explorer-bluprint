console.log("SAMPLE SCRAPER SCRIPT");

console.log('Will wait till you type "done" to exit');

// wait for user to input "done" and then exit
process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", function (text) {
  text = text.trim();
  if (!text) return;

  if (text === "done") {
    done();
  } else {
    console.log('Please type "done" to exit. You typed: ' + text);
  }
});

function done() {
  console.log("Exiting scraper...");
  console.log("Exited");
  process.exit();
}
