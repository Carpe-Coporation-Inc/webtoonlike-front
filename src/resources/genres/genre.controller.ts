"use server";

import { GenreFormSchema, GenreT } from "@/resources/genres/genre.dto";
import z from "zod";
import { action } from "@/handlers/safeAction";
import genreService from "@/resources/genres/genre.service";

export const getGenre = action
  .metadata({ actionName: "getGenre" })
  .bindArgsSchemas([
    z.number()
  ])
  .action(async ({
    bindArgsParsedInputs: [genreId]
  }): Promise<GenreT> => {
    return genreService.get(genreId);
  });

export const listGenres = action
  .metadata({ actionName: "listGenres" })
  .action(async (): Promise<GenreT[]> => {
    return genreService.list();
  });

export const createOrUpdateGenre = action
  .metadata({ actionName: "createOrUpdateGenre" })
  .schema(GenreFormSchema)
  .bindArgsSchemas([
    z.number().optional() // genreId
  ])
  .action(async ({
    bindArgsParsedInputs: [genreId],
    parsedInput: formData,
  }) => {
    if (genreId !== undefined) {
      return genreService.update(genreId, formData);
    } else {
      return genreService.create(formData);
    }
  });

export const deleteGenre = action
  .metadata({ actionName: "deleteGenre" })
  .bindArgsSchemas([
    z.number() // genreId
  ])
  .action(async ({
    bindArgsParsedInputs: [genreId],
  }) => {
    return genreService.delete(genreId);
  });
