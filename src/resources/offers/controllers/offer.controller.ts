"use server";

import {
  OfferWithActiveProposalT, OfferWithBuyerAndWebtoonT,
} from "@/resources/offers/dtos/offer.dto";
import z from "zod";
import { action } from "@/handlers/safeAction";
import offerService from "@/resources/offers/services/offer.service";
import { ListResponse, PaginationSchema } from "@/resources/globalTypes";

// /admin/offers
export const adminListOffersByBidRoundId = action
  .metadata({ actionName: "adminListOffersByBidRoundId" })
  .bindArgsSchemas([
    z.number() // bidRoundId
  ])
  .action(async ({
    bindArgsParsedInputs: [bidRoundId]
  }): Promise<OfferWithActiveProposalT[]> => {
    return offerService.listByBidRoundId(bidRoundId);
  });

export const getOffer = action
  .metadata({ actionName: "getOffer" })
  .bindArgsSchemas([
    z.number() // offerId
  ])
  .action(async ({
    bindArgsParsedInputs: [offerId]
  }): Promise<OfferWithBuyerAndWebtoonT> => {
    return offerService.getOffer(offerId);
  });

export const listAllOffers = action
  .metadata({ actionName: "listAllOffers" })
  .schema(PaginationSchema)
  .action(async ({
    parsedInput: { page }
  }): Promise<ListResponse<OfferWithBuyerAndWebtoonT>> => {
    return offerService.listMyOffers({
      page,
      limit: 10
    });
  });
