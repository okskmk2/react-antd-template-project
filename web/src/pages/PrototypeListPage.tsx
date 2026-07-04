import { Button, Table } from "antd";
import PageComponent from "../components/PageComponent";
import { columns, dataSource, MockRow } from "./mockup";

export default function PrototypeListPage() {
  return (
    <PageComponent
      title="목록 페이지"
      actions={
        <>
          <Button>등록</Button>
        </>
      }
    >
      <Table<MockRow>
        size="small"
        tableLayout="fixed"
        bordered
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 15,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} / 총 ${total}건`,
        }}
      />
    </PageComponent>
  );
}
