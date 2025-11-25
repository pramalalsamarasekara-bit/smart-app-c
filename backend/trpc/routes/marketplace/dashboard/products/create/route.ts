import { z } from 'zod';
import { publicProcedure, type Context } from '../../../../create-context';

const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  originalPrice: z.number().optional(),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  condition: z.enum(['New', 'Like New', 'Good', 'Fair', 'Poor']),
  quantity: z.number().int().positive('Quantity must be positive'),
  sku: z.string().optional(),
  tags: z.array(z.string()).default([]),
  images: z.array(z.string()).min(1, 'At least one image is required'),
});

export const createProductProcedure = publicProcedure
  .input(createProductSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof createProductSchema>; ctx: Context }) => {
    // In a real app, this would save to database
    const product = {
      id: Math.random().toString(36).substr(2, 9),
      ...input,
      sellerId: 'anonymous',
      createdAt: new Date().toISOString(),
      status: 'pending_review',
      views: 0,
      favorites: 0,
    };

    console.log('Creating product:', product);

    // Simulate database save delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      product,
      message: 'Product created successfully and is pending review',
    };
  });