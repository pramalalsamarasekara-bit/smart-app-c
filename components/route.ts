import { z } from 'zod';
import { publicProcedure, type Context } from '../../../../create-context';

const getDashboardStatsSchema = z.object({
  period: z.enum(['week', 'month', 'year']).default('month'),
});

export const getDashboardStatsProcedure = publicProcedure
  .input(getDashboardStatsSchema)
  .query(async ({ input, ctx }: { input: z.infer<typeof getDashboardStatsSchema>; ctx: Context }) => {
    // In a real app, this would fetch from database
    const mockStats = {
      totalProducts: 24,
      totalSales: 156,
      totalRevenue: 12450,
      totalViews: 8920,
      averageRating: 4.7,
      activeListings: 18,
      recentActivity: [
        {
          id: '1',
          type: 'sale' as const,
          title: 'iPhone 15 Pro Max sold',
          description: 'Sold to John D.',
          time: '2 hours ago',
          amount: 1199,
        },
        {
          id: '2',
          type: 'message' as const,
          title: 'New message',
          description: 'Customer inquiry about Samsung Watch',
          time: '4 hours ago',
        },
        {
          id: '3',
          type: 'review' as const,
          title: 'New 5-star review',
          description: 'Great product quality!',
          time: '6 hours ago',
        },
        {
          id: '4',
          type: 'view' as const,
          title: 'Product viewed',
          description: 'MacBook Pro M3 - 45 views today',
          time: '8 hours ago',
        },
      ],
    };

    console.log(`Fetching dashboard stats for period: ${input.period}`);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      success: true,
      stats: mockStats,
      period: input.period,
    };
  });