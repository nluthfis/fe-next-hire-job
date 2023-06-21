import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "./user.json");
  const fileContents = fs.readFileSync(filePath, "utf8");

  // Parse the file contents to JSON
  const users = JSON.parse(fileContents);

  // Return the data
  res.status(200).json(users);
}
