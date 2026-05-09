"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@/data/links";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface LinkDeleteDialogProps {
  link: Link | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export function LinkDeleteDialog({
  link,
  isOpen,
  onClose,
  onConfirm,
}: LinkDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!link) return null;

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await onConfirm(link.id);
      onClose();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (isDeleting) return;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">정말 삭제하시겠습니까?</DialogTitle>
          <DialogDescription className="pt-2">
            <span className="font-semibold text-foreground">&quot;{link.title}&quot;</span> 링크를 삭제하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-destructive font-medium bg-destructive/5 p-3 rounded-xl border border-destructive/10">
            ⚠️ 이 작업은 되돌릴 수 없습니다.
          </p>
        </div>
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={handleClose}
            className="flex-1 h-11 rounded-xl font-medium"
            disabled={isDeleting}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            className="flex-1 h-11 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "삭제하기"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
