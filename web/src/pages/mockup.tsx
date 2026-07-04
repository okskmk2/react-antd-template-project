import { TableProps } from "antd";
import { Link } from "react-router";

export type MockRow = {
  key: string;
  name: string;
  category: string;
  owner: string;
  status: "Active" | "Draft" | "Archived";
};

export const columns: TableProps<MockRow>["columns"] = [
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
    render: (value) => <Link to="/prototype-detail-page">{value}</Link>,
  },
  {
    title: "카테고리",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "담당자",
    dataIndex: "owner",
    key: "owner",
  },
  {
    title: "상태",
    dataIndex: "status",
    key: "status",
  },
];

export const dataSource: MockRow[] = [
  {
    key: "1",
    name: "주문 상세 화면 개선",
    category: "UI/UX",
    owner: "김지훈",
    status: "Active",
  },
  {
    key: "2",
    name: "회원 등급 정책 정리",
    category: "정책",
    owner: "박서연",
    status: "Draft",
  },
  {
    key: "3",
    name: "알림 발송 이력 대시보드",
    category: "백오피스",
    owner: "이도윤",
    status: "Archived",
  },
  {
    key: "4",
    name: "결제 오류 대응 프로세스",
    category: "운영",
    owner: "최민아",
    status: "Active",
  },
  {
    key: "5",
    name: "정산 배치 성능 점검",
    category: "인프라",
    owner: "정현우",
    status: "Draft",
  },
  {
    key: "6",
    name: "주문 취소 플로우 개선",
    category: "UI/UX",
    owner: "한예린",
    status: "Active",
  },
  {
    key: "7",
    name: "쿠폰 정책 예외 처리 정리",
    category: "정책",
    owner: "윤서준",
    status: "Draft",
  },
  {
    key: "8",
    name: "운영 로그 검색 기능 추가",
    category: "백오피스",
    owner: "장하민",
    status: "Active",
  },
  {
    key: "9",
    name: "결제수단 노출 우선순위 조정",
    category: "운영",
    owner: "송지안",
    status: "Archived",
  },
  {
    key: "10",
    name: "배치 실패 알림 고도화",
    category: "인프라",
    owner: "문태윤",
    status: "Active",
  },
  {
    key: "11",
    name: "회원 탈퇴 데이터 마스킹",
    category: "정책",
    owner: "오하윤",
    status: "Draft",
  },
  {
    key: "12",
    name: "정산 리포트 다운로드 개선",
    category: "백오피스",
    owner: "임도현",
    status: "Active",
  },
  {
    key: "13",
    name: "주문 상태 배지 컬러 정비",
    category: "UI/UX",
    owner: "배수빈",
    status: "Archived",
  },
  {
    key: "14",
    name: "이벤트 트래픽 대응 점검",
    category: "인프라",
    owner: "조시우",
    status: "Active",
  },
  {
    key: "15",
    name: "권한별 메뉴 접근성 검토",
    category: "운영",
    owner: "차유진",
    status: "Draft",
  },
  {
    key: "16",
    name: "반품 사유 코드 체계화",
    category: "정책",
    owner: "서민재",
    status: "Active",
  },
  {
    key: "17",
    name: "문의 응답 SLA 대시보드",
    category: "백오피스",
    owner: "강지민",
    status: "Archived",
  },
  {
    key: "18",
    name: "상품 옵션 편집 UX 개선",
    category: "UI/UX",
    owner: "홍예준",
    status: "Active",
  },
  {
    key: "19",
    name: "API 오류 코드 표준화",
    category: "운영",
    owner: "신유나",
    status: "Draft",
  },
  {
    key: "20",
    name: "데이터 백업 복구 리허설",
    category: "인프라",
    owner: "권도율",
    status: "Active",
  },
];
