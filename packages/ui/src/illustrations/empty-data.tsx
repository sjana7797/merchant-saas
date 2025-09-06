import { getImageUrl } from "@merchant/utils";
import { cn } from "@merchant/ui/lib/utils";

type Props = {
  className?: string;
  title?: string;
};

function EmptyData({ className, title = "No Data found" }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-y-2 items-center select-none border border-dashed bg-white shadow-sm rounded-2xl",
        className,
      )}
    >
      <img
        src={getImageUrl("merchant-saas/assets/svgs/void.svg")}
        className="w-full object-contain"
      />
      <p className="text-muted-foreground text-sm">{title}</p>
    </div>
  );
}

export default EmptyData;
