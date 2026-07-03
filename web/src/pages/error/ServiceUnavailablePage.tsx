import { Button, Result, Space } from "antd";
import { useLocation, useNavigate } from "react-router";
import { getErrorPageCopy } from "./errorPageState.ts";

export default function ServiceUnavailablePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const copy = getErrorPageCopy(
    location.state,
    "Service Unavailable",
    "서비스가 일시적으로 불가능합니다. 잠시 후 다시 시도해 주세요.",
  );

  return (
    <Result
      status="500"
      title={copy.title}
      subTitle={copy.message}
      extra={
        <Space>
          <Button type="primary" onClick={() => window.location.reload()}>
            서비스 재시도
          </Button>
          <Button onClick={() => navigate("/")}>홈으로 가기</Button>
        </Space>
      }
    />
  );
}
