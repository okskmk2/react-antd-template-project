import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RouterProvider } from "react-router";
import { router } from "./router";
import { ConfigProvider } from "antd";
import ko_KR from "antd/locale/ko_KR";

// styles
import "antd/dist/reset.css";
import "./assets/styles/index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={ko_KR}
        theme={{
          token: {
            colorBorderSecondary: "#ccc",
          },
          components: {
            Card: {
              headerHeight: 48,
              headerFontSize: 15,
            },
            Menu: {
              activeBarBorderWidth: 0,
            },
            Layout: {
              siderBg: "white",
              headerBg: "white",
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
