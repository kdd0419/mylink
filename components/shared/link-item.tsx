"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  ExternalLink, 
  Code2, 
  Trash2, 
  Pencil, 
  Check, 
  X,
  Loader2
} from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/data/links";
import { linkFormSchema, LinkFormValues, formatUrl } from "@/lib/validations";

interface LinkItemProps {
  link: Link;
  onUpdate: (id: string, title: string, url: string) => Promise<void>;
  onDeleteRequest: (link: Link) => void;
}

export function LinkItem({ link, onUpdate, onDeleteRequest }: LinkItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [imgError, setImgError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      title: link.title,
      url: link.url,
    },
  });

  // Reset form when link changes or editing is cancelled
  useEffect(() => {
    if (!isEditing) {
      reset({ title: link.title, url: link.url });
    }
  }, [link, isEditing, reset]);

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  const handleSave = async (values: LinkFormValues) => {
    // If nothing changed, just close
    if (values.title === link.title && values.url === link.url) {
      setIsEditing(false);
      return;
    }

    try {
      setIsUpdating(true);
      const formattedUrl = formatUrl(values.url);
      await onUpdate(link.id, values.title.trim(), formattedUrl);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditing(false);
    }
    if (e.key === "Enter") {
      // Prevent form submission on Enter
      e.preventDefault();
    }
  };

  if (isEditing) {
    return (
      <Card className="relative overflow-hidden border-primary/40 bg-card/60 backdrop-blur-md shadow-lg p-4 animate-in fade-in zoom-in-95 duration-200">
        <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="grid gap-1.5 relative">
              <Label htmlFor="edit-title" className="text-[11px] font-bold text-muted-foreground ml-1">
                링크 제목
              </Label>
              <Input
                id="edit-title"
                {...register("title")}
                placeholder="링크 제목을 입력하세요"
                autoFocus
                onKeyDown={handleKeyDown}
                className={`h-9 rounded-lg text-sm font-semibold bg-background/50 ${errors.title ? "border-destructive focus-visible:ring-destructive" : ""}`}
                disabled={isUpdating}
              />
              {errors.title && (
                <p className="absolute -bottom-4 left-1 text-[10px] text-destructive font-medium">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="grid gap-1.5 relative mt-1">
              <Label htmlFor="edit-url" className="text-[11px] font-bold text-muted-foreground ml-1">
                URL
              </Label>
              <Input
                id="edit-url"
                {...register("url")}
                placeholder="URL (예: google.com)"
                onKeyDown={handleKeyDown}
                className={`h-9 rounded-lg text-[12px] bg-background/50 ${errors.url ? "border-destructive focus-visible:ring-destructive" : ""}`}
                disabled={isUpdating}
              />
              {errors.url && (
                <p className="absolute -bottom-4 left-1 text-[10px] text-destructive font-medium">
                  {errors.url.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="h-8 px-3 rounded-lg text-xs"
              disabled={isUpdating}
            >
              <X className="w-3 h-3 mr-1" />
              취소
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-8 px-3 rounded-lg text-xs font-semibold"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  저장
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    );
  }

  return (
    <div className="group relative flex items-center w-full">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 outline-none"
      >
        <Card className="relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-accent/40 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
          <div className="flex items-center p-4 gap-4 pr-24">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background border border-border/50 shadow-sm group-hover:border-primary/30 transition-colors overflow-hidden">
              {!imgError ? (
                <Image
                  src={getFaviconUrl(link.url) || ""}
                  alt={link.title}
                  width={24}
                  height={24}
                  className="object-contain z-10"
                  onError={() => setImgError(true)}
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

            <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/70 transition-all mr-2" />
          </div>
        </Card>
      </a>

      {/* Action Buttons - Always Visible as per request */}
      <div className="absolute right-3 flex gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(true);
          }}
          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          title="링크 수정"
        >
          <Pencil className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            onDeleteRequest(link);
          }}
          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          title="링크 삭제"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
