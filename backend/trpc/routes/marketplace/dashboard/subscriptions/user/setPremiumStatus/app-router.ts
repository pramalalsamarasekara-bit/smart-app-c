import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import createSubscriptionRoute from "./routes/subscription/createSubscription/route";
import setPremiumStatusRoute from "./routes/user/setPremiumStatus/route";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  subscription: createTRPCRouter({
    createSubscription: createSubscriptionRoute,
  }),
  user: createTRPCRouter({
    setPremiumStatus: setPremiumStatusRoute,
  }),
});

export type AppRouter = typeof appRouter;