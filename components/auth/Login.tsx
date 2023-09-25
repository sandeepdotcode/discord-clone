import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function Login() {

  return (
    <Card className="rounded-md">
      <CardHeader className="select-none">
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>We're so excited to see you again!</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="/auth/login" method="post" id="loginForm">
          <Label htmlFor="emailLogin" className="select-none">Email</Label>
          <Input type="email" name="email" id="emailLogin" required />
          <Label htmlFor="passwordLogin" className="select-none">Password</Label>
          <div>
            <Input type="password" name="password" id="passwordLogin" required />
            <Link href="#" className="select-none">Forgot your password?</Link>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col select-none">
        <Button type="submit" form="loginForm" className="bg-pink-400 rounded hover:bg-pink-500">Log In</Button>
        <div>Need an account?<Link href="/sign-up">Register</Link></div>
      </CardFooter>
    </Card>
  );
}

export default Login;
