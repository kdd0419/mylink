export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  username: string; // email prefix or custom
  bio: string;
  createdAt: Date;
}
