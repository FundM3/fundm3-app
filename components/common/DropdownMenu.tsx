import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dropdown = () => {
  return (
    <div className='ml-2 pt-[1px]'>
        <DropdownMenu>
            <DropdownMenuTrigger>
            <div className='pt-0.5'>
                <Avatar>
                <AvatarImage src="/assets/icons/profile.svg" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile" >
                <DropdownMenuItem>My Profile</DropdownMenuItem>
            </Link>
            <Link href="/">
                <DropdownMenuItem>My Sponsors</DropdownMenuItem>
            </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default Dropdown