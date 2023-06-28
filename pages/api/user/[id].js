// import { getSession } from "next-auth/client";
// import { updateUser } from "../../lib/db";

// export default async function handler(req, res) {
//   const session = await getSession({ req });

//   if (req.method === "PUT") {
//     if (!session) {
//       res.status(401).json({ message: "Not authenticated" });
//       return;
//     }

//     const { fullname, company, job_title, phone, description, domicile } =
//       req.body;
//     const userId = req.query.id;

//     if (session.user.id !== userId) {
//       res.status(403).json({ message: "You can only edit your own profile" });
//       return;
//     }

//     // Validate data...

//     try {
//       await updateUser(userId, {
//         fullname,
//         company,
//         job_title,
//         phone,
//         description,
//         domicile,
//       });
//       res.status(200).json({ message: "User updated successfully" });
//     } catch (error) {
//       res.status(500).json({ message: "Error updating user" });
//     }
//   } else {
//     res.setHeader("Allow", ["PUT"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
