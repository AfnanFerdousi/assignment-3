import { z } from "zod";

export const createOrderValidation = z.object({
    buyerId: z.string({
        required_error: "Buyer ID is required",
    }),
    cowId: z.string({
        required_error: "Cow ID is required",
    }),
});
