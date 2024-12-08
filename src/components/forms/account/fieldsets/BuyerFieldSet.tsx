import { useMemo } from "react";
import { Input } from "@/shadcn/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/ui/select";
import MultipleSelector from "@/shadcn/ui/multi-select";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import {
  BuyerCompanyFieldSchema,
  BuyerCompanyTypeSchema,
  BuyerPurposeSchema,
} from "@/resources/buyers/buyer.dto";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shadcn/ui/form";
import { FileDirectoryT } from "@/resources/files/files.type";
import {
  UserAccountWithBuyerFormT,
} from "@/resources/users/dtos/user.dto";
import useAccountFormImage from "@/components/forms/account/components/AccountFormImage";


export default function useBuyerFieldSet(form: UseFormReturn<UserAccountWithBuyerFormT>) {
  const thumbnail = useAccountFormImage({
    form,
    name: "buyer.thumbPath",
    directory: FileDirectoryT.BuyersThumbnails
  });
  const businessCert = useAccountFormImage({
    form,
    name: "buyer.businessCertificatePath",
    directory: FileDirectoryT.BuyersCerts
  });
  const businessCard = useAccountFormImage({
    form,
    name: "buyer.businessCardPath",
    directory: FileDirectoryT.BuyersCards
  });

  const t = useTranslations("buyerInfoPage");
  const element = (
    <fieldset>
      <BusinessNumberField form={form}/>
      <BusinessFieldField form={form}/>
      <BusinessTypeField form={form}/>
      <businessCert.ImageFormField
        placeholder={t("uploadBusinessReg")}
        label={t("businessReg")}/>

      <hr className="my-5"/>

      <BusinessNameField form={form}/>
      <thumbnail.ImageFormField
        placeholder={t("insertCompanyLogo")}
        label={t("companyLogo")}/>
      <DepartmentField form={form}/>
      <PositionField form={form}/>
      <RoleField form={form}/>
      <businessCard.ImageFormField
        placeholder={t("attachEmploymentCert")}
        label={t("employmentCert")}/>

      <hr className="my-5"/>

      <PurposeField form={form}/>
    </fieldset>
  );

  return {
    element,
    beforeSubmission: async () => {
      await thumbnail.beforeSubmission();
      await businessCert.beforeSubmission();
      await businessCard.beforeSubmission();
    }
  };
}

function BusinessNumberField({ form }: {
  form: UseFormReturn<UserAccountWithBuyerFormT>;
}) {
  const t = useTranslations("buyerInfoPage");

  const registeredField = useMemo(() => form.register("buyer.businessNumber", {
    setValueAs: (rawInput: string) => {
      // Remove non-numeric
      const numericOnly = rawInput.replace(/\D/g, "").slice(0, 10);

      // Insert hyphens where relevant
      return numericOnly
        .replace(/^(\d{1,3})(\d{1,2})?(\d{1,5})?$/, (match, p1, p2, p3) => {
          let result = p1; // Always include the first group (1-3 digits)
          if (p2) result += `-${p2}`; // Add the second group (1-2 digits) if available
          if (p3) result += `-${p3}`; // Add the third group (1-5 digits) if available
          return result;
        });
    }
  }), [form]);

  return <FormField
    control={form.control}
    name={registeredField.name}
    defaultValue=""
    render={({ field }) => {
      return <FormItem>
        <FormLabel>{t("businessRegNo")}</FormLabel>
        <FormControl>
          <Input
            {...field}
            {...registeredField}
            type="text"
            inputMode="numeric"
            placeholder={t("businessRegPlaceholder")}
          />
        </FormControl>
        <FormMessage/>
      </FormItem>;
    }}
  />;
}

function BusinessFieldField({ form }: {
  form: UseFormReturn<UserAccountWithBuyerFormT>;
}) {
  const t = useTranslations("buyerInfoPage");
  const tBusinessFields = useTranslations("businessFields");

  const options = BuyerCompanyFieldSchema.options
    .map(value => ({
      label: tBusinessFields(value, { plural: false }), value
    }));

  return <FormField
    control={form.control}
    name="buyer.businessField"
    defaultValue={[]}
    render={({ field }) => {
      const preSelectOptions = options.filter(option => field.value.includes(option.value));
      return <FormItem>
        <FormLabel>{t("businessField")}</FormLabel>
        <FormControl>
          <MultipleSelector
            onChange={(options) => {
              form.setValue(field.name,
                options.map(o => BuyerCompanyFieldSchema.parse(o.value)), {
                  shouldValidate: true
                }
              );
            }}
            inputProps={{
              name: field.name
            }}
            value={preSelectOptions}
            defaultOptions={options}
            placeholder={t("businessFieldPlaceholder")}
            hidePlaceholderWhenSelected
          />
        </FormControl>
        <FormMessage/>
      </FormItem>;
    }}
  />;
}

