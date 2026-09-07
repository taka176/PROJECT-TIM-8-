import z from "zod"

export const loginValidation = z.object({
    email : z.email(),
    password : z.string().min(6)
})

export const registerValidation = z.object({
    username : z.string().min(1),
    email : z.email(),
    password : z.string().min(6)
})