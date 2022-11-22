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
const createInSheets = async (body: IInput) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        private_key:
          process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY?.replace(
            /\\n/g,
            "\n"
          ),
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
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
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
    return false;
  }
};

export const contactsRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
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
      // return ctx.prisma.example.findMany();
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
        createInSheets({ ...input, id: newEntry.id });
        // aqui puedes ahcer lo que haces tambien en api/submit
        return { res: newEntry, success: true };
      } catch (error) {
        console.log(error);
        console.error("Request error", error);
        return { res: "Something went wrong", success: false };
      }
    }),
});