function BusinessTypeField({ form }: {
  form: UseFormReturn<UserAccountWithBuyerFormT>;
}) {
  const t = useTranslations("buyerInfoPage");
  const options = BuyerCompanyTypeSchema.options
    .map(value => ({
      label: t(`businessTypeItems.${value}`), value
    }));

  return <FormField
    control={form.control}
    name="buyer.businessType"
    defaultValue={[]}
    render={({ field }) => {
      const preSelectOptions = options.filter(option => field.value.includes(option.value));
      return <FormItem>
        <FormLabel>{t("businessType")}</FormLabel>
        <FormControl>
          <MultipleSelector
            onChange={(options) => {
              form.setValue(field.name,
                options.map(o => BuyerCompanyTypeSchema.parse(o.value)), {
                  shouldValidate: true
                }
              );
            }}
            inputProps={{
              name: field.name
            }}
            value={preSelectOptions}
            defaultOptions={options}
            placeholder={t("businessTypePlaceholder")}
            hidePlaceholderWhenSelected
          />
        </FormControl>
        <FormMessage/>
      </FormItem>;
    }}
  />;
}

function BusinessNameField({ form }: {
  form: UseFormReturn<UserAccountWithBuyerFormT>;
}) {
  const t = useTranslations("buyerInfoPage");

  return <FormField
    control={form.control}
    name="buyer.name"
    defaultValue=""
    render={({ field }) => (
      <FormItem>
        <FormLabel>{t("companyName")}</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="text"
            placeholder={t("insertCompanyName")}
          />
        </FormControl>
        <FormMessage/>
      </FormItem>
    )}
  />;
}

function DepartmentField({ form }: {
  form: UseFormReturn<UserAccountWithBuyerFormT>;
}) {
  const t = useTranslations("buyerInfoPage");

  return <FormField
    control={form.control}
    name="buyer.department"
    defaultValue=""
    render={({ field }) => (
      <FormItem>
        <FormLabel>{t("businessUnit")}</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="text"
            placeholder={t("insertBusinessUnit")}
          />
        </FormControl>
        <FormMessage/>
      </FormItem>
    )}
  />;
}

function PositionField({ form }: {
  form: UseFormReturn<UserAccountWithBuyerFormT>;
}) {
  const t = useTranslations("buyerInfoPage");
  return <FormField
    control={form.control}
    name="buyer.position"
    defaultValue=""
    render={({ field }) => (
      <FormItem>
        <FormLabel>{t("businessPosition")}</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="text"
            placeholder={t("insertBusinessPosition")}
          />
        </FormControl>
        <FormMessage/>
      </FormItem>
    )}
  />;
}

function RoleField({ form }: {
  form: UseFormReturn<UserAccountWithBuyerFormT>;
}) {
  const t = useTranslations("buyerInfoPage");

  return <FormField
    control={form.control}
    name="buyer.role"
    defaultValue=""
    render={({ field }) => (
      <FormItem>
        <FormLabel>{t("inChargeOf")}</FormLabel>
        <FormControl>
          <Input
            {...field}
            type="text"
            placeholder={t("insertInChargeOf")}
          />
        </FormControl>
        <FormMessage/>
      </FormItem>
    )}
  />;
}

function PurposeField({ form }: {
  form: UseFormReturn<UserAccountWithBuyerFormT>;
}) {
  const t = useTranslations("buyerInfoPage");

  return <FormField
    control={form.control}
    name="buyer.purpose"
    render={({ field }) => (
      <FormItem>
        <FormLabel>{t("purposeLabel")}</FormLabel>
        <FormControl>
          <Select
            name={field.name}
            defaultValue={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("purposePlaceholder")}/>
            </SelectTrigger>
            <SelectContent>
              {BuyerPurposeSchema.options.map((value) => (
                <SelectItem key={value} value={value}>
                  {t(`purpose.${value}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

        </FormControl>
        <FormMessage/>
      </FormItem>
    )}
  />;
}