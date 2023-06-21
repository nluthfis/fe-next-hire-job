import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "./job.json");
  const fileContents = fs.readFileSync(filePath, "utf8");

  // Parse the file contents to JSON
  const jobs = JSON.parse(fileContents);

  // Return the data
  res.status(200).json(jobs);
}
