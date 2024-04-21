import PasswordResetForm from "@/components/forms/password-reset-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center px-4 theme-zinc">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Reset Password to Djinni</CardTitle>
          <CardDescription>
            Enter your email below to reset password
          </CardDescription>
        </CardHeader>
        <CardContent>

          <PasswordResetForm/>

        </CardContent>
      </Card>
    </div>
  )
}