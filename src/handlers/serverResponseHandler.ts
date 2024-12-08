import "server-only";
import { SafeActionResult } from "next-safe-action";
import { Schema } from "next-safe-action/adapters/types";
import { ActionErrorT } from "@/handlers/errors";

export async function serverResponseHandler<S extends Schema | undefined, BAS extends readonly Schema[], CVE, CBAVE, Data>(
  result: SafeActionResult<ActionErrorT, S, BAS, CVE, CBAVE, Data> | undefined
) {
  if (result?.serverError){
    throw new Error(JSON.stringify(result.serverError));
  }
  return result?.data as Data;
}