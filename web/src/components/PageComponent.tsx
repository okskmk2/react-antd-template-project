import { ReactNode } from "react";

export default function PageComponent({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="PageComponent">
      <div className="PageHeader">
        <div className="PageTitle">{title}</div>
        <div>{actions}</div>
      </div>
      <div className="PageContent scrollbar">{children}</div>
    </div>
  );
}
