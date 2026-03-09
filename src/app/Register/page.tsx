"use client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, registerSchemaType } from "@/schema/Register.schema";
import axios, { AxiosError } from 'axios';
import { toast } from "sonner"


import { useRouter } from "next/navigation"; // Next.js 13+ مع App Router



export default function Register() {
  const router = useRouter();
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "Omar",
      email: "omar2026@gmail.com",
      password: "123456",
      rePassword: "123456",
      phone: "01098765432"
    },
    resolver: zodResolver(RegisterSchema)
  });
  async function handleRegister(values: registerSchemaType) {
    console.log(values);
    try {
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      console.log(res)
      if (res.data.message === "success") {
        toast.success("Event has been created.", { position: "top-center", duration: 3000 })
        router.push('/Login')
      }
    }
    catch (err: unknown) {
      console.log(err)
      if (err instanceof AxiosError) {
        toast.error("error.", { position: "top-center", duration: 3000 })
      }
    }
  }
  return (
    <>
      <div className="container w-1/2 mx-auto my-5 shadow-lg rounded-lg p-5 mt-5 ">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(handleRegister)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>ConfirmPassword:</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Phone:</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit" className="my-3" variant="outline">Signup</Button>
            </div>

          </form>
        </Form>
      </div>
    </>
  );
}
