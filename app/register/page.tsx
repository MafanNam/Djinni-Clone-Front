"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import RegisterForm from "@/components/forms/register-form";


export default function Register() {
  return (
    <div className='w-full h-screen flex items-center justify-center px-4'>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-center">Sign up Djinni account</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>

          <RegisterForm/>

        </CardContent>
      </Card>
    </div>
  )
}