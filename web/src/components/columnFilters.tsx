import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Space } from "antd";
import type { ColumnType, FilterDropdownProps } from "antd/es/table/interface";
import dayjs from "dayjs";

// 서버 조회 전제: onFilter(클라이언트 필터링) 없이 filterDropdown UI만 제공한다.

export type CheckboxFilterOption = { text: string; value: string };

export function createSearchColumnFilter<RecordType>(
  label: string
): Pick<ColumnType<RecordType>, "filterIcon" | "filterDropdown"> {
  return {
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`${label} 검색`}
          value={selectedKeys[0] as string}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button type="primary" size="small" onClick={() => confirm()}>
            조회
          </Button>
          <Button
            size="small"
            onClick={() => {
              clearFilters?.();
              confirm();
            }}
          >
            초기화
          </Button>
        </Space>
      </div>
    ),
  };
}

export function createDateRangeColumnFilter<RecordType>(
  label: string
): Pick<ColumnType<RecordType>, "filterIcon" | "filterDropdown"> {
  return {
    filterIcon: (filtered) => (
      <CalendarOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => {
      const [startStr, endStr] = selectedKeys[0]
        ? String(selectedKeys[0]).split("~")
        : [undefined, undefined];
      return (
        <div style={{ padding: 8 }}>
          <DatePicker.RangePicker
            placeholder={[`${label} 시작`, `${label} 종료`]}
            value={
              startStr && endStr ? [dayjs(startStr), dayjs(endStr)] : null
            }
            onChange={(dates) => {
              if (dates && dates[0] && dates[1]) {
                setSelectedKeys([
                  `${dates[0].format("YYYY-MM-DD")}~${dates[1].format("YYYY-MM-DD")}`,
                ]);
              } else {
                setSelectedKeys([]);
              }
            }}
            style={{ marginBottom: 8 }}
          />
          <div>
            <Space>
              <Button type="primary" size="small" onClick={() => confirm()}>
                조회
              </Button>
              <Button
                size="small"
                onClick={() => {
                  clearFilters?.();
                  confirm();
                }}
              >
                초기화
              </Button>
            </Space>
          </div>
        </div>
      );
    },
  };
}

export function createCheckboxColumnFilter<RecordType>(
  options: CheckboxFilterOption[]
): Pick<ColumnType<RecordType>, "filters" | "filterMultiple"> {
  return {
    filters: options,
    filterMultiple: true,
  };
}
