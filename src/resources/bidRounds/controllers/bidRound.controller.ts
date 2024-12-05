"use server";

import {
  BidRoundFormSchema, BidRoundT
} from "@/resources/bidRounds/dtos/bidRound.dto";
import z from "zod";
import { action } from "@/handlers/safeAction";
import bidRoundService from "@/resources/bidRounds/services/bidRound.service";

export const createOrUpdateBidRound = action
  .metadata({ actionName: "createOrUpdateBidRound" })
  .bindArgsSchemas([
    z.number(), // webtoonId
    z.number().optional() // bidRoundId
  ])
  .schema(BidRoundFormSchema)
  .action(async ({
    bindArgsParsedInputs: [webtoonId, bidRoundId],
    parsedInput: dataForm,
  }) => {
    if (bidRoundId !== undefined) {
      await bidRoundService.update(bidRoundId, webtoonId, dataForm);
    } else {
      await bidRoundService.create(webtoonId, dataForm);
    }
  });


export const getBidRoundByWebtoonId = action
  .metadata({ actionName: "getBidRoundByWebtoonId" })
  .bindArgsSchemas([
    z.number() // webtoonId
  ])
  .action(async ({ bindArgsParsedInputs: [webtoonId] }): Promise<BidRoundT|undefined> => {
    return bidRoundService.getByWebtoonId(webtoonId);
  });

