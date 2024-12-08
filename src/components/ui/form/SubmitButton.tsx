import { Button } from "@/shadcn/ui/button";
import { IconRightBrackets } from "@/components/svgs/IconRightBrackets";
import { Row } from "@/components/ui/common";
import { useTranslations } from "next-intl";
import { Control, useFormState } from "react-hook-form";

export default function SubmitButton({ disabled, isNew, control }: {
  isNew: boolean;
  control: Control<any>;
  // 추가적인 disabled 조건
  disabled?: boolean;
}) {
  const tGeneral = useTranslations("general");
  // render 상태에 따라 isDirty가 true로 잘못 적용되는 오류 때문에 dirtyFields를 대신 사용
  const { isValid, dirtyFields } = useFormState({ control });

  return <Row className="justify-end mt-14">
    <Button
      disabled={disabled || !isValid || Object.keys(dirtyFields).length === 0}
      variant="mint"
    >
      {isNew
        ? `${tGeneral("submit")}`
        : `${tGeneral("edit")}`}
      <IconRightBrackets />
    </Button>
  </Row>;
}