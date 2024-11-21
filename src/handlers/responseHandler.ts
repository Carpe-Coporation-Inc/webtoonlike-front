import { SafeActionResult } from "next-safe-action";
import { Schema } from "next-safe-action/adapters/types";
import { ActionErrorT } from "@/handlers/errors";

export async function responseHandler<S extends Schema | undefined, BAS extends readonly Schema[], CVE, CBAVE, Data>(
  result: SafeActionResult<ActionErrorT, S, BAS, CVE, CBAVE, Data> | undefined
) {
  if (result?.serverError){
    throw Error(JSON.stringify(result.serverError));
  }
  if (!result?.data) {
    throw Error("Unknown Error");
  }
  return result.data;
}