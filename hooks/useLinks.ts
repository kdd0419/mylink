"use client";

import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Link } from "@/data/links";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export async function incrementClickCount(uid: string, linkId: string): Promise<void> {
  try {
    const linkDocRef = doc(db, "users", uid, "links", linkId);
    await updateDoc(linkDocRef, { clickCount: increment(1) });
  } catch (error) {
    console.error("Failed to track link click:", error);
  }
}

export function useLinks(uid: string | undefined) {
  const queryClient = useQueryClient();

  // 링크 목록 조회 쿼리
  const { data: links = [], isLoading, error } = useQuery({
    queryKey: ["links", uid],
    queryFn: async (): Promise<Link[]> => {
      if (!uid) return [];

      const linksCollectionRef = collection(db, "users", uid, "links");
      const q = query(linksCollectionRef, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Link[];
    },
    enabled: !!uid,
  });

  // 링크 추가 뮤테이션
  const addLinkMutation = useMutation({
    mutationFn: async ({ title, url }: { title: string; url: string }) => {
      if (!uid) throw new Error("로그인이 필요합니다.");
      const linksCollectionRef = collection(db, "users", uid, "links");
      const now = serverTimestamp();
      const docRef = await addDoc(linksCollectionRef, {
        title,
        url,
        createdAt: now,
        updatedAt: now,
      });
      return { id: docRef.id, title, url };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", uid] });
    },
  });

  // 링크 삭제 뮤테이션
  const deleteLinkMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!uid) throw new Error("로그인이 필요합니다.");
      const linkDocRef = doc(db, "users", uid, "links", id);
      await deleteDoc(linkDocRef);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", uid] });
    },
  });

  // 링크 수정 뮤테이션
  const updateLinkMutation = useMutation({
    mutationFn: async ({ id, title, url }: { id: string; title: string; url: string }) => {
      if (!uid) throw new Error("로그인이 필요합니다.");
      const linkDocRef = doc(db, "users", uid, "links", id);
      await updateDoc(linkDocRef, {
        title,
        url,
        updatedAt: serverTimestamp(),
      });
      return { id, title, url };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", uid] });
    },
  });

  return {
    links,
    isLoading,
    error: error as Error | null,
    addLink: async (title: string, url: string) => addLinkMutation.mutateAsync({ title, url }),
    deleteLink: async (id: string) => deleteLinkMutation.mutateAsync(id),
    updateLink: async (id: string, title: string, url: string) => updateLinkMutation.mutateAsync({ id, title, url }),
    isAdding: addLinkMutation.isPending,
    isDeleting: deleteLinkMutation.isPending,
    isUpdating: updateLinkMutation.isPending,
  };
}
