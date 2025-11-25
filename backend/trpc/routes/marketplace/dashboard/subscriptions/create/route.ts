import { z } from 'zod';
import { publicProcedure, type Context } from '../../../../create-context';

const createSubscriptionSchema = z.object({
  planId: z.string(),
  planName: z.string(),
  price: z.number().positive(),
  duration: z.string(),
  paymentMethod: z.object({
    type: z.enum(['card', 'paypal']),
    cardDetails: z.object({
      number: z.string(),
      expiry: z.string(),
      cvv: z.string(),
      name: z.string(),
    }).optional(),
  }),
});

export const createSubscriptionProcedure = publicProcedure
  .input(createSubscriptionSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof createSubscriptionSchema>; ctx: Context }) => {
    // In a real app, this would process payment and create subscription
    const subscription = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'anonymous',
      planId: input.planId,
      planName: input.planName,
      price: input.price,
      duration: input.duration,
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: true,
      createdAt: new Date().toISOString(),
    };

    console.log('Creating subscription:', subscription);

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate payment failure occasionally for testing
    if (Math.random() < 0.1) {
      throw new Error('Payment processing failed. Please check your payment details.');
    }

    return {
      success: true,
      subscription,
      message: 'Subscription created successfully',
    };
  });