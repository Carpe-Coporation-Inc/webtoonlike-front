import { getEpisode } from "@/resources/webtoonEpisodes/webtoonEpisode.controller";
import WebtoonEpisodeForm from "@/components/forms/WebtoonEpisodeForm";
import PageLayout from "@/components/ui/PageLayout";
import { serverResponseHandler } from "@/handlers/serverResponseHandler";

export default async function UpdateWebtoonEpisode(
  { params }:
  {params: Promise<{webtoonId: string; episodeId: string}>},
) {

  const { webtoonId, episodeId } = await params
    .then(({ webtoonId, episodeId }) => ({
      webtoonId: Number(webtoonId),
      episodeId: Number(episodeId)
    }));
  const episode = await getEpisode(webtoonId, episodeId)
    .then(serverResponseHandler);

  return (
    <PageLayout>
      <WebtoonEpisodeForm prev={episode} webtoonId={Number(episode.webtoonId)} />
    </PageLayout>
  );
}
