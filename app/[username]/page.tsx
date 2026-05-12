"use client";

import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs, doc, getDoc, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProfile } from "@/data/user";
import { Link as LinkData } from "@/data/links";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { User, Code2, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function UserPublicPage() {
  const { username } = useParams() as { username: string };
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // 1. Username으로 유저 조회
  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ["public-profile", username],
    queryFn: async (): Promise<UserProfile | null> => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) return null;
      
      const userDoc = querySnapshot.docs[0];
      const data = userDoc.data();
      
      return {
        uid: userDoc.id,
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        username: data.username,
        bio: data.bio,
        createdAt: data.createdAt?.toDate() || new Date(),
      };
    },
  });

  // 2. 유저의 링크 목록 조회
  const { data: links = [], isLoading: isLinksLoading } = useQuery({
    queryKey: ["public-links", userProfile?.uid],
    queryFn: async (): Promise<LinkData[]> => {
      if (!userProfile?.uid) return [];
      
      const linksRef = collection(db, "users", userProfile.uid, "links");
      const q = query(linksRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as LinkData[];
    },
    enabled: !!userProfile?.uid,
  });

  if (isUserLoading) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userProfile) {
    notFound();
  }

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  return (
    <div className="relative min-h-svh overflow-hidden bg-background font-sans antialiased text-foreground pt-14">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_100%_200px,var(--color-primary),transparent)] opacity-[0.03]"></div>

      <div className="mx-auto flex w-full max-w-xl flex-col items-center px-6 pt-16 pb-24">
        {/* Profile Section */}
        <header className="flex flex-col items-center text-center gap-4 mb-12 w-full">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-chart-2 to-primary opacity-70 blur transition duration-500 animate-pulse"></div>
            <div className="relative w-28 h-28 rounded-full bg-card border-2 border-background overflow-hidden flex items-center justify-center">
              {userProfile.photoURL ? (
                <Image
                  src={userProfile.photoURL}
                  alt={userProfile.displayName || "Profile"}
                  fill
                  className="object-cover"
                  sizes="112px"
                  priority
                />
              ) : (
                <div className="bg-muted w-full h-full flex items-center justify-center">
                  <User className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5 flex flex-col items-center">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {userProfile.displayName || userProfile.username}
            </h1>
            <p className="text-primary font-medium text-sm">
              @{userProfile.username}
            </p>
            <p className="text-muted-foreground text-sm max-w-[320px] leading-relaxed mt-2 italic">
              {userProfile.bio}
            </p>
          </div>
        </header>

        {/* Links Section */}
        <main className="w-full flex flex-col gap-4">
          {isLinksLoading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-full outline-none"
                >
                  <Card className="relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-accent/40 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
                    <div className="flex items-center p-4 gap-4">
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background border border-border/50 shadow-sm group-hover:border-primary/30 transition-colors overflow-hidden">
                        {!imgErrors[link.id] ? (
                          <Image
                            src={getFaviconUrl(link.url) || ""}
                            alt={link.title}
                            width={24}
                            height={24}
                            className="object-contain z-10"
                            onError={() => setImgErrors(prev => ({ ...prev, [link.id]: true }))}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                            <Code2 className="h-5 w-5 text-muted-foreground/60" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0 text-left">
                        <h2 className="text-sm font-semibold tracking-tight truncate group-hover:text-primary transition-colors">
                          {link.title}
                        </h2>
                        <p className="text-[11px] text-muted-foreground truncate opacity-70">
                          {new URL(link.url).hostname}
                        </p>
                      </div>

                      <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/70 transition-all" />
                    </div>
                  </Card>
                </a>
              ))}

              {links.length === 0 && (
                <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-3xl bg-muted/5">
                  <p className="text-sm text-muted-foreground font-medium">아직 등록된 링크가 없습니다.</p>
                </div>
              )}
            </>
          )}
        </main>

        <footer className="mt-24 flex flex-col items-center gap-4 text-center opacity-50">
          <p className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-[0.2em]">
            Built with My Link
          </p>
        </footer>
      </div>
    </div>
  );
}
