export type RawMenuItem = {
  key: string;
  label: string;
  path: string;
};

export type RawMenuGroup = {
  key: string;
  label: string;
  children: RawMenuItem[];
};

export const sourceMenuGroups: RawMenuGroup[] = [
  {
    key: "dashboard",
    label: "운영 대시보드",
    children: [
      {
        key: "dashboard-overview",
        label: "종합 현황",
        path: "/",
      },
      {
        key: "dashboard-realtime",
        label: "실시간 트래픽",
        path: "/statistics-page?view=realtime",
      },
      {
        key: "dashboard-kpi",
        label: "KPI 요약",
        path: "/statistics-page?view=kpi",
      },
    ],
  },
  {
    key: "prototype",
    label: "프로토타입 관리",
    children: [
      {
        key: "prototype-list",
        label: "프로토타입 목록",
        path: "/prototype-list-page",
      },
      {
        key: "prototype-detail-a",
        label: "상세 샘플 A",
        path: "/prototype-detail-page?id=101",
      },
      {
        key: "prototype-detail-b",
        label: "상세 샘플 B",
        path: "/prototype-detail-page?id=102",
      },
    ],
  },
  {
    key: "operations",
    label: "서비스 운영",
    children: [
      {
        key: "ops-incident",
        label: "장애 모니터링",
        path: "/statistics-page?view=incident",
      },
      {
        key: "ops-release",
        label: "배포 이력",
        path: "/prototype-list-page?type=release",
      },
      {
        key: "ops-feedback",
        label: "사용자 피드백",
        path: "/prototype-list-page?type=feedback",
      },
    ],
  },
  {
    key: "account",
    label: "계정 및 권한",
    children: [
      {
        key: "account-users",
        label: "사용자 목록",
        path: "/prototype-list-page?type=users",
      },
      {
        key: "account-roles",
        label: "권한 관리",
        path: "/account/permission",
      },
      {
        key: "account-audit",
        label: "접근 로그",
        path: "/statistics-page?view=audit",
      },
    ],
  },
];
