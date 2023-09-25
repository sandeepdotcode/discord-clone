import { Button } from '@/components/ui/button';

function LogoutBtn() {
  return (
    <form action="/auth/logout" method="post">
      <Button variant="destructive">Log out</Button>
    </form>
  );
}

export default LogoutBtn;
