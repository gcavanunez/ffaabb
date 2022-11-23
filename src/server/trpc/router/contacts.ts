import { z } from "zod";
import { google } from "googleapis";
import { router, publicProcedure } from "../trpc";
type IInput = {
  id: number;
  name: string;
  company: string;
  phone: string;
  document: string;
  email: string;
};
import { env } from "../../../env/server.mjs";
import { TRPCError } from "@trpc/server";

const createInSheets = async (body: IInput) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: env.GOOGLE_CLIENT_EMAIL,
        private_key: env.GOOGLE_SERVICE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: env.SPREADSHEET_ID,
      range: "A1:G1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.name,
            body.company,
            body.phone,
            body.document,
            body.email,
            new Date(),
            body.id,
          ],
        ],
      },
    });

    return true;
  } catch (e: any) {
    console.log(e);
    return false;
  }
};

export const contactsRouter = router({
  getContact: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { id: Number(input.id) },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No post with id '${input.id}'`,
        });
      }
      return user;
    }),
  saveContact: publicProcedure
    .input(
      z
        .object({
          name: z.string(),
          company: z.string(),
          phone: z.string(),
          document: z.string(),
          email: z.string(),
        })
        .nullish()
    )
    .mutation(async ({ ctx, input }) => {
      if (!input) {
        return { res: "needs fields", success: false };
      }
      try {
        const newEntry = await ctx.prisma.user.create({
          data: {
            name: input.name,
            company: input.company,
            phone: input.phone,
            document: input.document,
            email: input.email,
          },
        });
        await createInSheets({ ...input, id: newEntry.id });
        // aqui puedes ahcer lo que haces tambien en api/submit
        return { res: newEntry, success: true };
      } catch (error) {
        console.log(error);
        console.error("Request error", error);
        return { res: "Something went wrong", success: false };
      }
    }),
});
