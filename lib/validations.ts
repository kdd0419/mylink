import * as z from "zod";

export const linkFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "제목을 입력해주세요." })
    .max(50, { message: "제목은 50자 이내로 입력해주세요." }),
  url: z
    .string()
    .min(1, { message: "URL을 입력해주세요." })
    .transform((val) => {
      const trimmed = val.trim();
      if (!trimmed.includes("://") && trimmed.length > 0) {
        return `https://${trimmed}`;
      }
      return trimmed;
    })
    .pipe(
      z.string().url({ message: "올바른 URL 형식을 입력해주세요 (예: google.com)." })
    ),
});

export type LinkFormValues = z.infer<typeof linkFormSchema>;

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "사용자 이름은 2자 이상이어야 합니다." })
    .max(20, { message: "사용자 이름은 20자 이내여야 합니다." })
    .regex(/^[a-zA-Z0-9_.]+$/, {
      message: "사용자 이름은 영문, 숫자, 밑줄(_), 마침표(.)만 사용할 수 있습니다.",
    }),
  displayName: z
    .string()
    .min(1, { message: "표시 이름을 입력해주세요." })
    .max(30, { message: "표시 이름은 30자 이내여야 합니다." }),
  bio: z
    .string()
    .max(160, { message: "소개글은 160자 이내여야 합니다." }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const formatUrl = (url: string) => {
  let formattedUrl = url.trim();
  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = `https://${formattedUrl}`;
  }
  return formattedUrl;
};
