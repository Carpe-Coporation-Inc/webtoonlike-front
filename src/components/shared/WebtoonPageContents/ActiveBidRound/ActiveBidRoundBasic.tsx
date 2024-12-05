import { BidRoundT } from "@/resources/bidRounds/dtos/bidRound.dto";
import { Col, Row } from "@/components/ui/common";
import { IconExclamation } from "@/components/svgs/IconExclamation";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/shadcn/ui/radio-group";
import { Label } from "@/shadcn/ui/label";
import React from "react";
import { useTranslations } from "next-intl";

export default function ActiveBidRoundBasic({ bidRound }: {
  bidRound: BidRoundT;
}) {

  const t = useTranslations("bidRoundDetails");

  return <div>
    <h2 className="text-lg font-bold">
      {t("generalInformation")}
      <IconExclamation className="ml-1 inline-block"/>
    </h2>
    <Col className="p-5">
      <div className="flex gap-10">
        <IsNewIndicator isNew={bidRound.isNew}/>
        <IsOriginalIndicator isOriginal={bidRound.isOriginal}/>
        <ProgressIndicator bidRound={bidRound}/>
      </div>
    </Col>
  </div>;
}

function IsNewIndicator({ isNew }: {
  isNew: boolean;
}) {
  const t = useTranslations("bidRoundDetails");
  return <Col className="gap-3">
    <p className="text-sm">{t("seriesType")}</p>
    <RadioGroup
      disabled
      value={isNew.toString()}
    >
      <Row className="gap-4">
        <Row className="gap-2">
          <RadioGroupItem value="true" className="border-white" />
          <Label variant="selectItem">{t("newWork")}</Label>
        </Row>
        <Row className="gap-2">
          <RadioGroupItem value="false" className="border-white" />
          <Label variant="selectItem">{t("oldWork")}</Label>
        </Row>
      </Row>
    </RadioGroup>
  </Col>;
}

function IsOriginalIndicator({ isOriginal }: {
  isOriginal: boolean;
}) {
  const t = useTranslations("bidRoundDetails");
  return <Col className="gap-3">
    <p className="text-sm">{t("serviceOnOtherPlatforms")}</p>
    <RadioGroup
      disabled
      value={isOriginal.toString()}
    >
      <Row className="gap-4">
        <Row className="gap-2">
          <RadioGroupItem value="true" className="border-white"/>
          <Label variant="selectItem">{t("yes")}</Label>
        </Row>
        <Row className="gap-2">
          <RadioGroupItem value="false" className="border-white"/>
          <Label variant="selectItem">{t("no")}</Label>
        </Row>
      </Row>
    </RadioGroup>
  </Col>;
}

function ProgressIndicator({ bidRound }: {
  bidRound: BidRoundT;
}) {
  return <>
    {bidRound.isNew
      ? <ProgressIndicatorForNew bidRound={bidRound}/>
      : <ProgressIndicatorForOld bidRound={bidRound}/>}
  </>;
}

function ProgressIndicatorForOld({ bidRound }: {
  bidRound: BidRoundT;
}) {
  const t = useTranslations("bidRoundDetails");

  return <Col className="gap-2">
    <p className="text-sm">{t("serviceEpisodeInformation")}</p>
    <Row className="gap-2">
      <NumericField
        value={bidRound.totalEpisodeCount} label={t("episodesCompleted")}/>
    </Row>
  </Col>;
}

function ProgressIndicatorForNew({ bidRound }: {
  bidRound: BidRoundT;
}) {
  const t = useTranslations("bidRoundDetails");

  return <>
    <Col className="gap-2">
      <p className="text-sm">{t("serviceEpisodeInformation")}</p>
      <Row className="gap-4">
        <NumericField
          value={bidRound.currentEpisodeNo} label={t("currentEpisode")}/>
        <NumericField
          value={bidRound.totalEpisodeCount} label={t("expectingOrFinishedEpisode")}/>
      </Row>
    </Col>
    <Col className="gap-2">
      <p className="text-sm">{t("monthlyProductionAvailableRounds")}</p>
      <Row>
        <NumericField
          value={bidRound.monthlyEpisodeCount} label={t("episodesPossible")}/>
      </Row>
    </Col>
  </>;
}

function NumericField({ label, value }: {
  label: string;
  value?: number;
}) {
  return <Row className="gap-2 text-sm">
    <div className="bg-gray-darker text-center rounded px-2 py-0.5">
      {value?.toString() ?? "-"}
    </div>
    <div>{label}</div>
  </Row>;
}