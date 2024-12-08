import { useToast } from "@/shadcn/hooks/use-toast";
import { useRouter } from "@/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import useSafeActionForm from "@/hooks/safeActionForm";
import { createOffer } from "@/resources/offers/controllers/offerProposal.controller";
import { OfferProposalFormSchema } from "@/resources/offers/dtos/offerProposal.dto";
import FormWrapper from "@/components/forms/offer/FormWrapper";
import { useTranslations } from "next-intl";

export default function OfferForm({ bidRoundId }: {
  bidRoundId: number;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations("offerDetails");
  const safeActionFormReturn = useSafeActionForm(
    createOffer.bind(null, bidRoundId),
    {
      resolver: zodResolver(OfferProposalFormSchema),
      mode: "onChange",
      actionProps: {
        onSuccess: () => {
          toast({
            description: t("makeOfferToast")
          });
          router.replace("/offers", {
            scroll: true
          });
        }
      }
    });
  return <FormWrapper title={t("makeOffer")} {...safeActionFormReturn}/>;
}
