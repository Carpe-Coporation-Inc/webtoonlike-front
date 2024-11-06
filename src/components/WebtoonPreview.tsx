import Image from "next/image";
import { Gap } from "@/ui/layouts";
import { buildImgUrl } from "@/utils/media";
import { Text } from "@/ui/texts";
import { useLocale } from "next-intl";
import { WebtoonPreviewT } from "@/resources/webtoons/webtoon.types";
import { Link } from "@/i18n/routing";
import { displayName } from "@/utils/displayName";

export function WebtoonPreview({ webtoon }: {
  webtoon: WebtoonPreviewT;
}) {
  const locale = useLocale();

  return (
    <Link className='mx-2 my-4' href={`/webtoons/${webtoon.id}`}>
      <div className='relative aspect-[3/4] w-full overflow-hidden rounded-md'>
        <Image
          src={buildImgUrl(null, webtoon.thumbPath, { size: "sm" })}
          alt={webtoon.thumbPath}
          fill
          style={{ objectFit: "cover" }}
          priority={true}
        />
      </div>

      <Gap y={5} />

      <Text className='text-[16pt] font-bold text-white'>
        {displayName(locale, webtoon.title, webtoon.title_en)}
      </Text>

      <Text className='text-[12pt] text-gray-text line-clamp-2'>
        {displayName(locale, webtoon.description || "", webtoon.description_en)}
      </Text>

      <Gap y={2} />
      {/*TODO*/}
      {/*{webtoon.authorId == tokenInfo?.userId && (*/}
      {/*  <Row>*/}
      {/*    <Text className="text-white bg-mint px-1 rounded-sm">{locale === "ko" ? "내 작품" : "My work" }</Text>*/}
      {/*  </Row>*/}
      {/*)}*/}
    </Link>
  );
}