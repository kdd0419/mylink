"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, ChevronDown, Copy, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function Header() {
  const { user, profile, loginWithGoogle, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyLink = () => {
    if (profile?.username) {
      const url = `${window.location.origin}/${profile.username}`;
      navigator.clipboard.writeText(url);
      toast.success("내 페이지 링크가 복사되었습니다! ✨");
      setIsMenuOpen(false);
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
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 hover:bg-muted/50 px-2 py-1.5 rounded-full transition-all active:scale-95"
              >
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20">
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-primary" />
                  )}
                </div>
                <span className="text-[12px] font-medium text-muted-foreground hidden sm:inline-block">
                  <span className="text-foreground font-semibold">{profile?.displayName || "유저"}</span>님
                </span>
                <ChevronDown className={cn("w-3.5 h-3.5 text-muted-foreground/60 transition-transform duration-200", isMenuOpen && "rotate-180")} />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right overflow-hidden">
                  <div className="px-4 py-2 border-b border-border/50 mb-1 sm:hidden">
                    <p className="text-[11px] font-bold text-foreground truncate">
                      {profile?.displayName || "유저"}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      @{profile?.username}
                    </p>
                  </div>
                  
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-medium hover:bg-muted transition-colors text-left"
                  >
                    <Copy className="w-4 h-4 text-muted-foreground" />
                    내 페이지 링크 복사
                  </button>
                  
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-medium hover:bg-muted transition-colors text-left text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    로그아웃
                  </button>
                </div>
              )}
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
