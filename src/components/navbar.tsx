"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { useState } from "react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full h-[60px] sticky top-0  bg-[#111] flex justify-center items-center px-5 border-b border-[#222222]">
      <div className="w-full max-w-[1300px] flex justify-between items-center">
        <div>
          <Link className="flex items-center gap-1" href="/">
            <Logo />
            <span className=" text-white">CloudVision</span>
            <Badge className="bg-blue-900 hover:bg-blue-900/80 text-white">Beta</Badge>
          </Link>
        </div>
        <div className="gap-4 items-center hidden md:flex">
          <Link className="text-white hover:underline" href="/upload">
            Upload
          </Link>

          <Link className="text-white hover:underline" href="/settings">
            Settings
          </Link>
          <Button asChild>
            <Link
              className="bg-white text-black hover:bg-gray-200 hover:text-black"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </Button>
    
        </div>
        <div className="flex md:hidden">
            <button onClick={() => setOpen(!open)} className="p-2 rounded-md hover:bg-[#222222] cursor-pointer">
                {open ? <X /> : <Menu />}
            </button>
            {open && <div className="absolute top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-[#111111]/90 backdrop-blur-md z-50">
                <div className="flex flex-col items-center text-xl gap-5 justify-start h-full p-5">
                    <Link onClick={() => setOpen(false)} className="hover:underline" href="/">Home</Link>
                    <Link onClick={() => setOpen(false)} className="hover:underline" href="/upload">Upload</Link>
                    <Link onClick={() => setOpen(false)} className="hover:underline" href="/settings">Settings</Link>
                    <Button onClick={() => setOpen(false)} className="w-full bg-white text-black hover:bg-gray-200 hover:text-black" asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                </div>
            </div>}
        </div>
      </div>
    </nav>
  );
};

export const Logo = () => {
  return (
    <img
      className="w-7 h-7 transform rotate-[30deg]"
      src="/logo.png"
      alt="logo"
    />
  );
};
