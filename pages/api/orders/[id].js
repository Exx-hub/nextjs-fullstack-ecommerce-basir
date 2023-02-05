import Order from "@/models/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send("sigin required");
  }

  const { id } = req.query;
  await db.connect();
  const order = await Order.findById(id).lean();
  await db.disconnect();

  res.status(200).send(order);
}
