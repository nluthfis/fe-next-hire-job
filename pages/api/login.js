// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const body = req.body;

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  if (!body?.email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  if (!body?.password) {
    res.status(400).json({ message: "Password is required" });
    return;
  }

  if (body?.email === "user@gmail.com" && body?.password === "user") {
    res.status(200).json({ message: "Login success", token: "123" });
  } else if (body?.email === "hr@gmail.com" && body?.password === "hr") {
    res.status(200).json({ message: "Login success", token: "456" });
  } else {
    res.status(400).json({ message: "Email / Password is incorrect" });
  }
}
