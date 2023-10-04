import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

function JoinServer({ backFn }) {
	return (
		<>
			<DialogHeader className="pt-8 px-6">
				<DialogTitle className="text-2xl text-center font-bold">Join a Server!</DialogTitle>
				<DialogDescription className="text-zinc-500 text-center">Enter an invite below to join an existing server.</DialogDescription>
			</DialogHeader>
			<DialogFooter className="bg-gray-100 px-6 py-4">
				<div className="w-full md:flex md:justify-between">
					<Button onClick={backFn}>Back</Button>
					<Button variant="primary">Join Server</Button>
				</div>
			</DialogFooter>
		</>
	);
}

export default JoinServer;
