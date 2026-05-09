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

export const formatUrl = (url: string) => {
  let formattedUrl = url.trim();
  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = `https://${formattedUrl}`;
  }
  return formattedUrl;
};
