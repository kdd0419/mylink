"use client";

import { Button } from "@/components/ui/button";
import { LogIn, Sparkles, Code2, Globe, Play, Camera, User, Zap, AtSign, BarChart2, Share2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const MOCKUP_LINKS = [
  { title: "GitHub", icon: Code2, color: "text-slate-900 bg-slate-100 dark:text-slate-100 dark:bg-slate-800" },
  { title: "Personal Blog", icon: Globe, color: "text-blue-600 bg-blue-50 dark:bg-blue-950" },
  { title: "YouTube", icon: Play, color: "text-red-600 bg-red-50 dark:bg-red-950" },
  { title: "Instagram", icon: Camera, color: "text-pink-600 bg-pink-50 dark:bg-pink-950" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "1분 만에 시작",
    desc: "Google 로그인 하나로 즉시 내 페이지가 만들어집니다. 복잡한 설정은 없어요.",
    color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/40",
  },
  {
    icon: AtSign,
    title: "나만의 URL",
    desc: "mylink.app/username 형식의 고유 주소를 갖게 됩니다. 언제든 변경 가능해요.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: BarChart2,
    title: "클릭 통계",
    desc: "어떤 링크가 인기 있는지 차트로 한눈에 확인하세요. 데이터가 쌓일수록 유용해요.",
    color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Google로 로그인",
    desc: "별도 회원가입 없이 구글 계정으로 바로 시작해요.",
  },
  {
    num: "02",
    title: "링크 추가",
    desc: "GitHub, 블로그, SNS 등 원하는 링크를 자유롭게 추가하세요.",
  },
  {
    num: "03",
    title: "URL 공유",
    desc: "내 전용 URL을 이메일, SNS, 명함 어디에든 공유하세요.",
  },
];

export function Landing() {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="w-full">
        <div className="mx-auto max-w-5xl px-6 pt-10 pb-20 md:pt-16 md:pb-28 flex flex-col md:flex-row items-center gap-12 md:gap-8 lg:gap-16">
          {/* Text */}
          <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary tracking-tight">
              <Sparkles className="w-3.5 h-3.5" />
              나만의 링크 페이지 만들기
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
              모든 링크를<br />
              <span className="text-primary">하나의 페이지</span>로.
            </h1>

            <p className="text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed mb-8">
              GitHub, 블로그, 포트폴리오를 한 곳에.<br />
              구글 로그인 한 번으로 1분 만에 완성됩니다.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 h-12 text-sm font-bold gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95"
                onClick={loginWithGoogle}
              >
                <LogIn className="w-4 h-4" />
                지금 시작하기 (Google)
              </Button>
              <span className="text-[11px] text-muted-foreground/60 font-medium">가입 불필요</span>
            </div>

            <div className="mt-10 flex items-center gap-8">
              {[
                { num: "1분", label: "설정 완료" },
                { num: "즉시", label: "바로 시작" },
                { num: "∞", label: "링크 개수" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center md:items-start">
                  <span className="text-xl font-black text-foreground">{s.num}</span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mockup */}
          <div className="flex-shrink-0 w-[240px] sm:w-[260px] md:w-[270px] lg:w-[290px]">
            <div className="w-full rounded-[3rem] border-[10px] border-card bg-background shadow-2xl relative overflow-hidden aspect-[9/16] transition-all duration-700 hover:scale-[1.02] hover:-rotate-1 ring-1 ring-border/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
              <div className="relative h-full flex flex-col items-center px-5 pt-10">
                <div className="relative mb-3">
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-primary to-chart-2 opacity-20 blur animate-pulse" />
                  <div className="relative w-16 h-16 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                    <User className="w-8 h-8 text-muted-foreground/40" />
                  </div>
                </div>
                <div className="space-y-0.5 mb-7 text-center">
                  <div className="text-xs font-extrabold tracking-tight">@vibe_coder</div>
                  <div className="text-[9px] text-muted-foreground/70 px-3 line-clamp-1">Building beautiful things ✨</div>
                </div>
                <div className="w-full space-y-2.5">
                  {MOCKUP_LINKS.map((link, i) => (
                    <div
                      key={link.title}
                      className="w-full h-10 rounded-2xl bg-background border border-border/60 flex items-center px-3 gap-2.5 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-both"
                      style={{ animationDelay: `${i * 120}ms` }}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${link.color}`}>
                        <link.icon className="w-3 h-3" />
                      </div>
                      <span className="text-[10px] font-bold text-foreground/80">{link.title}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto mb-6 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted/50 border border-border/50 text-[7px] font-bold text-muted-foreground tracking-widest uppercase">
                  <span className="relative flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-primary" />
                  </span>
                  Made with My Link
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full border-t border-border/40 bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">왜 마이링크인가요?</h2>
            <p className="text-sm text-muted-foreground mt-2">복잡한 것 없이, 핵심만 담았습니다.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border/50 bg-background p-6 flex flex-col gap-4 hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.color}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1.5">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">3단계로 완성</h2>
            <p className="text-sm text-muted-foreground mt-2">복잡한 설정 없이, 진짜 1분입니다.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            {STEPS.map((step) => (
              <div key={step.num} className="flex-1 rounded-2xl border border-border/50 bg-background p-6 flex flex-col gap-3 hover:border-primary/20 transition-colors">
                <span className="text-4xl font-black text-primary/15 leading-none">{step.num}</span>
                <h3 className="font-bold text-sm">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full border-t border-border/40 bg-muted/20">
        <div className="mx-auto max-w-xl px-6 py-20 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Share2 className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
            지금 바로 내 링크 페이지를<br />만들어보세요
          </h2>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed max-w-xs">
            내 URL을 이메일·SNS·명함 어디든 공유하세요.
          </p>
          <Button
            size="lg"
            className="rounded-full px-10 h-12 text-sm font-bold gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95"
            onClick={loginWithGoogle}
          >
            <LogIn className="w-4 h-4" />
            지금 시작하기 (Google)
          </Button>
          <p className="mt-8 text-[11px] text-muted-foreground/40 uppercase tracking-widest font-medium">
            © 2026 My Link · Built with Passion
          </p>
        </div>
      </section>
    </div>
  );
}
