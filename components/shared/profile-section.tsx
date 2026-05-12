"use client";

import { useState, useEffect, useRef } from "react";
import { User, Pencil, Check, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { UserProfile } from "@/data/user";
import { toast } from "sonner";
import { profileFormSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

interface ProfileSectionProps {
  profile: UserProfile | null;
  onUpdate: (data: { username: string; displayName: string; bio: string }) => Promise<{ success: boolean; error?: string }>;
}

type EditField = "displayName" | "username" | "bio" | null;

export function ProfileSection({ profile, onUpdate }: ProfileSectionProps) {
  const [editingField, setEditingField] = useState<EditField>(null);
  const [values, setValues] = useState({
    displayName: "",
    username: "",
    bio: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (profile) {
      setValues({
        displayName: profile.displayName || "",
        username: profile.username || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingField]);

  const handleEdit = (field: EditField) => {
    if (isSaving) return;
    setEditingField(field);
    setError(null);
  };

  const handleCancel = () => {
    if (profile) {
      setValues({
        displayName: profile.displayName || "",
        username: profile.username || "",
        bio: profile.bio || "",
      });
    }
    setEditingField(null);
    setError(null);
  };

  const validateField = (field: string, value: string) => {
    try {
      const fieldSchema = profileFormSchema.shape[field as keyof typeof profileFormSchema.shape];
      fieldSchema.parse(value);
      return true;
    } catch (err: any) {
      setError(err.errors[0].message);
      return false;
    }
  };

  const handleSave = async () => {
    if (!editingField || !profile) return;
    
    const currentValue = values[editingField as keyof typeof values];
    const originalValue = (profile[editingField as keyof UserProfile] as string) || "";

    // 변경 사항이 없으면 종료
    if (currentValue === originalValue) {
      setEditingField(null);
      return;
    }

    // 유효성 검사
    if (!validateField(editingField, currentValue)) {
      return;
    }

    try {
      setIsSaving(true);
      const result = await onUpdate({
        ...values,
        [editingField]: currentValue,
      });

      if (result.success) {
        toast.success("변경 사항이 저장되었습니다.");
        setEditingField(null);
      } else {
        setError(result.error || "저장에 실패했습니다.");
        toast.error(result.error || "저장에 실패했습니다.");
      }
    } catch (err) {
      console.error("Save error:", err);
      toast.error("오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (editingField !== "bio") {
        e.preventDefault();
        handleSave();
      }
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const renderEditableField = (
    field: "displayName" | "username" | "bio",
    content: React.ReactNode,
    className: string
  ) => {
    const isEditing = editingField === field;

    if (isEditing) {
      return (
        <div className="w-full flex flex-col items-center animate-in fade-in duration-200">
          <div className="relative w-full max-w-[320px] px-2 py-1">
            {field === "username" && (
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">@</span>
            )}
            {field === "bio" ? (
              <textarea
                ref={inputRef as any}
                value={values.bio}
                onChange={(e) => setValues({ ...values, bio: e.target.value })}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                disabled={isSaving}
                className={cn(
                  "flex min-h-[80px] w-full bg-transparent p-0 text-sm text-center focus-visible:outline-none resize-none border-none shadow-none leading-relaxed italic",
                  error && "text-destructive"
                )}
                placeholder="소개글을 입력하세요"
              />
            ) : (
            <Input
                ref={inputRef as any}
                value={values[field]}
                onChange={(e) => setValues({ ...values, [field]: e.target.value })}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                disabled={isSaving}
                className={cn(
                  "bg-transparent text-center border-none shadow-none focus-visible:ring-0 p-0 h-auto",
                  field === "username" && "!text-primary font-bold !text-sm leading-tight",
                  field === "displayName" && "!text-3xl font-extrabold tracking-tight leading-tight",
                  error && "text-destructive"
                )}
                placeholder={field === "username" ? "사용자 이름" : "표시 이름"}
              />

            )}
            {isSaving && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
          {error && <p className="text-[11px] text-destructive font-medium mt-1">{error}</p>}
        </div>
      );
    }

    return (
      <div 
        onClick={() => handleEdit(field)}
        className={cn(
          "group relative cursor-pointer rounded-lg px-2 py-1 transition-all hover:bg-muted/50",
          className
        )}
      >
        <div className="relative">
          {content}
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="flex flex-col items-center text-center gap-6 mb-10 w-full">
      {/* Avatar Section */}
      <div className="relative group">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-chart-2 to-primary opacity-70 blur transition duration-500 group-hover:opacity-100 group-hover:duration-200 animate-pulse"></div>
        <div className="relative w-28 h-28 rounded-full bg-card border-2 border-background overflow-hidden flex items-center justify-center shadow-inner">
          {profile?.photoURL ? (
            <Image
              src={profile.photoURL}
              alt={profile.displayName || "Profile"}
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

      {/* Info Section */}
      <div className="space-y-1 flex flex-col items-center w-full max-w-[320px]">
        {renderEditableField(
          "displayName",
          <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
            {profile?.displayName || profile?.username || "user"}
          </h1>,
          "w-fit"
        )}

        {renderEditableField(
          "username",
          <p className="text-primary font-bold text-sm leading-tight">
            @{profile?.username || "user"}
          </p>,
          "w-fit"
        )}

        {renderEditableField(
          "bio",
          <p className="text-muted-foreground text-sm leading-relaxed mt-2 italic">
            {profile?.bio || "소개글이 없습니다."}
          </p>,
          "w-full"
        )}
      </div>
    </header>
  );
}
