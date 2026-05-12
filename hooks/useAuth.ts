"use client";

import { useState, useEffect } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User 
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { UserProfile } from "@/data/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 프로필 조회 쿼리
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", user?.uid],
    queryFn: async (): Promise<UserProfile | null> => {
      if (!user) return null;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          uid: user.uid,
          email: user.email,
          displayName: data.displayName || user.displayName,
          photoURL: user.photoURL,
          username: data.username,
          bio: data.bio,
          createdAt: data.createdAt?.toDate() || new Date(),
        };
      } else {
        // 신규 유저 초기화
        const username = user.email?.split("@")[0] || "user";
        const newProfileData = {
          username,
          bio: "반갑습니다! 제 마이링크에 오신 것을 환영합니다.",
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
        };

        await setDoc(userDocRef, newProfileData);

        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          username,
          bio: "반갑습니다! 제 마이링크에 오신 것을 환영합니다.",
          createdAt: new Date(),
        };
      }
    },
    enabled: !!user,
  });

  // 프로필 업데이트 뮤테이션 (낙관적 업데이트 적용)
  const updateProfileMutation = useMutation({
    mutationFn: async (data: { username: string; displayName: string; bio: string }) => {
      if (!user) throw new Error("로그인이 필요합니다.");

      const updates: Record<string, any> = {};
      const changedFields: string[] = [];

      // 1. 변경된 필드만 식별
      if (data.username !== profile?.username) {
        // Username 중복 체크 (본인 제외)
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", data.username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          throw new Error("이미 사용 중인 사용자 이름입니다.");
        }
        updates.username = data.username;
        changedFields.push("username");
      }

      if (data.displayName !== profile?.displayName) {
        updates.displayName = data.displayName;
        changedFields.push("displayName");
      }

      if (data.bio !== profile?.bio) {
        updates.bio = data.bio;
        changedFields.push("bio");
      }

      // 변경 사항이 없으면 조기 종료
      if (changedFields.length === 0) {
        return data;
      }

      // 2. Firestore 업데이트
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, updates);

      return data;
    },
    onMutate: async (newData) => {
      // ... (기존 로직 유지)

      await queryClient.cancelQueries({ queryKey: ["profile", user?.uid] });

      // 이전 값 스냅샷 저장
      const previousProfile = queryClient.getQueryData<UserProfile>(["profile", user?.uid]);

      // 낙관적으로 캐시 업데이트
      if (previousProfile) {
        queryClient.setQueryData(["profile", user?.uid], {
          ...previousProfile,
          ...newData,
        });
      }

      return { previousProfile };
    },
    onError: (err, newData, context) => {
      // 에러 발생 시 롤백
      if (context?.previousProfile) {
        queryClient.setQueryData(["profile", user?.uid], context.previousProfile);
      }
    },
    onSettled: () => {
      // 완료 후 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: ["profile", user?.uid] });
    },
  });

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      queryClient.clear(); // 로그아웃 시 모든 캐시 삭제
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateProfile = async (data: { username: string; displayName: string; bio: string }) => {
    // 변경 사항이 전혀 없으면 DB 요청 없이 즉시 성공 반환
    if (
      data.username === profile?.username &&
      data.displayName === profile?.displayName &&
      data.bio === profile?.bio
    ) {
      return { success: true };
    }

    try {
      await updateProfileMutation.mutateAsync(data);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    profile,
    loading: authLoading || (!!user && profileLoading),
    loginWithGoogle,
    logout,
    updateProfile,
    isUpdating: updateProfileMutation.isPending,
  };
}
