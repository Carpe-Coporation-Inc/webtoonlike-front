"use client";

import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks/Snackbar";
import { WebtoonEpisodeForm } from "@/components/WebtoonEpisodeForm";
import * as WebtoonEpisodeApi from "@/apis/webtoon_episodes";
import type { WebtoonEpisodeFormT, WebtoonEpisodeImageFormT } from "@/types";

type CreateWebtoonEpisodeProps = {
  webtoonId: number;
};

export function CreateWebtoonEpisodeForm({ webtoonId }: CreateWebtoonEpisodeProps) {

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(form: WebtoonEpisodeFormT, images: WebtoonEpisodeImageFormT[]) {
    try {
      const created = await WebtoonEpisodeApi.create(form, { images });
      enqueueSnackbar("webtoon post successfully created", { variant: "success" });
      // router.replace(`/webtoons/${webtoonId}/episodes/${created.id}`);
      router.replace(`/webtoons/${webtoonId}`);
    } catch (e: any) {
      if (e.response.data.code === "ALREADY_EXIST") {
        enqueueSnackbar("이미 등록한 회차 번호는 사용할 수 없습니다.", { variant: "error" });
      } else {
        enqueueSnackbar("webtoon create failed", { variant: "error" });
      }
      console.warn(e);
    }
  }

  return (
    <WebtoonEpisodeForm
      webtoonId={webtoonId}
      onSubmit={handleSubmit}
    />
  );
}