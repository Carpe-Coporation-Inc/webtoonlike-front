import { Badge, BadgeProps } from "@/shadcn/ui/badge";

export default function StatusBadge({ content, ...rest }: BadgeProps & {
  content: string;
}) {
  return <Badge {...rest} className="min-w-[6.25rem] h-7 justify-center font-semibold text-sm px-3">
    {content}
  </Badge>;
}