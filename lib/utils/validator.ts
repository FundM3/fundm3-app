import * as z from "zod"

export const profileDetailSchema = z.object({
    name: z.string(),
    address: z.string(),
    fid: z.string(),
    email: z.string().email(),
    url: z.string().url(),
})
