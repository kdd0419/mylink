"use client";

import { Button } from "@/components/ui/button";
import { LogIn, Sparkles, Code2, Globe, Play, Camera, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const MOCKUP_LINKS = [
  { title: "GitHub", icon: Code2, color: "text-slate-900 bg-slate-100" },
  { title: "Personal Blog", icon: Globe, color: "text-blue-600 bg-blue-50" },
  { title: "YouTube", icon: Play, color: "text-red-600 bg-red-50" },
  { title: "Instagram", icon: Camera, color: "text-pink-600 bg-pink-50" },
];

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

      {/* Enhanced Mockup */}
      <div className="mt-16 w-full max-w-[340px] rounded-[3rem] border-[10px] border-card bg-card shadow-2xl relative overflow-hidden aspect-[9/16] group transition-all duration-700 hover:scale-[1.02] hover:-rotate-1">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:10px_10px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
        
        {/* Mockup Content */}
        <div className="relative h-full flex flex-col items-center px-6 pt-12">
          {/* Profile Section */}
          <div className="relative mb-4">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-primary to-chart-2 opacity-20 blur animate-pulse"></div>
            <div className="relative w-20 h-20 rounded-full bg-muted border-2 border-background overflow-hidden flex items-center justify-center">
              <User className="w-10 h-10 text-muted-foreground/40" />
            </div>
          </div>
          
          <div className="space-y-1 mb-10">
            <div className="text-sm font-extrabold tracking-tight">@vibe_coder</div>
            <div className="text-[10px] text-muted-foreground font-medium opacity-70 px-4 line-clamp-1">
              Building beautiful things with React ✨
            </div>
          </div>
          
          {/* Links List */}
          <div className="w-full space-y-3">
            {MOCKUP_LINKS.map((link, i) => (
              <div 
                key={link.title} 
                className="w-full h-12 rounded-2xl bg-background border border-border/60 flex items-center px-4 gap-3 shadow-sm hover:border-primary/30 transition-all cursor-default group/item animate-in fade-in slide-in-from-bottom-3 duration-1000 fill-mode-both"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${link.color}`}>
                  <link.icon className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-foreground/80">{link.title}</div>
                <div className="ml-auto w-4 h-4 rounded-full bg-muted/30 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-foreground/20"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Brand Tag */}
          <div className="mt-auto mb-8 flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-muted/50 border border-border/50 text-[7px] font-bold text-muted-foreground tracking-widest uppercase">
              <span className="relative flex h-1 w-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1 w-1 bg-primary"></span>
              </span>
              Made with My Link
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
