"use server";

import { action } from "@/handlers/safeAction";
import homeService from "@/resources/home/home.service";
import z from "zod";
import { HomeItemsT, HomeWebtoonItem } from "@/resources/home/home.dto";

export const homeItems = action
  .metadata({ actionName: "homeItems" })
  .action(async (): Promise<HomeItemsT> => {
    return homeService.getHomeItems();
  });

const GenreFilterSchema = z.object({
  genreId: z.number()
});
export type GenreFilterT = z.infer<typeof GenreFilterSchema>;
export const getPerGenreItems = action
  .metadata({ actionName: "getPerGenreItems" })
  .schema(GenreFilterSchema)
  .action(async ({ parsedInput }): Promise<HomeWebtoonItem[]> => {
    return homeService.getPerGenreItems(parsedInput);
  });