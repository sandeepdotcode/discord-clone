import LogoutBtn from '@/components/auth/LogoutBtn';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function Home() {
  return (
    <div className="flex flex-col items-start">
      <div className="text-3xl font-bold text-indigo-500">Hello World</div>
      <div>This is a protected route</div>
      <LogoutBtn />
      <ModeToggle />
    </div>
  )
}
