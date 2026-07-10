import { CSSProperties, ReactNode } from "react";

interface CardComponentProps {
  title?: string;
  style?: CSSProperties;
  extra?: ReactNode;
  children?: ReactNode;
}

export default function CardComponent({
  title,
  style,
  extra,
  children,
}: CardComponentProps) {
  return (
    <div className="CardComponent" style={style}>
      <div className="CardComponent__head">
        <div className="CardComponent__title">{title}</div>
        <div className="CardComponent__extra">{extra}</div>
      </div>
      <div className="CardComponent__body">{children}</div>
    </div>
  );
}
