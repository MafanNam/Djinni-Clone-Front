import PasswordResetConfirmForm from "@/components/forms/password-reset-confirm-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface Props {
  params: {
    uid: string;
    token: string;
  }
}

export default function PasswordReset({params: {uid, token}}: Props) {
  return (
    <div className="w-full h-screen flex items-center justify-center px-4 theme-zinc">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Reset Password Confirm to Djinni</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>

          <PasswordResetConfirmForm uid={uid} token={token}/>

        </CardContent>
      </Card>
    </div>
  )
}