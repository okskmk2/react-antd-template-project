import { Button, Table } from "antd";
import { useNavigate } from "react-router";
import PageComponent from "../components/PageComponent";
import {
  permissionColumns,
  permissionDataSource,
  type PermissionRow,
} from "./permissionMockup";
import CardComponent from "../components/CardComponent";

export default function PermissionManagementListPage() {
  const navigate = useNavigate();

  return (
    <PageComponent
      title="권한 관리"
      // actions={
      //   <Button
      //     type="primary"
      //     onClick={() => navigate("/account/permission/register")}
      //   >
      //     권한 등록
      //   </Button>
      // }
    >
      <CardComponent
        title="권한목록"
        extra={
          <>
            <Button
              type="primary"
              onClick={() => navigate("/account/permission/register")}
            >
              권한 등록
            </Button>
          </>
        }
      >
        <Table<PermissionRow>
          rowKey="key"
          size="small"
          bordered
          columns={permissionColumns}
          dataSource={permissionDataSource}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} / 총 ${total}건`,
          }}
        />
      </CardComponent>
    </PageComponent>
  );
}
