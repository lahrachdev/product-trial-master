const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "schema.prisma");
const modelsDir = path.join(__dirname, "models");

// Read base schema (without models)
let schemaContent = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}\n\n`;

// Read all model files and append their content
fs.readdirSync(modelsDir).forEach((file) => {
  const modelPath = path.join(modelsDir, file);
  schemaContent += fs.readFileSync(modelPath, "utf8") + "\n\n";
});

// Write the merged schema
fs.writeFileSync(schemaPath, schemaContent);

console.log("✅ Prisma schema merged successfully.");
