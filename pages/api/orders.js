import Order from "@/models/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send("sigin required");
  }

  const { user } = session;

  if (req.method === "POST") {
    await db.connect();

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    const newOrder = new Order({
      user: user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const order = await newOrder.save();

    res.status(201).send(order);
  }
}
