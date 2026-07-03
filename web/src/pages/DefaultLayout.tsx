import { Button, Space } from "antd";
import { Outlet } from "react-router";
import { axiosInstance } from "../axiosClient";
import { callMessage, callModal, callNotification } from "../lib/utils";

export default function DefaultLayout() {
  return (
    <div>
      <Space>
        <Button onClick={() => callModal("Button clicked!")}>모달</Button>
        <Button onClick={() => callMessage("Button clicked!")}>메시지</Button>
        <Button
          onClick={() =>
            callNotification("Button clicked!", "This is a notification")
          }
        >
          알림
        </Button>
      </Space>
      <Space>
        <Button onClick={() => axiosInstance.get("/test/401")}>401</Button>
        <Button onClick={() => axiosInstance.get("/test/403")}>403</Button>
        <Button onClick={() => axiosInstance.get("/test/404")}>404</Button>
        <Button onClick={() => axiosInstance.get("/test/502")}>502</Button>
        <Button onClick={() => axiosInstance.get("/test/503")}>503</Button>
        <Button onClick={() => axiosInstance.get("/test/500")}>500</Button>
        <Button onClick={() => axiosInstance.get("/test/unexpected-error")}>
          Unexpected Error Test
        </Button>
      </Space>
      <Outlet />
    </div>
  );
}
