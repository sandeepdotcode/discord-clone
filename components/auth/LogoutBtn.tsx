import { Button } from '@/components/ui/button';

function LogoutBtn() {
  return (
    <form action="/auth/logout" method="post">
      <Button>Log out</Button>
    </form>
  );
}

export default LogoutBtn;
