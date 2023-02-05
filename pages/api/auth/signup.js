import bcrypt from "bcryptjs";
import db from "@/utils/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { name, email, password } = req.body;

  if (!name || !email || !email.includes("@") || !password || password.trim().length < 5) {
    return res.status(422).json({
      message: "Validation error",
    });
  }

  await db.connect();

  const userExists = await User.findOne({ email }).lean();

  console.log({ userExists });

  if (userExists) {
    await db.disconnect();
    return res.status(422).json({ message: "User already exists !" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin: false,
  });

  const user = await newUser.save();

  await db.disconnect();

  res.status(201).json({
    message: "Created user!",
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}
