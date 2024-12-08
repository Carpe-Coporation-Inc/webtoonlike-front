import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath, FieldPathValue,
  FieldValues,
  FormProvider, FormProviderProps,
  useFormContext, UseFormRegister, UseFormRegisterReturn,
} from "react-hook-form";

import { cn } from "@/shadcn/lib/utils";
import { Label } from "@/shadcn/ui/label";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import z from "zod";

type AcceptedSchema = z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>;
type FormSchemaContextValue<
  Schema = AcceptedSchema
> = {
  schema: Schema;
};

const FormSchemaContext = React.createContext<FormSchemaContextValue>(
  {} as FormSchemaContextValue
);

export const Form = <
  Schema extends AcceptedSchema,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>({
  schema, ...props
}: FormProviderProps<z.infer<Schema>, TContext, TTransformedValues>
  & FormSchemaContextValue<Schema>) => {
  return <FormSchemaContext.Provider value={{ schema }}>
    <FormProvider
      {...props}
    />
  </FormSchemaContext.Provider>;
};
Form.displayName = "Form";


type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id, isInline } = itemContext;

  return {
    id,
    isInline,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
  isInline: boolean;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

export const FormItem = ({
  className, forcedIsInline, ...props }: React.ComponentProps<"div"> & {
    forcedIsInline?: boolean;
  }) => {
  const { id: parentId } = React.useContext(FormItemContext);
  const isInline = forcedIsInline ?? !!parentId;
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id, isInline }}>
      <div
        className={cn(className, {
          "flex items-center gap-1.5": isInline,
        })}
        {...props}
      />
    </FormItemContext.Provider>
  );
};
FormItem.displayName = "FormItem";

export const FormLabel = ({
  className, ref, children, ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) => {
  const { error, formItemId, name, isInline } = useFormField();
  const { schema } = React.useContext(FormSchemaContext);

  // 대상 스키마 구하기
  const markOptional = useMemo(() => {
    let zodObject: z.ZodObject<any>;
    if (schema instanceof z.ZodEffects) {
      zodObject = schema.sourceType();
    } else {
      zodObject = schema;
    }

    const targetZodObject = (name?.split(/[,[\].]+?/).filter(Boolean) || [])
      .reduce(
        (targetZodObject, key) => {
          return targetZodObject.shape[key];
        },
        zodObject
      );
    return (!isInline && targetZodObject.isOptional()) || false;
  }, [isInline, name, schema]);

  const t = useTranslations("general");

  return (
    <Label
      ref={ref}
      variant={isInline ? "selectItem" : "mainField"}
      className={cn(error && !isInline && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    >
      {children}{markOptional
      && <span className="text-mint ml-2 text-sm font-normal">{t("optional")}</span>}
    </Label>
  );
};
FormLabel.displayName = "FormLabel";

export const FormControl = ({ ...props }: React.ComponentProps<typeof Slot>) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
};
FormControl.displayName = "FormControl";

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const t = useTranslations("validationErrors");
  const { error, formMessageId } = useFormField();
  let errorMessage = String(error?.message);

  // 번역이 있다면 번역 문구 표시
  if (errorMessage && t.has(errorMessage)) {
    errorMessage = t(errorMessage);
  }

  const body = error
    ? errorMessage
    : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("mt-1.5 text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

// 여기서부터 커스텀
export type FieldNameRestricted<TFieldValues extends FieldValues, AllowedFieldType> = {
  [K in FieldPath<TFieldValues>]: FieldPathValue<TFieldValues, K> extends AllowedFieldType ? K : never;
}[FieldPath<TFieldValues>];

type CustomFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  register: UseFormRegister<TFieldValues>;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  render: ({
    field,
  }: {
    field: UseFormRegisterReturn<TName> & {
      value: string;
    };
  }) => React.ReactElement;
};

export const NumericFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: CustomFormFieldProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <NumericController {...props} />
    </FormFieldContext.Provider>
  );
};

const NumericController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: CustomFormFieldProps<TFieldValues, TName>,
) => props.render(useNumericController<TFieldValues, TName>(props));

function useNumericController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: CustomFormFieldProps<TFieldValues, TName>) {
  const { name, register, defaultValue } = props;
  const [displayValue, setDisplayValue] = React.useState<string>(defaultValue
    ? defaultValue.toString() : "");
  const field = React.useMemo(() => register(name, {
    setValueAs: (rawInput: string) => {
      if (!rawInput) {
        setDisplayValue("");
        return undefined;
      }
      const value = parseInt(rawInput);
      if (!Number.isNaN(value)) {
        setDisplayValue(value.toString());
        return value;
      }
    }
  }), [name, register]);

  return React.useMemo(
    () => ({
      field: {
        ...field,
        value: displayValue,
      }
    }),
    [field, displayValue],
  );
}
