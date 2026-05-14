import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '통계',
  description: '내 링크의 클릭 현황을 한눈에 확인하세요. 어떤 링크가 인기 있는지 차트로 시각화됩니다.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
