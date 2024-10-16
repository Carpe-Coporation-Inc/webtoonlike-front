import { server } from "@/system/axios";
import type * as R from "@backend/types/Invoice.api";
import type { ListInvoiceOptionT } from "@backend/types/Invoice";

const root = "/invoices";

// (GET) /
export async function list(opt: ListInvoiceOptionT): Promise<R.ListRsp> {
  const rsp = await server.get(`${root}/`, { params: opt });
  return rsp.data;
}