"use server";

// /webtoon/create
// /webtoon/[webtoonId]/update
import { action } from "@/handlers/safeAction";
import z from "zod";
import {
  WebtoonDetailsExtendedT,
  WebtoonDetailsT
} from "@/resources/webtoons/dtos/webtoonDetails.dto";
import webtoonDetailsService from "@/resources/webtoons/services/webtoonDetails.service";

export const getWebtoon = action
  .metadata({ actionName: "getWebtoon" })
  .bindArgsSchemas([
    z.number() // webtoonId
  ])
  .action(async ({
    bindArgsParsedInputs: [webtoonId]
  }): Promise<WebtoonDetailsT> => {
    return webtoonDetailsService.getDetails(webtoonId);
  });

// /webtoon/[webtoonId]
export const getWebtoonDetailsExtended = action
  .metadata({ actionName: "getWebtoonDetailsExtended" })
  .bindArgsSchemas([
    z.number() // webtoonId
  ])
  .action(async ({
    bindArgsParsedInputs: [webtoonId]
  }): Promise<WebtoonDetailsExtendedT> => {
    return webtoonDetailsService.getDetailsExtended(webtoonId);
  });
