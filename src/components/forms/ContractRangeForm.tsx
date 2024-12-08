import { useTranslations } from "next-intl";
import { Row } from "@/components/ui/common";
import { Button } from "@/shadcn/ui/button";
import { IconCross } from "@/components/svgs/IconCross";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shadcn/ui/select";
import { IconDelete } from "@/components/svgs/IconDelete";
import { UseFormReturn, useWatch } from "react-hook-form";
import { BidRoundFormT, ContractRangeItemSchema, ContractRangeItemT } from "@/resources/bidRounds/dtos/bidRound.dto";
import { FormControl, FormField, FormItem } from "@/shadcn/ui/form";
import { Input } from "@/shadcn/ui/input";
import { OfferProposalFormT } from "@/resources/offers/dtos/offerProposal.dto";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export type FormT = BidRoundFormT | OfferProposalFormT;

export default function ContractRangeForm({ form, formType }: {
  form: UseFormReturn<FormT>;
  formType: "bidRound" | "offerProposal";
}) {
  const t = useTranslations("contractRangeDataForm");

  const contractRange = useWatch({
    control: form.control,
    name: "contractRange"
  });

  return (
    <div>
      <Row className="justify-end">
        <Button variant="mint" onClick={(e) => {
          e.preventDefault();
          const newContractRange = form.getValues("contractRange") || [];
          newContractRange.push({} as FormT["contractRange"][number]);
          form.setValue("contractRange", newContractRange, {
            shouldValidate: true
          });
        }}>
          <IconCross/>
          <span>{t("addItem")}</span>
        </Button>
      </Row>
      <Table className="mt-3 table-fixed [&_th]:text-center [&_td]:text-center">
        <TableHeader>
          <TableRow className="bg-gray-dark hover:bg-gray-dark">
            <TableHead>
              {t("typeOfBusinessRight")}
            </TableHead>
            <TableHead>
              {t("businessRightClassification")}
            </TableHead>
            <TableHead>
              {t("exclusiveRights")}
            </TableHead>
            <TableHead>
              {t("serviceRegion")}
            </TableHead>
            {formType === "offerProposal"
              // 오퍼 폼일 때만 사용하는 컬럼
              && <TableHead>
                {t("contractCondition")}
              </TableHead>}
            <TableHead className="w-[100px]">
              {t("delete")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contractRange && contractRange.map((row, idx) => (
            <TableRowWrapper
              key={idx}
              form={form}
              row={row}
              idx={idx}
              formType={formType}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

enum BusinessRightType {
  Webtoons = "WEBTOONS",
  Secondary = "SECONDARY",
}
type BusinessRightContextValue = {
  businessRight: BusinessRightType | undefined;
  setBusinessRight: Dispatch<SetStateAction<BusinessRightType | undefined>>;
};
const BusinessRightContext = createContext<BusinessRightContextValue>(
  {} as BusinessRightContextValue
);
function TableRowWrapper({ form, row, idx, formType }: {
  form: UseFormReturn<FormT>;
  row: ContractRangeItemT;
  formType: "bidRound" | "offerProposal";
  idx: number;
}) {
  let defaultBusinessRight: BusinessRightType | undefined;
  if (row.businessField === "WEBTOONS") {
    defaultBusinessRight = BusinessRightType.Webtoons;
  } else if (row.businessField) {
    defaultBusinessRight = BusinessRightType.Secondary;
  }
  const [businessRight, setBusinessRight] = useState<BusinessRightType | undefined>(defaultBusinessRight);
  return <TableRow>
    <BusinessRightContext.Provider value={{
      businessRight, setBusinessRight
    }}>
      <BusinessRightCell form={form} row={row} idx={idx} />
      <BusinessFieldCell form={form} idx={idx} />
      <ExclusiveCell form={form} idx={idx} />
      <CountryCell form={form} idx={idx} />

      {formType === "offerProposal"
              // 오퍼 폼일 때만 사용하는 컬럼
              && <ContractConditionCell form={form as UseFormReturn<OfferProposalFormT>} idx={idx} />}

      <DeleteCell form={form} idx={idx} />
    </BusinessRightContext.Provider>
  </TableRow>;
}

function BusinessRightCell({ form, row, idx }: {
  form: UseFormReturn<FormT>;
  row: ContractRangeItemT;
  idx: number;
}) {
  const t = useTranslations("contractRangeDataForm");
  const items = [
    {
      value: BusinessRightType.Webtoons,
      label: t("webtoonSerialRights"),
    },
    {
      value: BusinessRightType.Secondary,
      label: t("secondBusinessRight"),
    }
  ];
  const { businessRight, setBusinessRight } = useContext(BusinessRightContext);

  return <TableCell>
    <Select
      defaultValue={businessRight}
      onValueChange={(value) => {
        setBusinessRight(value as BusinessRightType);
        if (value === BusinessRightType.Webtoons) {
          form.setValue(`contractRange.${idx}.businessField`, "WEBTOONS", {
            shouldValidate: true
          });
        } else if (row.businessField === "WEBTOONS"){
          form.setValue(`contractRange.${idx}.businessField`, undefined as any, {
            shouldValidate: true
          });
        }
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={t("selectTypeOfBusinessRight")} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => {
          return <SelectItem value={item.value} key={item.value}>
            {item.label}
          </SelectItem>;
        })}
      </SelectContent>
    </Select>
  </TableCell>;
}

function BusinessFieldCell({ form, idx }: {
  form: UseFormReturn<FormT>;
  idx: number;
}) {
  const t = useTranslations("contractRangeDataForm");
  const tBusinessFields = useTranslations("businessFields");
  const { businessRight } = useContext(BusinessRightContext);
  if (businessRight !== BusinessRightType.Secondary) {
    return <TableCell>
      -
    </TableCell>;
  }
  return <TableCell>
    <FormField
      control={form.control}
      name={`contractRange.${idx}.businessField`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select
              name={field.name}
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={t("selectBusinessRightClassifications")}
                />
              </SelectTrigger>
              <SelectContent>
                {ContractRangeItemSchema.shape.businessField
                  .exclude(["WEBTOONS"])
                  .options.map((value) => {
                    return <SelectItem value={value} key={value}>
                      {tBusinessFields(value)}
                    </SelectItem>;
                  })}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  </TableCell>;
}

function ExclusiveCell({ form, idx }: {
  form: UseFormReturn<FormT>;
  idx: number;
}) {
  const t = useTranslations("contractRangeDataForm");
  const tContractType = useTranslations("contractType");
  return <TableCell>
    <FormField
      control={form.control}
      name={`contractRange.${idx}.contract`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select
              name={field.name}
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={t("exclusiveRights")}
                />
              </SelectTrigger>
              <SelectContent>
                {ContractRangeItemSchema.shape.contract
                  .options.map((value) => {
                    return <SelectItem value={value} key={value}>
                      {tContractType(value)}
                    </SelectItem>;
                  })}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  </TableCell>;
}

function CountryCell({ form, idx }: {
  form: UseFormReturn<FormT>;
  idx: number;
}) {
  const t = useTranslations("contractRangeDataForm");
  const tCountry = useTranslations("countries");

  return <TableCell>
    <FormField
      control={form.control}
      name={`contractRange.${idx}.country`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select
              name={field.name}
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={t("serviceRegion")}
                />
              </SelectTrigger>
              <SelectContent>
                {ContractRangeItemSchema.shape.country
                  .options.map((value) => {
                    return <SelectItem value={value} key={value}>
                      {tCountry(value)}
                    </SelectItem>;
                  })}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  </TableCell>;
}

// OfferProposalForm에만 사용
function ContractConditionCell({ form, idx }: {
  form: UseFormReturn<OfferProposalFormT>;
  idx: number;
}) {
  const t = useTranslations("contractRangeDataForm");
  return <TableCell>
    <FormField
      control={form.control}
      name={`contractRange.${idx}.message`}
      defaultValue=""
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              type="text"
              placeholder={t("contractConditionDesc")}
            />
          </FormControl>
        </FormItem>
      )}
    />
  </TableCell>;
}

function DeleteCell({ form, idx }: {
  form: UseFormReturn<FormT>;
  idx: number;
}) {
  return <TableCell>
    <Button
      variant="red"
      size="icon"
      onClick={(e) => {
        e.preventDefault();
        const newContractRange = form.getValues("contractRange");
        newContractRange.splice(idx, 1);
        form.setValue("contractRange", newContractRange, {
          shouldValidate: true
        });
      }}
    >
      <IconDelete/>
    </Button>
  </TableCell>;
}