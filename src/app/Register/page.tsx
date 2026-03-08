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
      name: "Noor",
      email: "noor@example.com",
      password: "123456",
      rePassword: "123456",
      phone: "01012345678",
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

      <div className="container w-1/2 mx-auto mt-5  bg-gray-50 p-5 rounded-3xl shadow-lg">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(handleRegister)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-4">
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
                <FormItem className="my-4">
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
                <FormItem className="my-4">
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
                <FormItem className="my-4">
                  <FormLabel>Confirm Password:</FormLabel>
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
                <FormItem className="my-4">
                  <FormLabel>Phone:</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="button flex justify-center">
              <Button type="submit" className="my-3" variant="outline">Signup</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
