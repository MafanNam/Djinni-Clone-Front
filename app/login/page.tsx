"use client";
import LoginForm from "@/components/forms/login-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";


export default function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center px-4 theme-zinc">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login to Djinni</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>

          <LoginForm/>

        </CardContent>
      </Card>
    </div>
  )
}