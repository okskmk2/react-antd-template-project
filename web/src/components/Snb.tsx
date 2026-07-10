import { Input, Menu, Tag, type MenuProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { sourceMenuGroups, type RawMenuGroup } from "./snbMenuData";

type MenuItem = Required<MenuProps>["items"][number];

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
  const location = useLocation();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const normalizedKeyword = searchKeyword.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    if (!normalizedKeyword) {
      return sourceMenuGroups;
    }

    return sourceMenuGroups
      .map((group) => {
        const groupMatched = group.label
          .toLowerCase()
          .includes(normalizedKeyword);

        if (groupMatched) {
          return group;
        }

        const matchedChildren = group.children.filter((child) =>
          child.label.toLowerCase().includes(normalizedKeyword),
        );

        if (!matchedChildren.length) {
          return null;
        }

        return {
          ...group,
          children: matchedChildren,
        };
      })
      .filter((group): group is RawMenuGroup => group !== null);
  }, [normalizedKeyword]);

  useEffect(() => {
    if (normalizedKeyword) {
      setOpenKeys(filteredGroups.map((group) => group.key));
    }
  }, [filteredGroups, normalizedKeyword]);

  const selectedKeys = useMemo(() => {
    const currentPathWithSearch = `${location.pathname}${location.search}`;

    const selectedChild = sourceMenuGroups
      .flatMap((group) => group.children)
      .find(
        (child) =>
          child.path === currentPathWithSearch ||
          child.path === location.pathname,
      );

    return selectedChild ? [selectedChild.key] : [];
  }, [location.pathname, location.search]);

  const menuItems: MenuItem[] = useMemo(
    () =>
      filteredGroups.map((group) => ({
        key: group.key,
        label: group.label,
        children: group.children.map((child) => ({
          key: child.key,
          label: <Link to={child.path}>{child.label}</Link>,
        })),
      })),
    [filteredGroups],
  );

  return (
    <div className="Snb">
      <div className="SnbHeader">
        <div className="Snb_brandName">BrandName</div>
        <div className="Snb__subtitle">Admin Console</div>
      </div>
      <div className="SnbSearch">
        <Input
          allowClear
          placeholder="메뉴 검색"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
        />
      </div>
      {menuItems.length ? (
        <Menu
          mode="inline"
          items={menuItems}
          theme="light"
          className="SnbMenu scrollbar"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={(keys) => {
            if (!normalizedKeyword) {
              setOpenKeys(keys as string[]);
            }
          }}
        />
      ) : (
        <div className="SnbEmptyState">검색 결과가 없습니다.</div>
      )}
      <div className="SnbFooter">
        <span>UserName</span>
        <Tag>RoleName</Tag>
      </div>
    </div>
  );
}
