"use server";

import { action } from "@/handlers/safeAction";
import { ListResponse, PaginationSchema } from "@/resources/globalTypes";
import invoiceService from "@/resources/invoices/services/invoice.service";
import {
  InvoicedOfferT,
  UninvoicedOfferT
} from "@/resources/invoices/dtos/invoice.dto";

export const adminListUninvoicedOffers = action
  .metadata({ actionName: "adminListUninvoicedOffers" })
  .schema(PaginationSchema)
  .action(async ({
    parsedInput: filters
  }): Promise<ListResponse<UninvoicedOfferT>> => {
    return invoiceService.list({
      ...filters,
      isAdmin: true,
      mode: "uninvoiced"
    });
  });

export const adminListInvoicedOffers = action
  .metadata({ actionName: "adminListInvoicedOffers" })
  .schema(PaginationSchema)
  .action(async ({
    parsedInput: filters
  }): Promise<ListResponse<InvoicedOfferT>> => {
    return invoiceService.list({
      ...filters,
      isAdmin: true,
      mode: "invoiced"
    });
  });

export const listUninvoicedOffers = action
  .metadata({ actionName: "listUninvoicedOffers" })
  .schema(PaginationSchema)
  .action(async ({
    parsedInput: filters
  }): Promise<ListResponse<UninvoicedOfferT>> => {
    return invoiceService.list({
      ...filters,
      isAdmin: false,
      mode: "uninvoiced"
    });
  });

export const listInvoicedOffers = action
  .metadata({ actionName: "listInvoicedOffers" })
  .schema(PaginationSchema)
  .action(async ({
    parsedInput: filters
  }): Promise<ListResponse<InvoicedOfferT>> => {
    return invoiceService.list({
      ...filters,
      isAdmin: false,
      mode: "invoiced"
    });
  });

