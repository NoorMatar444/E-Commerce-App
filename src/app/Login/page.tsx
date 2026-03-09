"use client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { LoginSchema,loginSchemaType } from "@/schema/Login.schema";
import {signIn} from "next-auth/react"




export default function Login() {
  
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "omar2026@gmail.com",
      password: "123456",
    },
    resolver:zodResolver(LoginSchema)
  });
  async function handleLogin(values:loginSchemaType) {
    console.log(values);
    
    const response=await signIn("credentials",{
      email:values.email,
      password:values.password,
      redirect:false,
      callbackUrl:"/"
    });
    console.log(response)
    if(response?.ok){
      toast.success("Loggedin successfully.",{position:"top-center"});
      window.location.href="/"
    }else{
      toast.error("didn't Login in successfully",{position:"top-center"});
      console.log("error")
    }
  }
  return (
    <>
      <div className="container w-1/2 mx-auto my-5 shadow-lg rounded-lg p-5 mt-5 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem className="mb-3">
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem className="mb-3">
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit" className="my-3" variant="outline">Signin</Button>
            </div>
            
          </form>
        </Form>
        
      </div>
    </>
  );
}