import chalk from "chalk";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  console.clear();

  console.log(
    chalk.bgMagenta.white.bold(" 💀 DEVIL TERMINAL ACTIVATED ☠️ ")
  );

  const steps = [
    "💀 Deleting bugs... (just kidding, they multiply💀 ☠️ 💀 ☠️ 💀 ☠️ 💀 ☠️ 💀 ☠️)",
    "|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|",
    "🤡 🤡 🤡 🤡 🤡 🤡 🤡 🤡 🤡🐛 Found 9999 bugs... ignoring... ",
    "|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|",
    "🍕 Ordering pizza instead of fixing code...",
    "|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|",
    "🤖 Asking AI for help...",
    "|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|",
    "😎 Pretending everything works...",
    "|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|/|",
    "🔥 Somehow it works!!!"
  ];

  for (let step of steps) {
    console.log(chalk.hex("#2afc05")(step));
    await sleep(50);
  }

  console.log(chalk.green.bold("\n✅ React app survived 😄\n"));
}

run();