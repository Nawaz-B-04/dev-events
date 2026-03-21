import {z} from 'zod'

export const bookingSchema = z.object({
    name : z.string().min(2, {message : "Name must be at least 2 characters long"}),
    email : z.string().email({message : "Invalid email address"}),
    guestCount : z.coerce.number().min(1).max(10, {message : "Guest count must be between 1 and 10"}),
})

export type bookingSchemaType = z.infer<typeof bookingSchema>


