import { router } from "../trpc";
import { contactsRouter } from "./contacts";

export const appRouter = router({
  contacts: contactsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
