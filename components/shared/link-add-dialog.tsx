"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
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
import { linkFormSchema, LinkFormValues, formatUrl } from "@/lib/validations";
import { Loader2 } from "lucide-react";

interface LinkAddDialogProps {
  onAdd: (title: string, url: string) => Promise<void>;
}

export function LinkAddDialog({ onAdd }: LinkAddDialogProps) {
  const [open, setOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const titleValue = watch("title") || "";

  const onSubmit = async (values: LinkFormValues) => {
    try {
      setIsAdding(true);
      const formattedUrl = formatUrl(values.url);
      await onAdd(values.title.trim(), formattedUrl);
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Add failed:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleOpenChange = (val: boolean) => {
    if (isAdding) return;
    setOpen(val);
    if (!val) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="w-full h-12 rounded-2xl gap-2 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]">
            <Plus className="w-5 h-5" />
            새 링크 추가
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>새 링크 추가</DialogTitle>
            <DialogDescription>
              표시될 제목과 연결할 URL을 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-6">
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="title" className="text-sm font-medium">
                  링크 제목
                </Label>
                <span className={`text-[10px] ${titleValue.length > 50 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {titleValue.length}/50
                </span>
              </div>
              <Input
                id="title"
                placeholder="예: 내 기술 블로그"
                className={`h-11 rounded-xl ${errors.title ? "border-destructive ring-destructive/20" : ""}`}
                {...register("title")}
                disabled={isAdding}
              />
              {errors.title && (
                <p className="text-[11px] text-destructive font-medium ml-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url" className="text-sm font-medium">
                URL
              </Label>
              <Input
                id="url"
                placeholder="예: velog.io/@username"
                className={`h-11 rounded-xl ${errors.url ? "border-destructive ring-destructive/20" : ""}`}
                {...register("url")}
                disabled={isAdding}
              />
              {errors.url && (
                <p className="text-[11px] text-destructive font-medium ml-1">
                  {errors.url.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full h-11 rounded-xl font-semibold" disabled={isAdding}>
              {isAdding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "추가하기"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
