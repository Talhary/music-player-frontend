"use client";

import { Button } from "../components/ui/button";
import { Music, UserPlus, LogIn } from "lucide-react";
// Assuming MusicSearch is imported from another file
import { MusicSearch } from "./music-search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { clearUser } from "../stores/user";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
export function HeaderComponent() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  return (
    <header className="w-full px-4 py-3 bg-background border-b">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center  items-center flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="flex space-x-2 items-center ">
            <Music className="h-6 w-6" />
            <span className="text-xl font-bold">MusicApp</span>
          </a>

          <div className="w-full sm:max-w-xl ">
            <MusicSearch />
          </div>

          <div className="flex items-center justify-center space-x-2 self-end sm:self-auto">
            {user?.email ? (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <img src={user.picture} className="h-8 w-8 rounded-full" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-fit flex items-center justify-center py-5 hover:scale-[1.02] transition-all mr-[5rem]">
                  
                  <DropdownMenuItem className="hover:outline-none hover:ring-0">
                    <Button variant={"outline"} onClick={()=>{
                      dispatch(clearUser());
                      const tokenCookie = document.cookie?.split(';')?.map(i => i.trim())?.find(i => i.startsWith('token='));

                      // Check if the token cookie exists
                      if (tokenCookie) {
                        // Set the cookie with an expiration date in the past to delete it
                        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                      } 
                      
                    }}>Logout</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <a href={"http://localhost:5000/auth/google"}>
                <Button size="sm" asChild className=" inline-flex">
                  <div>Sign up/login</div>
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
