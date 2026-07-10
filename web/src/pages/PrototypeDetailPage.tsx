import { Button, Card, Table } from "antd";
import PageComponent from "../components/PageComponent";
import CardComponent from "../components/CardComponent";

type HistoryRow = {
  key: string;
  date: string;
  author: string;
  content: string;
};

const historyColumns = [
  { title: "일시", dataIndex: "date", key: "date", width: 120 },
  { title: "작업자", dataIndex: "author", key: "author", width: 100 },
  { title: "내용", dataIndex: "content", key: "content" },
];

const historyData: HistoryRow[] = [
  { key: "1", date: "2025-06-14", author: "김지훈", content: "최초 등록" },
  {
    key: "2",
    date: "2025-06-20",
    author: "박서연",
    content: "상태를 Draft로 변경",
  },
  { key: "3", date: "2025-07-01", author: "이도윤", content: "담당자 변경" },
];

export default function PrototypeDetailPage() {
  return (
    <PageComponent
      title="상세 페이지"
      back
      actions={<Button type="primary">저장</Button>}
    >
      <div style={{ height: 2000, backgroundColor: "" }}>
        <div className="DetailColumns">
          <div>
            <CardComponent title="기본정보">
              <div className="InfoList">
                <div className="InfoItem">
                  <div className="InfoLabel">아이디</div>
                  <div className="InfoValue">PT-2025-0001</div>
                </div>
                <div className="InfoItem">
                  <div className="InfoLabel">이름</div>
                  <div className="InfoValue">주문 상세 화면 개선</div>
                </div>
                <div className="InfoItem">
                  <div className="InfoLabel">카테고리</div>
                  <div className="InfoValue">UI/UX</div>
                </div>
                <div className="InfoItem">
                  <div className="InfoLabel">담당자</div>
                  <div className="InfoValue">김지훈</div>
                </div>
                <div className="InfoItem">
                  <div className="InfoLabel">상태</div>
                  <div className="InfoValue">Active</div>
                </div>
                <div className="InfoItem">
                  <div className="InfoLabel">등록일</div>
                  <div className="InfoValue">2025-01-06</div>
                </div>
              </div>
            </CardComponent>
            <CardComponent
              title=""
              extra={
                <>
                  <Button>Test</Button>
                </>
              }
            >
              <div style={{ height: 500 }}>내용</div>
            </CardComponent>
            <CardComponent title="변경 이력">
              <Table<HistoryRow>
                size="small"
                bordered
                pagination={false}
                columns={historyColumns}
                dataSource={historyData}
              />
            </CardComponent>
          </div>
          <div>
            <CardComponent title="등록 정보">
              <div className="InfoList">
                <div className="InfoItem">
                  <div className="InfoLabel">등록일자</div>
                  <div className="InfoValue">2025-01-06 10:20</div>
                </div>
                <div className="InfoItem">
                  <div className="InfoLabel">등록자</div>
                  <div className="InfoValue">김지훈</div>
                </div>
                <div className="InfoItem">
                  <div className="InfoLabel">수정일자</div>
                  <div className="InfoValue">2025-07-01 14:55</div>
                </div>
                <div className="InfoItem">
                  <div className="InfoLabel">수정자</div>
                  <div className="InfoValue">이도윤</div>
                </div>
              </div>
            </CardComponent>
            <CardComponent title="관리">
              <div>
                <Button>삭제</Button>
              </div>
            </CardComponent>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
