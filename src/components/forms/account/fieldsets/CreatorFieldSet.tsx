import { Input } from "@/shadcn/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/shadcn/ui/select";
import { useTranslations } from "next-intl";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shadcn/ui/form";
import { UseFormReturn } from "react-hook-form";
import { UserAccountWithCreatorFormT } from "@/resources/users/dtos/user.dto";
import { FileDirectoryT } from "@/resources/files/files.type";
import useAccountFormImage from "@/components/forms/account/components/AccountFormImage";

export default function useCreatorFieldSet(form: UseFormReturn<UserAccountWithCreatorFormT>) {
  // 번역
  const t = useTranslations("setupPageNextForCreators");

  const thumbnail = useAccountFormImage({
    form,
    name: "creator.thumbPath",
    directory: FileDirectoryT.CreatorsThumbnails
  });

  const element = (
    <fieldset className="contents">
      <thumbnail.ImageFormField
        placeholder={t("uploadProfilePic")}
        label={t("profilePic")}/>
      <FormField
        control={form.control}
        name="creator.isAgencyAffiliated"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("whetherOrNotAffiliated")}</FormLabel>
            <FormControl>
              <Select
                name={field.name}
                defaultValue={field.value?.toString()}
                onValueChange={(value) => field.onChange(JSON.parse(value))}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("affiliationWithAnotherAgencyQuestion")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">{t("affiliation")}</SelectItem>
                  <SelectItem value="false">{t("noAffiliation")}</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="creator.isExperienced"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("workExperience")}</FormLabel>
            <FormControl>
              <Select
                name={field.name}
                defaultValue={field.value?.toString()}
                onValueChange={(value) => field.onChange(JSON.parse(value))}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("selectYourWorkExperience")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">{t("rookie")}</SelectItem>
                  <SelectItem value="true">{t("experienced")}</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="creator.name"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("username")}</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder={t("insertUsername")}
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="creator.name_en"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("usernameInEnglish")}</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder={t("insertUsernameInEnglish")}
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />

    </fieldset>
  );

  return {
    element,
    beforeSubmission: thumbnail.beforeSubmission
  };
}
