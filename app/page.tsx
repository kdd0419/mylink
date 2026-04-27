"use client";

import { DUMMY_LINKS } from "@/data/links";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Share2, Globe, Terminal, Code2, User } from "lucide-react";

export default function Page() {
  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  return (
    <div className="relative min-h-svh overflow-hidden bg-background font-sans antialiased text-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_100%_200px,var(--color-primary),transparent)] opacity-[0.03]"></div>

      <div className="mx-auto flex w-full max-w-xl flex-col items-center px-6 pt-16 pb-24">
        {/* Profile Section */}
        <header className="flex flex-col items-center text-center gap-4 mb-10 w-full">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-chart-2 to-primary opacity-70 blur transition duration-500 group-hover:opacity-100 group-hover:duration-200 animate-pulse"></div>
            <div className="relative w-28 h-28 rounded-full bg-card border-2 border-background overflow-hidden flex items-center justify-center">
              {/* Default Avatar Icon */}
              <div className="bg-muted w-full h-full flex items-center justify-center">
                <User className="w-12 h-12 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center justify-center gap-2">
              @dev_kim
              <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono border border-primary/20 uppercase tracking-widest">
                Developer
              </div>
            </h1>
            <p className="text-muted-foreground text-sm max-w-[320px] leading-relaxed">
              Frontend Engineer passionate about building beautiful, functional user experiences. ✨
            </p>
          </div>

          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="rounded-full h-8 gap-1.5 text-xs bg-background/50 backdrop-blur-sm">
              <Share2 className="w-3.5 h-3.5" />
              공유하기
            </Button>
            <Button variant="outline" size="sm" className="rounded-full h-8 gap-1.5 text-xs bg-background/50 backdrop-blur-sm">
              <Globe className="w-3.5 h-3.5" />
              GitHub
            </Button>
          </div>
        </header>

        {/* Links Section */}
        <main className="w-full flex flex-col gap-3.5">
          {DUMMY_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full outline-none"
            >
              <Card className="relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-accent/40 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] py-0">
                <div className="flex items-center p-4 gap-4">
                  {/* Favicon Icon */}
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background border border-border/50 shadow-sm group-hover:border-primary/30 transition-colors overflow-hidden">
                    <img
                      src={getFaviconUrl(link.url) || ""}
                      alt={link.title}
                      className="h-6 w-6 object-contain z-10"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden absolute inset-0 flex items-center justify-center bg-muted/20">
                      <Code2 className="h-5 w-5 text-muted-foreground/60" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0 text-left">
                    <h2 className="text-sm font-semibold tracking-tight truncate group-hover:text-primary transition-colors">
                      {link.title}
                    </h2>
                    <p className="text-[11px] text-muted-foreground truncate opacity-70">
                      {new URL(link.url).hostname}
                    </p>
                  </div>

                  <ExternalLink className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Card>
            </a>
          ))}
        </main>

        <footer className="mt-16 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/30 border border-border/50 text-[10px] font-medium text-muted-foreground tracking-wide backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
            </span>
            AVAILABLE FOR PROJECTS
          </div>
          <p className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-[0.2em]">
            © 2026 My Link • Built with Passion
          </p>
        </footer>
      </div>
    </div>
  );
}
