"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, Copy, User as UserIcon, Home } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
      toast("링크를 복사했어요. 🔗", {
        description: "이제 필요한 곳에 공유해 보세요.",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto max-w-xl w-full flex items-center justify-between h-14 px-6">
        <Link href="/" className="text-sm font-bold tracking-tighter hover:opacity-70 transition-opacity">
          My Link
        </Link>
        
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full transition-all active:scale-95 outline-none border-none bg-transparent cursor-pointer p-0.5 hover:ring-2 hover:ring-primary/20">
                <Avatar className="w-8 h-8 border border-border shadow-sm">
                  <AvatarImage src={profile?.photoURL || ""} alt={profile?.displayName || "유저"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                    {profile?.displayName?.slice(0, 2) || "ML"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-xl border-border">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-3 py-3 border-b border-border/50 mb-1">
                    <p className="text-[13px] font-bold text-foreground truncate">
                      {profile?.displayName || "유저"}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate font-normal mt-0.5">
                      {profile?.email}
                    </p>
                    <p className="text-[10px] text-primary/70 truncate font-medium mt-1">
                      @{profile?.username}
                    </p>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <Link href="/">
                  <DropdownMenuItem className="rounded-xl px-3 py-2.5 text-[12px] font-medium gap-3 focus:bg-muted cursor-pointer">
                    <Home className="w-4 h-4 text-muted-foreground" />
                    대시보드
                  </DropdownMenuItem>
                </Link>
                {profile?.username && (
                  <Link href={`/${profile.username}`}>
                    <DropdownMenuItem className="rounded-xl px-3 py-2.5 text-[12px] font-medium gap-3 focus:bg-muted cursor-pointer">
                      <UserIcon className="w-4 h-4 text-muted-foreground" />
                      내 페이지 보기
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem
                  onClick={handleCopyLink}
                  className="rounded-xl px-3 py-2.5 text-[12px] font-medium gap-3 focus:bg-muted cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-muted-foreground" />
                  링크 복사
                </DropdownMenuItem>
                <DropdownMenuSeparator />
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
