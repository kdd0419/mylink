"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, User } from "lucide-react";
import { LinkAddDialog } from "@/components/shared/link-add-dialog";
import { LinkItem } from "@/components/shared/link-item";
import { LinkDeleteDialog } from "@/components/shared/link-delete-dialog";
import { useLinks } from "@/hooks/useLinks";
import { useAuth } from "@/hooks/useAuth";
import { Landing } from "@/components/shared/landing";
import { Link } from "@/data/links";

export default function Page() {
  const { user, profile, loading: authLoading } = useAuth();
  const { links, isLoading: linksLoading, addLink, deleteLink, updateLink } = useLinks(user?.uid);
  const [linkToDelete, setLinkToDelete] = useState<Link | null>(null);

  const handleAddLink = async (title: string, url: string) => {
    await addLink(title, url);
  };

  const handleUpdateLink = async (id: string, title: string, url: string) => {
    await updateLink(id, title, url);
  };

  const handleDeleteLink = async (id: string) => {
    await deleteLink(id);
  };

  if (authLoading) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative min-h-svh overflow-hidden bg-background font-sans antialiased text-foreground pt-14">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <Landing />
      </div>
    );
  }

  return (
    <div className="relative min-h-svh overflow-hidden bg-background font-sans antialiased text-foreground pt-14">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_100%_200px,var(--color-primary),transparent)] opacity-[0.03]"></div>

      <div className="mx-auto flex w-full max-w-xl flex-col items-center px-6 pt-16 pb-24">
        {/* Profile Section */}
        <header className="flex flex-col items-center text-center gap-4 mb-10 w-full">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-chart-2 to-primary opacity-70 blur transition duration-500 group-hover:opacity-100 group-hover:duration-200 animate-pulse"></div>
            <div className="relative w-28 h-28 rounded-full bg-card border-2 border-background overflow-hidden flex items-center justify-center">
              {profile?.photoURL ? (
                <img src={profile.photoURL} alt={profile.displayName || "Profile"} className="w-full h-full object-cover" />
              ) : (
                <div className="bg-muted w-full h-full flex items-center justify-center">
                  <User className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-1.5">
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center justify-center gap-2">
              @{profile?.username || "user"}
            </h1>
            <p className="text-muted-foreground text-sm max-w-[320px] leading-relaxed">
              {profile?.bio}
            </p>
          </div>

          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="rounded-full h-8 gap-1.5 text-xs bg-background/50 backdrop-blur-sm">
              <Share2 className="w-3.5 h-3.5" />
              공유하기
            </Button>
          </div>
        </header>

        {/* Action Section */}
        <div className="w-full mb-8">
          <LinkAddDialog onAdd={handleAddLink} />
        </div>

        {/* Links Section */}
        <main className="w-full flex flex-col gap-3.5">
          {linksLoading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-sm text-muted-foreground animate-pulse">링크를 불러오는 중...</p>
            </div>
          ) : (
            <>
              {links.map((link) => (
                <LinkItem
                  key={link.id}
                  link={link}
                  onUpdate={handleUpdateLink}
                  onDeleteRequest={(l) => setLinkToDelete(l)}
                />
              ))}

              {links.length === 0 && (
                <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-3xl bg-muted/5">
                  <p className="text-sm text-muted-foreground font-medium">아직 추가된 링크가 없습니다.</p>
                  <p className="text-[11px] text-muted-foreground/60 mt-1">새 링크 추가 버튼을 눌러보세요!</p>
                </div>
              )}
            </>
          )}
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

      {/* Delete Confirmation Dialog */}
      <LinkDeleteDialog
        link={linkToDelete}
        isOpen={!!linkToDelete}
        onClose={() => setLinkToDelete(null)}
        onConfirm={handleDeleteLink}
      />
    </div>
  );
}
