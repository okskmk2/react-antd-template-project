import { Button, Result, Space } from "antd";
import { useLocation, useNavigate } from "react-router";
import { getErrorPageCopy } from "./errorPageState.ts";

export default function ForbiddenPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const copy = getErrorPageCopy(
    location.state,
    "Forbidden",
    "이 리소스에 접근할 권한이 없습니다. 권한을 확인한 뒤 다시 시도해 주세요.",
  );

  return (
    <Result
      status="403"
      title={copy.title}
      subTitle={copy.message}
      extra={
        <Space>
          <Button type="primary" onClick={() => window.location.reload()}>
            권한 재확인
          </Button>
          <Button onClick={() => navigate("/")}>홈으로 가기</Button>
        </Space>
      }
    />
  );
}
