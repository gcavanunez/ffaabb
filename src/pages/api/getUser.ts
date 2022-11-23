import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type User = {
  name: string;
  company: string;
  phone: string;
  document: string;
  email: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.body.id);

    return await getUser(req, res);
  }
  return res
    .status(405)
    .json({ message: "Method not allowed", success: false });
}

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await prisma.user.findFirst({
      where: { id: req.body.id },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating question", success: false });
  }
}
