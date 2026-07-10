import { ReactNode } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router";

export default function PageComponent({
  title,
  back,
  actions,
  children,
}: {
  title: string;
  back?: boolean;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <div className="PageComponent">
      <div className="PageHeader">
        <div className="PageTitleArea">
          {back && (
            <Button
              type="text"
              size="small"
              icon={<LeftOutlined />}
              onClick={() => navigate(-1)}
            />
          )}
          <div className="PageTitle">{title}</div>
        </div>
        <div>{actions}</div>
      </div>
      <div className="PageContent scrollbar">{children}</div>
    </div>
  );
}
