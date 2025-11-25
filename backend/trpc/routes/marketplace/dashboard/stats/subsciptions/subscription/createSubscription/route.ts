import { z } from "zod";
import { publicProcedure } from "../../../create-context";

const createSubscriptionSchema = z.object({
  name: z.string(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  duration: z.enum(["monthly", "yearly"]),
  date: z.string().datetime(),
});

export default publicProcedure
  .input(createSubscriptionSchema)
  .mutation(({ input }) => {
    // In a real app, you would save this to a database
    // For now, we'll just return the subscription data with an ID
    const subscription = {
      id: `sub_${Date.now()}`,
      ...input,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    console.log("Creating subscription:", subscription);

    return {
      success: true,
      subscription,
      message: `Successfully created ${input.name} subscription for ${input.currency} ${input.amount}/${input.duration}`,
    };
  });