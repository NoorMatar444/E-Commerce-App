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
import { RegisterSchema ,registerSchemaType} from "@/schema/Register.schema";
import axios, { AxiosError } from 'axios';
import { toast } from "sonner"


import { useRouter } from "next/navigation"; // Next.js 13+ مع App Router



export default function Register() {
  const router=useRouter();
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver:zodResolver(RegisterSchema)
  });
  async function handleRegister(values:registerSchemaType) {
    console.log(values);
    try{
      const res= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values);
      console.log(res)
      if(res.data.message==="success"){
        toast.success("Event has been created.",{position:"top-center",duration:3000})
        router.push('/Login')
      }
    }
    catch(err:unknown){
      console.log(err)
      if(err instanceof AxiosError){
         toast.error("error.",{position:"top-center",duration:3000})
      }
    }
  }
  return (
    <>
      <div className="container w-1/2 mx-auto my-5">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(handleRegister)}>
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
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
              render={({field}) => (
                <FormItem>
                  <FormLabel>email:</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>password:</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({field}) => (
                <FormItem>
                  <FormLabel>rePassword:</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({field}) => (
                <FormItem>
                  <FormLabel>phone:</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="my-3" variant="outline">Register</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
