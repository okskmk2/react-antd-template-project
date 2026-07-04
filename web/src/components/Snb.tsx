import { Menu, Tag, type MenuProps } from "antd";
import { Link } from "react-router";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "test",
    label: "통계",
    children: [
      {
        key: "statistics-page",
        label: <Link to={"/statistics-page"}>통계</Link>,
      },
    ],
  },
  {
    key: "test1",
    label: "Test",
    children: [
      {
        key: "prototype-list-page1",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page2",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page3",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page4",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page5",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page6",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page7",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page8",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page9",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page10",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page11",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page12",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page13",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page14",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page15",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
      {
        key: "prototype-list-page16",
        label: <Link to={"prototype-list-page"}>Prototype List Page</Link>,
      },
    ],
  },
];

//    <Space>
//         <Button onClick={() => callModal("Button clicked!")}>모달</Button>
//         <Button onClick={() => callMessage("Button clicked!")}>메시지</Button>
//         <Button
//           onClick={() =>
//             callNotification("Button clicked!", "This is a notification")
//           }
//         >
//           알림
//         </Button>
//       </Space>
//       <Space>
//         <Button onClick={() => axiosInstance.get("/test/401")}>401</Button>
//         <Button onClick={() => axiosInstance.get("/test/403")}>403</Button>
//         <Button onClick={() => axiosInstance.get("/test/404")}>404</Button>
//         <Button onClick={() => axiosInstance.get("/test/502")}>502</Button>
//         <Button onClick={() => axiosInstance.get("/test/503")}>503</Button>
//         <Button onClick={() => axiosInstance.get("/test/500")}>500</Button>
//         <Button onClick={() => axiosInstance.get("/test/unexpected-error")}>
//           Unexpected Error Test
//         </Button>
//       </Space>

export default function Snb() {
  return (
    <div className="Snb">
      <div className="SnbHeader">
        BrandName <div>Admin Console</div>
      </div>
      <Menu
        mode="inline"
        items={items}
        theme="light"
        className="SnbMenu scrollbar"
      />
      <div className="SnbFooter">
        <span>UserName</span>
        <Tag>RoleName</Tag>
      </div>
    </div>
  );
}
