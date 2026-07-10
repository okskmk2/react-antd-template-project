import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Select,
  Space,
  Table,
  message,
  type TableProps,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import PageComponent from "../components/PageComponent";
import {
  permissionAssignableUsers,
  permissionAuditInfoMap,
  permissionAssignedUsersMap,
  permissionFormSeedMap,
  type PermissionAssignedUser,
  type PermissionStatus,
} from "./permissionMockup";
import CardComponent from "../components/CardComponent";

type PermissionFormValues = {
  roleCode: string;
  roleName: string;
  scope: string;
  status: PermissionStatus;
  description: string;
};

type AddUserModalValues = {
  userIds: string[];
};

const scopeOptions = [
  { label: "전체 서비스", value: "전체 서비스" },
  { label: "운영/장애", value: "운영/장애" },
  { label: "고객지원", value: "고객지원" },
  { label: "조회 전용", value: "조회 전용" },
  { label: "파트너 포털", value: "파트너 포털" },
];

export default function PermissionManagementEditPage() {
  const [form] = Form.useForm<PermissionFormValues>();
  const [addUserForm] = Form.useForm<AddUserModalValues>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [assignedUsers, setAssignedUsers] = useState<PermissionAssignedUser[]>(
    [],
  );

  const isRegisterMode = location.pathname.endsWith("/register");
  const modeLabel = isRegisterMode ? "등록" : "수정";

  const targetId = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return query.get("id") ?? "1";
  }, [location.search]);

  const initialValues = useMemo<PermissionFormValues>(() => {
    if (isRegisterMode) {
      return {
        roleCode: "",
        roleName: "",
        scope: "운영/장애",
        status: "사용",
        description: "",
      };
    }

    const fallback = permissionFormSeedMap["1"];
    return permissionFormSeedMap[targetId] ?? fallback;
  }, [isRegisterMode, targetId]);

  const auditInfo = useMemo(() => {
    if (isRegisterMode) {
      return {
        createdAt: "-",
        createdBy: "-",
        updatedAt: "-",
        updatedBy: "-",
      };
    }

    return (
      permissionAuditInfoMap[targetId] ?? {
        createdAt: "-",
        createdBy: "-",
        updatedAt: "-",
        updatedBy: "-",
      }
    );
  }, [isRegisterMode, targetId]);

  useEffect(() => {
    if (isRegisterMode) {
      setAssignedUsers([]);
      return;
    }

    const defaultUsers = permissionAssignedUsersMap[targetId] ?? [];
    setAssignedUsers(defaultUsers);
  }, [isRegisterMode, targetId]);

  const assignedUserColumns: TableProps<PermissionAssignedUser>["columns"] = [
    {
      title: "사용자명",
      dataIndex: "userName",
      key: "userName",
      width: 120,
    },
    {
      title: "사번",
      dataIndex: "userId",
      key: "userId",
      width: 100,
    },
    {
      title: "소속",
      dataIndex: "department",
      key: "department",
      width: 180,
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "최근 권한 부여일",
      dataIndex: "lastGrantedAt",
      key: "lastGrantedAt",
      width: 140,
    },
  ];

  const addableUsers = useMemo(() => {
    const assignedUserIdSet = new Set(assignedUsers.map((user) => user.userId));
    return permissionAssignableUsers.filter(
      (candidate) => !assignedUserIdSet.has(candidate.userId),
    );
  }, [assignedUsers]);

  const userSelectOptions = useMemo(
    () =>
      addableUsers.map((user) => ({
        value: user.userId,
        label: `${user.userName} (${user.userId}) - ${user.department}`,
      })),
    [addableUsers],
  );

  const handleOpenAddUserModal = () => {
    if (!addableUsers.length) {
      message.info("추가 가능한 사용자가 없습니다.");
      return;
    }
    setIsAddUserModalOpen(true);
  };

  const handleAddUsers = async () => {
    const values = await addUserForm.validateFields();
    const selectedUsers = permissionAssignableUsers.filter((user) =>
      values.userIds.includes(user.userId),
    );

    if (!selectedUsers.length) {
      return;
    }

    setAssignedUsers((prev) => [...prev, ...selectedUsers]);
    message.success(`${selectedUsers.length}명의 사용자가 추가되었습니다.`);
    setIsAddUserModalOpen(false);
    addUserForm.resetFields();
  };

  const handleCloseAddUserModal = () => {
    setIsAddUserModalOpen(false);
    addUserForm.resetFields();
  };

  const handleSubmit = async () => {
    await form.validateFields();
    message.success(`권한 ${modeLabel}이 완료되었습니다.`);
    navigate("/account/permission");
  };

  const handleDelete = () => {
    if (isRegisterMode) {
      return;
    }

    message.success("권한이 삭제되었습니다.");
    navigate("/account/permission");
  };

  return (
    <PageComponent
      title={`권한 ${modeLabel}`}
      back
      actions={
        <Space>
          <Button onClick={() => navigate("/account/permission")}>취소</Button>
          <Button type="primary" onClick={handleSubmit}>
            저장
          </Button>
        </Space>
      }
    >
      <div className="DetailColumns">
        <div>
          <CardComponent title="권한 기본 정보">
            <Form<PermissionFormValues>
              form={form}
              layout="vertical"
              initialValues={initialValues}
              key={`${modeLabel}-${targetId}`}
            >
              <Form.Item
                name="roleCode"
                label="권한 코드"
                rules={[{ required: true, message: "권한 코드를 입력하세요." }]}
              >
                <Input placeholder="예: ROLE_OPERATION_MANAGER" />
              </Form.Item>

              <Form.Item
                name="roleName"
                label="권한명"
                rules={[{ required: true, message: "권한명을 입력하세요." }]}
              >
                <Input placeholder="예: 운영 관리자" />
              </Form.Item>

              <Form.Item
                name="scope"
                label="적용 범위"
                rules={[{ required: true, message: "적용 범위를 선택하세요." }]}
              >
                <Select options={scopeOptions} />
              </Form.Item>

              <Form.Item
                name="status"
                label="상태"
                rules={[{ required: true }]}
              >
                <Radio.Group
                  options={[
                    { label: "사용", value: "사용" },
                    { label: "중지", value: "중지" },
                  ]}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="권한 설명"
                rules={[{ required: true, message: "권한 설명을 입력하세요." }]}
              >
                <Input.TextArea
                  rows={5}
                  placeholder="권한의 목적과 범위를 입력하세요."
                />
              </Form.Item>
            </Form>
          </CardComponent>

          {!isRegisterMode && (
            <CardComponent
              title="사용자 추가"
              extra={
                <Button type="primary" onClick={handleOpenAddUserModal}>
                  사용자 추가
                </Button>
              }
            >
              <Table<PermissionAssignedUser>
                rowKey="key"
                size="small"
                bordered
                pagination={false}
                columns={assignedUserColumns}
                dataSource={assignedUsers}
                locale={{ emptyText: "추가된 사용자가 없습니다." }}
              />
            </CardComponent>
          )}
        </div>

        <div>
          <CardComponent title="등록 정보">
            <div className="InfoList">
              <div className="InfoItem">
                <div className="InfoLabel">등록일자</div>
                <div className="InfoValue">{auditInfo.createdAt}</div>
              </div>
              <div className="InfoItem">
                <div className="InfoLabel">등록자</div>
                <div className="InfoValue">{auditInfo.createdBy}</div>
              </div>
              <div className="InfoItem">
                <div className="InfoLabel">수정일자</div>
                <div className="InfoValue">{auditInfo.updatedAt}</div>
              </div>
              <div className="InfoItem">
                <div className="InfoLabel">수정자</div>
                <div className="InfoValue">{auditInfo.updatedBy}</div>
              </div>
            </div>
          </CardComponent>

          <CardComponent title="관리">
            <Popconfirm
              title="권한 삭제"
              description="현재 권한을 삭제하시겠습니까?"
              okText="삭제"
              cancelText="취소"
              onConfirm={handleDelete}
              disabled={isRegisterMode}
            >
              <Button danger disabled={isRegisterMode}>
                삭제
              </Button>
            </Popconfirm>
          </CardComponent>
        </div>
      </div>

      <Modal
        title="사용자 추가"
        open={isAddUserModalOpen}
        onCancel={handleCloseAddUserModal}
        onOk={handleAddUsers}
        okText="추가"
        cancelText="취소"
        destroyOnClose
      >
        <Form<AddUserModalValues>
          form={addUserForm}
          layout="vertical"
          preserve={false}
          initialValues={{ userIds: [] }}
        >
          <Form.Item
            name="userIds"
            label="추가할 사용자"
            rules={[{ required: true, message: "추가할 사용자를 선택하세요." }]}
          >
            <Select
              mode="multiple"
              placeholder="사용자를 선택하세요"
              options={userSelectOptions}
              optionFilterProp="label"
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageComponent>
  );
}
