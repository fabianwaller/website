"use client"

import {
    ArrowRight, CommandIcon, FolderKanban,
    House,
    Mail,
    Newspaper,
    Rocket, User
} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command"

import { useSearchParams } from 'next/navigation'

import { FaXTwitter as Twitter, FaGithub as Github, FaLinkedin as LinkedIn } from "react-icons/fa6"

import { useEffect } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useCommandMenu } from "@/provider/CommandMenuContext"

export function CommandMenuButton() {
    const { toggle } = useCommandMenu();
    // const isMac = /(Mac)/i.test(navigator.userAgent)
    // const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)
    const isMac = true
    const isMobile = false

    const searchParams = useSearchParams()

    const search = searchParams.get('viewport')

    console.log(search)

    let action;
    let cmd;
    let hotkey;

    if (isMobile) {
        action = 'Tap ';
    } else {
        action = 'Press ';
        if (isMac) {
            cmd = <CommandIcon />;
        } else {
            cmd = <span>ctrl</span>;
        }
        hotkey = (
            <>
                <div className="mx-2 h-5 w-5 flex items-center" >{cmd}</div>
                <span>K</span>
            </>
        );
    }

    return (
        <Button variant="ghost" className="relative p-4 -left-4">
            <div className="flex items-center  text-primary font-medium" onClick={toggle}>
                <span>{action}</span>
                {hotkey}
                <span className="ml-2">for shortcuts</span>
                <span className="ml-2"><ArrowRight /></span>
            </div>

        </Button>
    )
}

export function CommandMenu() {
    const router = useRouter()

    const { open, toggle } = useCommandMenu();

    const handleSelect = (path: string) => {
        toggle()
        router.push(path)
    }

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggle()
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [toggle])

    return (
        <div className="space-y-4">
            <CommandDialog open={open} onOpenChange={toggle}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="External">
                        <CommandItem onSelect={() => handleSelect('https://github.com/fabianwaller')}>
                            <Github className="mr-2 h-4 w-4" />
                            <span>Github</span>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect('https://twitter.com/fabianwallerr')}>
                            <Twitter className="mr-2 h-4 w-4" />
                            <span>X</span>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect('https://www.linkedin.com/in/fabian-waller-974840213/')}>
                            <LinkedIn className="mr-2 h-4 w-4" />
                            <span>LinkedIn</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Links">
                        <CommandItem onSelect={() => handleSelect('/')}>
                            <House className="mr-2 h-4 w-4" />
                            <span>Home</span>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect('/about')}>
                            <User className="mr-2 h-4 w-4" />
                            <span>About</span>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect('/journey')}>
                            <Rocket className="mr-2 h-4 w-4" />
                            <span>Journey</span>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect('/projects')}>
                            <FolderKanban className="mr-2 h-4 w-4" />
                            <span>Projects</span>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect('/blog')}>
                            <Newspaper className="mr-2 h-4 w-4" />
                            <span>Blog</span>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect('/contact')}>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Contact</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    )
}
