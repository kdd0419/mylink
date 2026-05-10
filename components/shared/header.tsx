"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn } from "lucide-react";

export function Header() {
  const { user, profile, loginWithGoogle, logout, loading } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto max-w-xl w-full flex items-center justify-between h-14 px-6">
        <div className="text-sm font-bold tracking-tighter">My Link</div>
        
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-medium text-muted-foreground">
                <span className="text-foreground font-semibold">{profile?.displayName || "유저"}</span>님
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 rounded-full" 
                onClick={logout}
                title="로그아웃"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
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
