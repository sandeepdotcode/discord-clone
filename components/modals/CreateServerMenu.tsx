import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

function CreateServerMenu({ createForm, joinForm, isFirst }) {
	return (
		<>
			<DialogHeader className="pt-8 px-6">
				<DialogTitle className="text-2xl text-center font-bold">
					{
						isFirst 
						? "Create your first Server!"
						: "Create a Server"
					}
				</DialogTitle>
				<DialogDescription className="text-zinc-500 text-center">A server is where you and your friends hangout. Make yours and start talking.</DialogDescription>
			</DialogHeader>
			<div className="space-y-8 px-6">
				<Button onClick={createForm} className="w-full h-16 font-bold border-zinc-500">
					Create My Server!
					<ChevronRight />
				</Button>
			</div>
			<DialogFooter className="bg-gray-100 px-6 py-4">
				<div className="flex flex-col h-full w-full gap-4 items-center">
					<div>Have an invite already?</div>
					<Button onClick={joinForm} variant="primary" className="w-full">
						Join a Server
					</Button>
				</div>
			</DialogFooter>
		</>
	);
}

export default CreateServerMenu;
