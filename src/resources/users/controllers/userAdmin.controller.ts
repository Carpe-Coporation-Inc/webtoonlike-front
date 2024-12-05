"use server";

// /admin/users
import { action } from "@/handlers/safeAction";
import z from "zod";
import { ListResponse, PaginationSchema } from "@/resources/globalTypes";
import {
  AdminPageAccountT,
  NonAdminUserSearchT
} from "@/resources/users/dtos/userAdmin.dto";
import userAdminService from "@/resources/users/services/userAdmin.service";

export const listUsers = action
  .metadata({ actionName: "listUsers" })
  .schema(PaginationSchema)
  .action(async ({ parsedInput }) : Promise<ListResponse<AdminPageAccountT>> => {
    return userAdminService.list(parsedInput);
  });

// /admin/admins
const NonAdminUserSearchQuerySchema = z.object({
  q: z.string()
});
export type NonAdminUserSearchQueryT = z.infer<typeof NonAdminUserSearchQuerySchema>;
export const searchNonAdminUsers = action
  .metadata({ actionName: "SearchNonAdminUsers" })
  .schema(NonAdminUserSearchQuerySchema)
  .action(async ({ parsedInput }): Promise<NonAdminUserSearchT[]> => {
    return userAdminService.searchNonAdminUsers(parsedInput);
  });
