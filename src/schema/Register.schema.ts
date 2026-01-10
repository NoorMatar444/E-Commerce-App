import * as z from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .nonempty("this field is empty")
      .min(1, "minimum length is 1 char"),
    email: z.string().nonempty("this field is empty"),
    password: z.string().nonempty("this field is empty"),
    rePassword: z.string().nonempty("this field is empty"),
    phone: z
      .string()
      .nonempty("this field is empty")
      .regex(/^01[0125][0-9]{8}$/),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    message: "password and rePassword not match",
  });
export type registerSchemaType = z.infer<typeof RegisterSchema>;
