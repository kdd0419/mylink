"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profileFormSchema, ProfileFormValues } from "@/lib/validations";
import { UserProfile } from "@/data/user";
import { toast } from "sonner";

interface ProfileEditDialogProps {
  profile: UserProfile | null;
  onUpdate: (values: ProfileFormValues) => Promise<{ success: boolean; error?: string }>;
}

export function ProfileEditDialog({ profile, onUpdate }: ProfileEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: profile?.username || "",
      displayName: profile?.displayName || "",
      bio: profile?.bio || "",
    },
  });

  const bioValue = useWatch({
    control,
    name: "bio",
    defaultValue: "",
  });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      setIsUpdating(true);
      const result = await onUpdate(values);
      
      if (result.success) {
        toast.success("프로필이 저장되었습니다.");
        setOpen(false);
      } else {
        toast.error(result.error || "업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenChange = (val: boolean) => {
    if (isUpdating) return;
    setOpen(val);
    if (val && profile) {
      reset({
        username: profile.username,
        displayName: profile.displayName || "",
        bio: profile.bio,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="h-8 rounded-lg gap-1.5 text-xs font-medium border-border/50 bg-background/50 backdrop-blur-sm">
            <Settings2 className="w-3.5 h-3.5" />
            프로필 수정
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>프로필 수정</DialogTitle>
            <DialogDescription>
              사용자 이름, 표시 이름 및 소개글을 관리합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-6">
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-sm font-medium">
                사용자 이름 (URL)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  @
                </span>
                <Input
                  id="username"
                  placeholder="username"
                  className={`h-11 rounded-xl pl-8 ${errors.username ? "border-destructive ring-destructive/20" : ""}`}
                  {...register("username")}
                  disabled={isUpdating}
                />
              </div>
              {errors.username ? (
                <p className="text-[11px] text-destructive font-medium ml-1">
                  {errors.username.message}
                </p>
              ) : (
                <p className="text-[11px] text-muted-foreground ml-1">
                  프로필 주소: mylink.com/{profile?.username}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="displayName" className="text-sm font-medium">
                표시 이름
              </Label>
              <Input
                id="displayName"
                placeholder="표시 이름을 입력하세요"
                className={`h-11 rounded-xl ${errors.displayName ? "border-destructive ring-destructive/20" : ""}`}
                {...register("displayName")}
                disabled={isUpdating}
              />
              {errors.displayName && (
                <p className="text-[11px] text-destructive font-medium ml-1">
                  {errors.displayName.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="bio" className="text-sm font-medium">
                  소개글
                </Label>
                <span className={`text-[10px] ${bioValue.length > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {bioValue.length}/160
                </span>
              </div>
              <textarea
                id="bio"
                placeholder="자신을 소개하는 한 줄을 입력하세요"
                rows={3}
                className={`flex min-h-[80px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none ${errors.bio ? "border-destructive ring-destructive/20" : ""}`}
                {...register("bio")}
                disabled={isUpdating}
              />
              {errors.bio && (
                <p className="text-[11px] text-destructive font-medium ml-1">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full h-11 rounded-xl font-semibold" disabled={isUpdating}>
              {isUpdating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "저장하기"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
