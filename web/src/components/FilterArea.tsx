import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  Radio,
  Select,
  Space,
} from "antd";
import { Dayjs } from "dayjs";
import { FILTER_CATALOG, FilterInstance } from "../pages/filterConfig";

function FilterControl({
  filter,
  onChange,
}: {
  filter: FilterInstance;
  onChange: (value: unknown) => void;
}) {
  switch (filter.type) {
    case "search":
      return (
        <Input
          style={{ width: 160 }}
          allowClear
          size="small"
          placeholder={`${filter.label} 검색`}
          value={(filter.value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "dateRange":
      return (
        <DatePicker.RangePicker
          size="small"
          value={(filter.value as [Dayjs, Dayjs] | null) ?? null}
          onChange={(value) => onChange(value)}
        />
      );
    case "select":
      return (
        <Select
          style={{ width: 160 }}
          allowClear
          showSearch
          size="small"
          placeholder={`${filter.label} 선택`}
          options={filter.options}
          value={filter.value as string | undefined}
          onChange={(value) => onChange(value)}
        />
      );
    case "radio":
      return (
        <Radio.Group
          size="small"
          options={filter.options}
          value={filter.value as string | undefined}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "checkbox":
      return (
        <Checkbox.Group
          options={filter.options}
          value={(filter.value as string[]) ?? []}
          onChange={(value) => onChange(value)}
        />
      );
  }
}

export default function FilterArea({
  filters,
  onAdd,
  onRemove,
  onChange,
  onSearch,
  onReset,
}: {
  filters: FilterInstance[];
  onAdd: (catalogId: string) => void;
  onRemove: (id: string) => void;
  onChange: (id: string, value: unknown) => void;
  onSearch: () => void;
  onReset: () => void;
}) {
  const addableItems = FILTER_CATALOG.filter(
    (item) => !filters.some((filter) => filter.catalogId === item.catalogId),
  );

  return (
    <div className="FilterArea">
      <div className="FilterChips">
        <Dropdown
          disabled={addableItems.length === 0}
          menu={{
            items: addableItems.map((item) => ({
              key: item.catalogId,
              label: item.label,
            })),
            onClick: ({ key }) => onAdd(key),
          }}
          trigger={["click"]}
        >
          <Button icon={<PlusOutlined />}>필터 추가</Button>
        </Dropdown>
        {filters.map((filter) => (
          <div className="FilterChip" key={filter.id}>
            <span className="FilterChipLabel">{filter.label}</span>
            <FilterControl
              filter={filter}
              onChange={(value) => onChange(filter.id, value)}
            />
            <Button
              className="FilterChipRemove"
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => onRemove(filter.id)}
            />
          </div>
        ))}
      </div>
      <Space>
        <Button onClick={onReset}>초기화</Button>
        <Button type="primary" onClick={onSearch}>
          조회
        </Button>
      </Space>
    </div>
  );
}
