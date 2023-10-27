import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function Login() {

  return (
    <Card className="w-full h-full md:w-[500px] md:h-auto rounded-md flex flex-col items-center p-4 bg-[#313338] border-none">
      <CardHeader className="select-none flex flex-col space-y-3 items-center">
        <CardTitle className="text-white/90">Welcome back!</CardTitle>
        <CardDescription className="text-zinc-400">We're so excited to see you again!</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form action="/auth/login" method="post" id="loginForm">
          <Label htmlFor="emailLogin" className="select-none uppercase text-xs text-zinc-400 font-bold">Email</Label>
          <Input type="email" name="email" id="emailLogin" className="bg-[#1E1F22] text-white border-none" required />
          <Label htmlFor="passwordLogin" className="select-none uppercase text-xs text-zinc-400 font-bold">Password</Label>
          <div>
            <Input type="password" name="password" id="passwordLogin" className="bg-[#1E1F22] text-white border-none" required />
            <Link href="#" className="select-none text-sm text-pink-400">Forgot your password?</Link>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col select-none w-full space-y-2 items-start">
        <Button type="submit" form="loginForm" className="bg-pink-500 rounded hover:bg-pink-600 w-full">Log In</Button>
        <div className="text-xs text-zinc-400">Need an account?<Link href="/sign-up" className="ml-1 text-sm font-semibold text-pink-500">Register</Link></div>
      </CardFooter>
    </Card>
  );
}

export default Login;
