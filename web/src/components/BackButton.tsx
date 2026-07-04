import { Button } from "antd";
import { useNavigate } from "react-router";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      color="default"
      onClick={() => {
        navigate(-1);
      }}
    >
      뒤로가기
    </Button>
  );
}
