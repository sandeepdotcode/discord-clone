import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/*
interface DataItem {
  id: string,
  name: string,
  type: string,
  required: boolean,
  helper?: string,
}

const data: DataItem[] = [
  { id: "email", name: "EMAIL", type: "email", required: true },
  { id: "dispName", name: "DISPLAY NAME", type: "text", required: false, helper: "This is how others see you" },
  { id: "username", name: "USERNAME", type: "text", required: true, helper: "Only numbers, letters, underscores _, or periods . are supported" },
  { id: "password", name: "PASSWORD", type: "password", required: true },
]; */

function SignUp() {
  return (
    <Card className="rounded-md">
      <CardHeader className="select-none">
        <CardTitle>Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="/auth/sign-up" method="post" id="signUpForm">
          <div>
            <Label htmlFor="emailSignUp" className="select-none">EMAIL<span className="text-red-700">*</span></Label>
            <Input type="email" name="email" id="emailSignUp" required />
          </div> 
          <div>
            <Label htmlFor="passwordSignUp" className="select-none">PASSWORD<span className="text-red-700">*</span></Label>
            <Input type="password" name="password" id="passwordSignUp" required />
          </div> 

          {/* data.map((item) => (
            <div>
              <Label htmlFor={`${item.id}SignUp`} className="select-none">{ item.name }</Label>
              <Input type={item.type} name={item.id} id={`${item.id}SignUp`} required={item.required} />
              { item.helper && <div>{ item.helper }</div> }
            </div> 
          )) */}
        </form>
      </CardContent>
      <CardFooter className="flex flex-col select-none">
        <Button type="submit" form="signUpForm" className="bg-pink-400 rounded hover:bg-pink-500">Sign Up</Button>
        <div><Link href="/login">Already have an account?</Link></div>
      </CardFooter>
    </Card>
  )
}

export default SignUp;
