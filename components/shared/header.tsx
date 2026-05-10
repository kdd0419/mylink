"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, ChevronDown, Copy } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { user, profile, loginWithGoogle, logout, loading } = useAuth();

  const handleCopyLink = () => {
    if (profile?.username) {
      const url = `${window.location.origin}/${profile.username}`;
      navigator.clipboard.writeText(url);
      toast.success("내 페이지 링크가 복사되었습니다! ✨");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto max-w-xl w-full flex items-center justify-between h-14 px-6">
        <div className="text-sm font-bold tracking-tighter">My Link</div>
        
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-muted/50 px-2 py-1.5 rounded-full transition-all active:scale-95 outline-none group border-none bg-transparent cursor-pointer">
                <Avatar className="w-7 h-7 border border-primary/20 pointer-events-none">
                  <AvatarImage src={profile?.photoURL || ""} alt={profile?.displayName || "유저"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                    {profile?.displayName?.slice(0, 2) || "ML"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[12px] font-medium text-muted-foreground hidden sm:inline-block pointer-events-none">
                  <span className="text-foreground font-semibold">{profile?.displayName || "유저"}</span>님
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/60 transition-transform duration-200 group-data-[state=open]:rotate-180 pointer-events-none" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-2xl p-2 shadow-xl border-border">
                <DropdownMenuLabel className="px-3 py-2 sm:hidden">
                  <p className="text-[11px] font-bold text-foreground truncate">
                    {profile?.displayName || "유저"}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate font-normal">
                    @{profile?.username}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="sm:hidden" />
                <DropdownMenuItem
                  onClick={handleCopyLink}
                  className="rounded-xl px-3 py-2.5 text-[12px] font-medium gap-3 focus:bg-muted cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-muted-foreground" />
                  내 페이지 링크 복사
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="rounded-xl px-3 py-2.5 text-[12px] font-medium gap-3 focus:bg-muted cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              size="sm" 
              className="h-8 rounded-full text-[11px] font-bold px-4 gap-1.5"
              onClick={loginWithGoogle}
            >
              <LogIn className="w-3.5 h-3.5" />
              Google로 로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
