import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { buildFileUrl } from "@merchant/utils";
import { cn } from "@merchant/ui/lib/utils";

type Props = {
  className?: string;
  title?: string;
};

function Loading({ className, title = "Loading..." }: Props) {
  const url = buildFileUrl("merchant-saas/assets/lotties/Loading.lottie");
  return (
    <div
      className={cn(
        "flex flex-col gap-y-2 items-center justify-center",
        className,
      )}
    >
      <DotLottieReact src={url} loop autoplay />
      <p className="text-muted-foreground text-sm">{title}</p>
    </div>
  );
}

export default Loading;
