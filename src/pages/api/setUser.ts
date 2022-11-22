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
    return await createUser(req, res);
  }
  return res
    .status(405)
    .json({ message: "Method not allowed", success: false });
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const body: User = req.body;

  try {
    const newEntry = await prisma.user.create({
      data: {
        name: body.name,
        company: body.company,
        phone: body.phone,
        document: body.document,
        email: body.email,
      },
    });

    return res.status(200).json(newEntry);
  } catch (error) {
    console.log(error);
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating question", success: false });
  }
}
