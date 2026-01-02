import z from "zod";

export const addProductToCartShema = z.object({
  productVariantId: z.uuid(),
  quantity: z.number().min(1),
});
export type addProductToCartShema = z.infer<typeof addProductToCartShema>;
