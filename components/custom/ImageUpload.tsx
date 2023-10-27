"use client"

import { Input } from '@/components/ui/input';
import { cn, getInitials } from '@/lib/utils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ImagePlus, Trash, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ImageUploadProps {
	avatarType: string;
	displayName?: string;
	fileUrl: string;
	setFileUrl: (url: string) => void;
	inForm?: boolean;
	setIsUploading?: (a: boolean) => void;
};

function ImageUpload({
	field,
	avatarType,
	displayName = "",
	fileUrl,
	setFileUrl,
	inForm = false,
	setIsUploading = (bool) => {}
}: ImageUploadProps) {
	const [fileName, setFileName] = useState("");

	const supabase = createClientComponentClient();

	const uploadFile = async (event) => {
		if (inForm) {
			setIsUploading(true);
		}
		const avatarFile = event.target.files?.[0];
		if (fileName) {
			await supabase
				.storage
				.from('avatars')
				.remove([`${avatarType}/${fileName}`]);
		}
			
		setFileName(avatarFile.name);

		const { data, error } = await supabase
			.storage
			.from('avatars')
			.upload(`${avatarType}/${avatarFile.name}`, avatarFile, {
				cacheControl: '3600',
				upsert: true
			});
	
		if (!error) {
			// setFileUrl(`https://mbawkqeeqdrjvcumcyae.supabase.co/storage/v1/object/public/avatars/${avatarType}/${avatarFile.name}`);
			const publicUrl = supabase.storage.from('avatars').getPublicUrl(`${avatarType}/${avatarFile.name}`)
			console.log(publicUrl);
			setFileUrl(publicUrl.data.publicUrl);
			if (inForm) {
				setIsUploading(false);
			}
		}
	};

	const removeFile = async () => {
		const {	error } = await supabase
			.storage
			.from('avatars')
			.remove([`${avatarType}/${fileName}`]);
		setFileUrl("");
		setFileName("");

		if (inForm) {
			setIsUploading(false);
		}

		if (error) {
			console.error(error);
		}
	};

	return (
		<div className={cn("w-[88px] h-[88px] relative", !displayName && !fileUrl && "border-dashed border-2 border-zinc-500 rounded-md" )}>
			<div className="overflow-hidden rounded-md relative h-full w-full group/image-input z-30">
				<Input type="file" {...field} className="border-none h-full w-full absolute z-30
					opacity-0"
					onChange={uploadFile} accept=".jpg, .jpeg, .png, .gif" />
				<div className="h-full w-full absolute border-none z-20 bg-transparent group-hover/image-input:backdrop-brightness-50
					text-zinc-300/80 font-bold uppercase text-xs flex justify-center items-center select-none opacity-0 group-hover/image-input:opacity-100
					flex-col">
					<span>Change</span><span>Avatar</span>
				</div>
				{ fileUrl 
					? <div className="h-full w-full absolute z-0"><Image src={fileUrl} fill alt="" /></div> 
					: ""
				}
			</div>
			<button type="button" className={cn(`bg-zinc-200 h-6 w-6 rounded-md z-40 absolute top-0 -translate-y-2/4 right-0
				translate-x-2/4 flex justify-center items-center`, fileUrl !== "" && "bg-red-500")} disabled={fileUrl === ""}
				onClick={removeFile}>
				{ fileUrl === "" && <ImagePlus className="text-zinc-500 h-4 w-4" /> }
				{ fileUrl !== "" && <X className="h-4 w-4" /> }
			</button>
		</div>
	);
}

export default ImageUpload;
