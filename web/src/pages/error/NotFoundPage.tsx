import { Button, Result, Space } from "antd";
import { useLocation, useNavigate } from "react-router";
import { getErrorPageCopy } from "./errorPageState.ts";

export default function NotFoundPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const copy = getErrorPageCopy(
    location.state,
    "Not Found",
    "요청한 페이지를 찾을 수 없습니다. 주소를 확인하거나 홈으로 이동해 주세요.",
  );

  return (
    <Result
      status="404"
      title={copy.title}
      subTitle={copy.message}
      extra={
        <Space>
          <Button type="primary" onClick={() => navigate(-1)}>
            이전 페이지로
          </Button>
          <Button onClick={() => navigate("/")}>홈으로 가기</Button>
        </Space>
      }
    />
  );
}
