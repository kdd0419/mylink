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

      <div className="mt-16 w-full max-w-[340px] rounded-[2.5rem] border-8 border-card bg-card shadow-2xl relative overflow-hidden aspect-[9/16] group transition-transform duration-500 hover:scale-[1.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:10px_10px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
        
        {/* Mockup Content */}
        <div className="relative h-full flex flex-col items-center px-6 pt-12">
          {/* Profile Circle */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary/20 to-primary/40 mb-4 animate-pulse"></div>
          
          {/* Text Skeletons */}
          <div className="w-24 h-3 bg-foreground/10 rounded-full mb-2"></div>
          <div className="w-32 h-2 bg-foreground/5 rounded-full mb-8"></div>
          
          {/* Link Skeletons */}
          <div className="w-full space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="w-full h-12 rounded-2xl bg-background/80 border border-border/50 flex items-center px-4 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-6 h-6 rounded-lg bg-primary/10"></div>
                <div className="flex-1 h-2 bg-foreground/5 rounded-full"></div>
              </div>
            ))}
          </div>
          
          {/* Brand Tag */}
          <div className="mt-auto mb-6 flex flex-col items-center gap-1.5 opacity-30">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></div>
            <p className="text-[8px] font-bold uppercase tracking-[0.2em]">Made with My Link</p>
          </div>
        </div>
      </div>
    </div>
  );
}
