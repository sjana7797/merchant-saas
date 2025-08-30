import type { ReactNode } from "react";

type Props = {
  condition: boolean;
  children: ReactNode;
};

function Render({ condition, children }: Props) {
  return condition ? <>{children}</> : null;
}

export default Render;
