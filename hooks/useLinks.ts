"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  addDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Link } from "@/data/links";

export function useLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLinks = useCallback(async (withLoading = true) => {
    try {
      if (withLoading) setIsLoading(true);
      const linksCollectionRef = collection(db, "users", "anonymous", "links");
      const q = query(linksCollectionRef, orderBy("createdAt", "desc"));
      
      const querySnapshot = await getDocs(q);
      const fetchedLinks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Firestore Timestamp를 JS Date로 변환 (서버 타임스탬프 미결정 시 현재 시간 사용)
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Link[];

      setLinks(fetchedLinks);
      setError(null);
    } catch (err) {
      console.error("Firestore fetching error:", err);
      setError(err as Error);
    } finally {
      if (withLoading) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await fetchLinks();
    };
    init();
  }, [fetchLinks]);

  const addLink = async (title: string, url: string) => {
    try {
      const linksCollectionRef = collection(db, "users", "anonymous", "links");
      await addDoc(linksCollectionRef, {
        title,
        url,
        createdAt: serverTimestamp(),
      });
      // 추가 후 목록 갱신
      await fetchLinks();
    } catch (err) {
      console.error("Error adding link:", err);
      throw err;
    }
  };

  const deleteLink = async (id: string) => {
    try {
      const linkDocRef = doc(db, "users", "anonymous", "links", id);
      await deleteDoc(linkDocRef);
      // 삭제 후 목록 갱신
      await fetchLinks();
    } catch (err) {
      console.error("Error deleting link:", err);
      throw err;
    }
  };

  const updateLink = async (id: string, title: string, url: string) => {
    try {
      const { updateDoc } = await import("firebase/firestore");
      const linkDocRef = doc(db, "users", "anonymous", "links", id);
      await updateDoc(linkDocRef, {
        title,
        url,
      });
      // 수정 후 목록 갱신
      await fetchLinks();
    } catch (err) {
      console.error("Error updating link:", err);
      throw err;
    }
  };

  return {
    links,
    isLoading,
    error,
    addLink,
    deleteLink,
    updateLink,
    refresh: fetchLinks,
  };
}
