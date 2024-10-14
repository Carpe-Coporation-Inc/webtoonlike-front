import { server } from "@/system/axios";
import type * as R from "@/types/BidRequestMessage.api";
import type {

} from "@/types";

const root = "/bid-request-messages";

// (POST) /
export async function create(form: R.CreateRqs): Promise<R.CreateRsp> {
  const rsp = await server.post(`${root}/`, form);
  return rsp.data;
}

// (GET) /
export async function list(listOpt: R.ListRqs): Promise<R.ListRsp> {
  const params: R.ListRqs = listOpt;
  const rsp = await server.get(`${root}/`, { params });
  return rsp.data;
}