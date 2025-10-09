import z from 'zod';

// Validator for login
export const loginUserValidator = z.object({
    email: z
        .email()
        .trim(),
    password: z
        .string()
        .min(3, { message: "Password must be at least 3 characters long" })
        .max(50, { message: "Password should not be more than 50 characters long" })
        .trim()
});

// Updated register validator with all required fields
export const registerUserValidator = loginUserValidator.extend({
    firstName: z
        .string()
        .trim()
        .min(3, { message: "First name must be at least 3 characters long." })
        .max(50, { message: "First name must be no more than 50 characters." }),
    
    lastName: z
        .string()
        .trim()
        .max(50, { message: "Last name must be no more than 50 characters." })
        .optional(),  // Optional
    
    phone: z
        .string()
        .trim()
        .min(10, { message: "Phone number must be at least 10 digits." }),
    
    dob: z
        .string()
        .refine(val => !isNaN(Date.parse(val)), { message: "Date of birth must be a valid date." }),
    
    gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({ message: "Gender must be one of 'male', 'female', or 'other'." })
    })
});
