"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, User } from "lucide-react";
import { LinkAddDialog } from "@/components/shared/link-add-dialog";
import { LinkItem } from "@/components/shared/link-item";
import { LinkDeleteDialog } from "@/components/shared/link-delete-dialog";
import { ProfileSection } from "@/components/shared/profile-section";
import { useLinks } from "@/hooks/useLinks";
import { useAuth } from "@/hooks/useAuth";
import { Landing } from "@/components/shared/landing";
import { Link } from "@/data/links";

export default function Page() {
  const { user, profile, loading: authLoading, updateProfile } = useAuth();
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
        <ProfileSection profile={profile ?? null} onUpdate={updateProfile} />

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
