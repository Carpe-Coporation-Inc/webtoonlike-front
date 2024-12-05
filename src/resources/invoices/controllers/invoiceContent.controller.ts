"use server";

import { action } from "@/handlers/safeAction";
import z from "zod";
import invoiceContentService from "@/resources/invoices/services/invoiceContent.service";

export const previewInvoice = action
  .metadata({ actionName: "previewInvoice" })
  .bindArgsSchemas([
    z.number() //offerProposalId
  ])
  .action(async ({ bindArgsParsedInputs: [offerProposalId] }): Promise<string> => {
    return invoiceContentService.previewOrCreateInvoice(
      offerProposalId,
      false
    );
  });

export const createInvoice = action
  .metadata({ actionName: "createInvoice" })
  .bindArgsSchemas([
    z.number() //offerProposalId
  ])
  .action(async ({ bindArgsParsedInputs: [offerProposalId] }): Promise<string> => {
    return invoiceContentService.previewOrCreateInvoice(
      offerProposalId,
      true
    );
  });

export const downloadInvoiceContent = action
  .metadata({ actionName: "downloadInvoiceContent" })
  .bindArgsSchemas([
    z.number() // invoiceId
  ])
  .action(async ({ bindArgsParsedInputs: [invoiceId] }): Promise<string> => {
    return invoiceContentService.download(invoiceId);
  });
