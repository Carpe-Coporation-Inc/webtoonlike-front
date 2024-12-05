"use server";

import {
  AdminPageCreatorT,
  PublicCreatorT
} from "@/resources/creators/creator.dto";
import { ListResponse, PaginationSchema } from "@/resources/globalTypes";
import z from "zod";
import { action } from "@/handlers/safeAction";
import creatorService from "@/resources/creators/creator.service";

export const getCreatorByUserId = action
  .metadata({ actionName: "getCreatorByUserId" })
  .bindArgsSchemas([
    z.number() // userId
  ])
  .action(async ({
    bindArgsParsedInputs: [userId],
  }): Promise<PublicCreatorT> => {
    return creatorService.getByUserId(userId);
  });

export const listCreators = action
  .metadata({ actionName: "listCreators" })
  .schema(PaginationSchema)
  .action(async ({ parsedInput }): Promise<ListResponse<AdminPageCreatorT>> => {
    return creatorService.list(parsedInput);
  });

const ChangeExposedSchema = z.object({
  isExposed: z.boolean()
});
export type ChangeExposedT = z.infer<typeof ChangeExposedSchema>;
export const changeExposed = action
  .metadata({ actionName: "changeExposed" })
  .bindArgsSchemas([
    z.number(), // creatorId
  ])
  .schema(ChangeExposedSchema)
  .action(async ({
    bindArgsParsedInputs: [creatorId],
    parsedInput,
  }): Promise<ChangeExposedT> => {
    return creatorService.changeExposed(creatorId, parsedInput);
  });
