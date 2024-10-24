import fs from 'fs';
import { exec } from 'child_process';

// Helper function to execute shell commands
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`, stderr);
        reject(error);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
};

// 1. Initialize Husky
const initializeHusky = async () => {
  await runCommand("npx husky install");
  await runCommand("npx husky add .husky/pre-commit \"npm run format && npm run test\"");
  await runCommand("npx husky add .husky/pre-push \"npm run check\"");
  console.log("Husky initialized with pre-commit and pre-push hooks.");
};

// 2. Create tests directory
const createTestsDirectory = async () => {
  if (!fs.existsSync("./tests")) {
    fs.mkdirSync("./tests");
    console.log("tests directory created.");
  } else {
    console.log("tests directory already exists.");
  }
};

// Main function to run all setup tasks
const setup = async () => {
  try {
    console.log("Setting up project...");
    await initializeHusky();
    await createTestsDirectory();
    console.log("Project setup completed successfully.");
  } catch (error) {
    console.error("Error during setup:", error);
  }
};

setup();