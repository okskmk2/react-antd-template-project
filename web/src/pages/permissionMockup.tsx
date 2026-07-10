import { TableProps } from "antd";
import { Link } from "react-router";

export type PermissionStatus = "사용" | "중지";

export type PermissionRow = {
  key: string;
  roleCode: string;
  roleName: string;
  scope: string;
  memberCount: number;
  status: PermissionStatus;
  updatedAt: string;
};

export const permissionDataSource: PermissionRow[] = [
  {
    key: "1",
    roleCode: "ROLE_SUPER_ADMIN",
    roleName: "시스템 최고 관리자",
    scope: "전체 서비스",
    memberCount: 2,
    status: "사용",
    updatedAt: "2026-06-18",
  },
  {
    key: "2",
    roleCode: "ROLE_OPERATION_MANAGER",
    roleName: "운영 관리자",
    scope: "운영/장애",
    memberCount: 7,
    status: "사용",
    updatedAt: "2026-06-24",
  },
  {
    key: "3",
    roleCode: "ROLE_CS_AGENT",
    roleName: "고객지원 담당",
    scope: "고객지원",
    memberCount: 18,
    status: "사용",
    updatedAt: "2026-06-29",
  },
  {
    key: "4",
    roleCode: "ROLE_AUDITOR",
    roleName: "감사 전용 계정",
    scope: "조회 전용",
    memberCount: 3,
    status: "중지",
    updatedAt: "2026-07-03",
  },
  {
    key: "5",
    roleCode: "ROLE_PARTNER_SUPPORT",
    roleName: "파트너 지원",
    scope: "파트너 포털",
    memberCount: 9,
    status: "사용",
    updatedAt: "2026-07-08",
  },
];

export const permissionColumns: TableProps<PermissionRow>["columns"] = [
  {
    title: "권한 코드",
    dataIndex: "roleCode",
    key: "roleCode",
    width: 220,
  },
  {
    title: "권한명",
    dataIndex: "roleName",
    key: "roleName",
    render: (value, record) => (
      <Link to={`/account/permission/edit?id=${record.key}`}>{value}</Link>
    ),
  },
  {
    title: "적용 범위",
    dataIndex: "scope",
    key: "scope",
    width: 180,
  },
  {
    title: "할당 인원",
    dataIndex: "memberCount",
    key: "memberCount",
    width: 110,
    align: "right",
  },
  {
    title: "상태",
    dataIndex: "status",
    key: "status",
    width: 90,
  },
  {
    title: "최종 수정일",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 130,
  },
];

export type PermissionFormSeed = {
  roleCode: string;
  roleName: string;
  scope: string;
  status: PermissionStatus;
  description: string;
};

export const permissionFormSeedMap: Record<string, PermissionFormSeed> = {
  "1": {
    roleCode: "ROLE_SUPER_ADMIN",
    roleName: "시스템 최고 관리자",
    scope: "전체 서비스",
    status: "사용",
    description: "모든 도메인에 대해 조회/등록/수정/삭제 권한을 보유합니다.",
  },
  "2": {
    roleCode: "ROLE_OPERATION_MANAGER",
    roleName: "운영 관리자",
    scope: "운영/장애",
    status: "사용",
    description: "운영 지표와 장애 대응 메뉴 접근 권한을 제공합니다.",
  },
  "3": {
    roleCode: "ROLE_CS_AGENT",
    roleName: "고객지원 담당",
    scope: "고객지원",
    status: "사용",
    description: "고객 문의 및 VOC 관련 메뉴의 조회/처리 권한입니다.",
  },
  "4": {
    roleCode: "ROLE_AUDITOR",
    roleName: "감사 전용 계정",
    scope: "조회 전용",
    status: "중지",
    description: "감사 시점에 필요한 이력/로그 조회 전용 권한입니다.",
  },
  "5": {
    roleCode: "ROLE_PARTNER_SUPPORT",
    roleName: "파트너 지원",
    scope: "파트너 포털",
    status: "사용",
    description: "파트너 계정 문의와 승인 프로세스 대응 권한입니다.",
  },
};

export type PermissionAssignedUser = {
  key: string;
  userId: string;
  userName: string;
  department: string;
  email: string;
  lastGrantedAt: string;
};

export const permissionAssignableUsers: PermissionAssignedUser[] = [
  {
    key: "U1001",
    userId: "U1001",
    userName: "김지훈",
    department: "플랫폼운영팀",
    email: "jihoon.kim@sample.com",
    lastGrantedAt: "2026-05-14",
  },
  {
    key: "U1002",
    userId: "U1002",
    userName: "박서연",
    department: "고객지원팀",
    email: "seoyeon.park@sample.com",
    lastGrantedAt: "2026-05-28",
  },
  {
    key: "U1003",
    userId: "U1003",
    userName: "이도윤",
    department: "데이터전략팀",
    email: "doyoon.lee@sample.com",
    lastGrantedAt: "2026-06-03",
  },
  {
    key: "U1004",
    userId: "U1004",
    userName: "최민아",
    department: "서비스기획팀",
    email: "mina.choi@sample.com",
    lastGrantedAt: "2026-06-08",
  },
  {
    key: "U1005",
    userId: "U1005",
    userName: "한예린",
    department: "보안운영팀",
    email: "yerin.han@sample.com",
    lastGrantedAt: "2026-06-18",
  },
  {
    key: "U1006",
    userId: "U1006",
    userName: "윤서준",
    department: "파트너성장팀",
    email: "seojun.yoon@sample.com",
    lastGrantedAt: "2026-06-27",
  },
  {
    key: "U1007",
    userId: "U1007",
    userName: "장하민",
    department: "개발운영팀",
    email: "hamin.jang@sample.com",
    lastGrantedAt: "2026-07-05",
  },
];

export const permissionAssignedUsersMap: Record<string, PermissionAssignedUser[]> = {
  "1": [permissionAssignableUsers[0], permissionAssignableUsers[4]],
  "2": [
    permissionAssignableUsers[0],
    permissionAssignableUsers[2],
    permissionAssignableUsers[3],
  ],
  "3": [permissionAssignableUsers[1], permissionAssignableUsers[5]],
  "4": [permissionAssignableUsers[6]],
  "5": [permissionAssignableUsers[5], permissionAssignableUsers[6]],
};

export type PermissionAuditInfo = {
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};

export const permissionAuditInfoMap: Record<string, PermissionAuditInfo> = {
  "1": {
    createdAt: "2026-01-04 09:30",
    createdBy: "김지훈",
    updatedAt: "2026-07-08 14:12",
    updatedBy: "박서연",
  },
  "2": {
    createdAt: "2026-01-12 10:10",
    createdBy: "이도윤",
    updatedAt: "2026-07-07 16:25",
    updatedBy: "최민아",
  },
  "3": {
    createdAt: "2026-02-01 13:44",
    createdBy: "한예린",
    updatedAt: "2026-07-05 11:08",
    updatedBy: "윤서준",
  },
  "4": {
    createdAt: "2026-02-20 08:55",
    createdBy: "장하민",
    updatedAt: "2026-07-03 09:41",
    updatedBy: "김지훈",
  },
  "5": {
    createdAt: "2026-03-05 15:03",
    createdBy: "박서연",
    updatedAt: "2026-07-09 18:02",
    updatedBy: "이도윤",
  },
};
