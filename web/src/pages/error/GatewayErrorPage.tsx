import { Button, Result, Space } from "antd";
import { useLocation, useNavigate } from "react-router";
import { getErrorPageCopy } from "./errorPageState.ts";

export default function GatewayErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const copy = getErrorPageCopy(
    location.state,
    "Bad Gateway",
    "업스트림 서버 연결에 문제가 발생했습니다. 연결을 다시 시도해 주세요.",
  );

  return (
    <Result
      status="500"
      title={copy.title}
      subTitle={copy.message}
      extra={
        <Space>
          <Button type="primary" onClick={() => window.location.reload()}>
            연결 재시도
          </Button>
          <Button onClick={() => navigate("/")}>홈으로 가기</Button>
        </Space>
      }
    />
  );
}
