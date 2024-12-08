import Image from "next/image";
import { FormControl, FormField, FormItem, FormLabel, FieldNameRestricted } from "@/shadcn/ui/form";
import { Input } from "@/shadcn/ui/input";
import { ImageObject } from "@/utils/media";
import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FieldPathValue, FieldValues, UseFormReturn } from "react-hook-form";
import { FileDirectoryT } from "@/resources/files/files.type";


export default function useAccountFormImage<TFieldValues extends FieldValues>({ form, name, directory }: {
  form: UseFormReturn<TFieldValues>;
  name: FieldNameRestricted<TFieldValues, string|undefined>;
  directory: FileDirectoryT;
}){
  const prevPath = form.getValues(name);
  const [image, setImage] = useState(new ImageObject(prevPath));
  const tGeneral = useTranslations("general");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ImageFormField = useCallback(({ placeholder, label }: {
    placeholder: string; label: string;
  }) => <>
    {image.url && <div className="w-[200px] h-[200px] overflow-hidden relative rounded-sm mx-auto mb-5">
      <Image
        draggable={false}
        priority
        src={image.url}
        alt={"thumbnail"}
        style={{ objectFit: "cover" }}
        fill
      />
    </div>}
    <div>
      <FormField
        control={form.control}
        name={name}
        defaultValue={"" as FieldPathValue<TFieldValues, typeof name>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...field} type="hidden" />
            </FormControl>
          </FormItem>
        )}
      />
      <Input
        type="file"
        accept="image/jpeg, image/png"
        className="hidden"
        onChange={(event) => {
          const imageData = new ImageObject(event.target.files?.[0]);
          setImage(imageData);
          form.setValue(name, "filedAdded" as FieldPathValue<TFieldValues, typeof name>, {
            shouldDirty: true
          });
        }}
        ref={fileInputRef}
      />
      <div className="flex h-10 w-full cursor-pointer"
        onClick={() => fileInputRef.current?.click()}>
        <div
          className="flex-1 border border-input rounded-l-md bg-background px-3 py-2 ring-offset-background text-muted-foreground text-base md:text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
          {image?.displayUrl || placeholder}
        </div>
        <div className="flex border-y border-r border-input rounded-r-md bg-mint text-white items-center px-3 text-sm">
          {tGeneral("selectFile")}
        </div>
      </div>
    </div>
  </>, [form, image, name, tGeneral]);
  return {
    ImageFormField,
    beforeSubmission: async () => {
      await image.uploadAndGetRemotePath(directory)
        .then(remotePath => form.setValue(name, remotePath as FieldPathValue<TFieldValues, typeof name>));
    }
  };
}
