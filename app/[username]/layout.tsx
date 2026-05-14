import type { Metadata } from 'next';

type Props = { params: Promise<{ username: string }> };

async function getUserProfile(username: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId || !apiKey) return null;

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: 'users' }],
            where: {
              fieldFilter: {
                field: { fieldPath: 'username' },
                op: 'EQUAL',
                value: { stringValue: username },
              },
            },
            limit: 1,
          },
        }),
        next: { revalidate: 3600 },
      }
    );

    const data: Array<{ document?: { fields: Record<string, { stringValue?: string }> } }> =
      await res.json();
    const doc = data[0]?.document;
    if (!doc) return null;

    const f = doc.fields;
    return {
      displayName: f.displayName?.stringValue || username,
      bio: f.bio?.stringValue || '',
      username: f.username?.stringValue || username,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const profile = await getUserProfile(username);

  const displayName = profile?.displayName || username;
  const title = profile?.displayName
    ? `${displayName} (@${username})`
    : `@${username}`;
  const description =
    profile?.bio ||
    `My Link에서 @${username}의 링크를 확인하세요. GitHub, 블로그, 포트폴리오 등 다양한 링크가 모여 있어요.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
