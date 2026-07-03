import { Button, Result, Space } from "antd";
import { useLocation, useNavigate } from "react-router";
import { getErrorPageCopy } from "./errorPageState.ts";

export default function ServerErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const copy = getErrorPageCopy(
    location.state,
    "Internal Server Error",
    "서버에서 예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  );

  return (
    <Result
      status="500"
      title={copy.title}
      subTitle={copy.message}
      extra={
        <Space>
          <Button type="primary" onClick={() => window.location.reload()}>
            다시 시도
          </Button>
          <Button onClick={() => navigate("/")}>홈으로 가기</Button>
        </Space>
      }
    />
  );
}
