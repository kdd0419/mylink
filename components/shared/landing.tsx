"use client";

import { Button } from "@/components/ui/button";
import { LogIn, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function Landing() {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="flex flex-col items-center text-center py-20 px-4">
      <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary tracking-tight">
        <Sparkles className="w-3.5 h-3.5" />
        나만의 링크 페이지 만들기
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-[1.1]">
        모든 링크를<br />
        <span className="text-primary">하나의 페이지</span>로.
      </h1>
      
      <p className="text-muted-foreground text-sm max-w-[320px] mb-10 leading-relaxed">
        GitHub, 블로그, 포트폴리오를 한곳에 모으세요.<br />
        구글 로그인 한 번으로 1분 만에 완성됩니다.
      </p>

      <Button 
        size="lg" 
        className="rounded-full px-8 h-12 text-sm font-bold gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95"
        onClick={loginWithGoogle}
      >
        <LogIn className="w-4 h-4" />
        지금 시작하기 (Google)
      </Button>

      <div className="mt-16 w-full max-w-sm rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 aspect-square flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
        <p className="text-[11px] text-muted-foreground/40 font-mono uppercase tracking-[0.2em]">Service Preview Mockup</p>
      </div>
    </div>
  );
}
