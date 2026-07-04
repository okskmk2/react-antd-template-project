import { Button, Card, Space } from "antd";
import PageComponent from "../components/PageComponent";
import BackButton from "../components/BackButton";

export default function PrototypeDetailPage() {
  return (
    <PageComponent
      title="상세 페이지"
      actions={
        <Space>
          <BackButton />
          <Button type="primary">저장</Button>
        </Space>
      }
    >
      <div style={{ height: 2000, backgroundColor: "" }}>
        <div className="DetailColumns">
          <div>
            <Card title="기본정보">
              <div style={{ height: 300 }}>내용</div>
            </Card>
            <Card title="기본정보">
              <div style={{ height: 500 }}>내용</div>
            </Card>
          </div>
          <div>
            <Card title="등록정보">내용</Card>
            <Card title="관리정보">
              <div>
                <Button>삭제</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
