"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { MousePointerClick, Trophy, Link2, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLinks } from "@/hooks/useLinks";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  clicks: {
    label: "클릭수",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function StatsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { links, isLoading: linksLoading } = useLinks(user?.uid);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/");
    }
  }, [authLoading, user, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const totalClicks = links.reduce((sum, link) => sum + (link.clickCount ?? 0), 0);
  const sortedLinks = [...links].sort((a, b) => (b.clickCount ?? 0) - (a.clickCount ?? 0));
  const topLink = sortedLinks[0];
  const activeCount = links.filter((l) => (l.clickCount ?? 0) > 0).length;
  const maxClicks = topLink?.clickCount ?? 0;
  const chartData = sortedLinks.map((link) => ({
    name: link.title,
    clicks: link.clickCount ?? 0,
  }));

  return (
    <div className="relative min-h-svh overflow-hidden bg-background font-sans antialiased text-foreground pt-14">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_100%_200px,var(--color-primary),transparent)] opacity-[0.03]" />

      <div className="mx-auto w-full max-w-xl px-6 pt-16 pb-24">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-extrabold tracking-tight">통계</h1>
          </div>
          <p className="text-sm text-muted-foreground">내 링크의 클릭 현황을 확인하세요.</p>
        </div>

        {linksLoading ? (
          <div className="py-24 flex justify-center">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : links.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-3xl bg-muted/5">
            <TrendingUp className="w-8 h-8 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground font-medium">아직 추가된 링크가 없습니다.</p>
            <p className="text-xs text-muted-foreground/60 mt-1">링크를 추가하면 통계가 여기에 표시됩니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">

            {/* 총 클릭수 */}
            <Card className="border-border/50 bg-card/40 backdrop-blur-sm px-6 py-5">
              <div className="flex items-center gap-2 mb-2">
                <MousePointerClick className="w-4 h-4 text-primary" />
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">총 클릭수</p>
              </div>
              <p className="text-5xl font-extrabold tracking-tight tabular-nums">
                {totalClicks.toLocaleString()}
              </p>
            </Card>

            {/* 인기 링크 + 활성 링크 */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-border/50 bg-card/40 backdrop-blur-sm px-4 py-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <Trophy className="w-3.5 h-3.5 text-primary" />
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">인기 링크</p>
                </div>
                {topLink && (topLink.clickCount ?? 0) > 0 ? (
                  <>
                    <p className="text-sm font-bold truncate leading-snug">{topLink.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-1 tabular-nums">
                      {topLink.clickCount?.toLocaleString()} 클릭
                    </p>
                  </>
                ) : (
                  <p className="text-sm font-bold text-muted-foreground/40">—</p>
                )}
              </Card>

              <Card className="border-border/50 bg-card/40 backdrop-blur-sm px-4 py-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <Link2 className="w-3.5 h-3.5 text-primary" />
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">활성 링크</p>
                </div>
                <p className="text-3xl font-extrabold tabular-nums leading-none">{activeCount}</p>
                <p className="text-[11px] text-muted-foreground mt-1">/ {links.length}개 링크</p>
              </Card>
            </div>

            {/* 링크별 클릭수 차트 */}
            <Card className="border-border/50 bg-card/40 backdrop-blur-sm px-5 pt-5 pb-3">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-4">링크별 클릭수</p>
              <ChartContainer
                config={chartConfig}
                className="w-full"
                style={{ height: `${Math.max(sortedLinks.length * 44, 160)}px` }}
              >
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: string) => v.length > 13 ? v.slice(0, 12) + "…" : v}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} />
                </BarChart>
              </ChartContainer>
            </Card>

            {/* 상세 리스트 */}
            <Card className="border-border/50 bg-card/40 backdrop-blur-sm p-5">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-4">상세 리스트</p>
              <div className="flex flex-col gap-3.5">
                {sortedLinks.map((link, index) => {
                  const clicks = link.clickCount ?? 0;
                  const pct = maxClicks > 0 ? (clicks / maxClicks) * 100 : 0;
                  return (
                    <div key={link.id} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground/40 w-4 shrink-0 tabular-nums text-right">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-xs font-semibold truncate pr-2">{link.title}</p>
                          <span className="text-xs font-bold tabular-nums text-muted-foreground shrink-0">
                            {clicks.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-1 w-full rounded-full bg-muted/50">
                          <div
                            className="h-1 rounded-full bg-primary/60 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

          </div>
        )}
      </div>
    </div>
  );
}
