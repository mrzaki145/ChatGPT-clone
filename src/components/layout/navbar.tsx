"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

function AppNavbar() {
  const session = useSession();
  const isAuth = !!session.data;
  const { isMobile, state } = useSidebar();

  return (
    <div className="w-full py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {(state == "collapsed" || isMobile) && <SidebarTrigger />}
        <p className="font-medium">ChatGPT</p>
      </div>

      <div className="flex items-center gap-2">
        {isAuth ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="size-7">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    redirect("/sign-in");
                  }}
                >
                  Sign out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "default" })}
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              className={buttonVariants({ variant: "secondary" })}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export { AppNavbar };

// function Models() {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         <div className="text-muted-foreground inline-flex items-center gap-2">
//           <span className="text-sm ">ChatGPT 4o</span>{" "}
//           <ChevronDownIcon className="size-4" />
//         </div>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="start" className="py-3 px-2 w-3xs">
//         <DropdownMenuLabel className="mb-3 px-2 flex items-center justify-between">
//           <span className="text-xs text-muted-foreground">Model</span>
//           <InfoIcon className="size-3" />
//         </DropdownMenuLabel>
//         <DropdownMenuGroup>
//           <DropdownMenuItem className="p-2">
//             <div className="size-7 bg-muted rounded-full flex items-center justify-center">
//               <Sparkles className="size-3.5" />
//             </div>
//             <div>
//               <p className="text-xs">GPT-4o</p>
//               <p className="text-[10px] text-muted-foreground">
//                 Newest and most advanced model
//               </p>
//             </div>
//           </DropdownMenuItem>
//           <DropdownMenuItem className="p-2">
//             <div className="size-7 bg-muted rounded-full flex items-center justify-center">
//               <Sparkle className="size-3.5" />
//             </div>
//             <div>
//               <p className="text-xs">GPT-4</p>
//               <p className="text-[10px] text-muted-foreground">
//                 Advanced model for complex tasks
//               </p>
//             </div>
//           </DropdownMenuItem>
//           <DropdownMenuItem className="p-2">
//             <div className="size-7 bg-muted rounded-full flex items-center justify-center">
//               <Zap className="size-3.5" />
//             </div>
//             <div>
//               <p className="text-xs">GPT-3.5</p>
//               <p className="text-[10px] text-muted-foreground">
//                 Great for everyday tasks
//               </p>
//             </div>
//           </DropdownMenuItem>
//         </DropdownMenuGroup>

//         {/* <DropdownMenuSeparator /> */}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
