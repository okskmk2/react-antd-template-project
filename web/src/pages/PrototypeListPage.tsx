import { useMemo, useState } from "react";
import { Button, Table } from "antd";
import PageComponent from "../components/PageComponent";
import FilterArea from "../components/FilterArea";
import { columns, dataSource, MockRow } from "./mockup";
import {
  applyFilters,
  FILTER_CATALOG,
  FilterInstance,
  getDefaultFilterValue,
} from "./filterConfig";

export default function PrototypeListPage() {
  const [filters, setFilters] = useState<FilterInstance[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<FilterInstance[]>([]);

  const filteredDataSource = useMemo(
    () => applyFilters(dataSource, appliedFilters),
    [appliedFilters],
  );

  const handleAddFilter = (catalogId: string) => {
    const catalogItem = FILTER_CATALOG.find(
      (item) => item.catalogId === catalogId,
    );
    if (!catalogItem) return;
    setFilters((prev) => [
      ...prev,
      {
        ...catalogItem,
        id: crypto.randomUUID(),
        value: getDefaultFilterValue(catalogItem.type),
      },
    ]);
  };

  const handleRemoveFilter = (id: string) => {
    setFilters((prev) => prev.filter((filter) => filter.id !== id));
  };

  const handleChangeFilter = (id: string, value: unknown) => {
    setFilters((prev) =>
      prev.map((filter) => (filter.id === id ? { ...filter, value } : filter)),
    );
  };

  const handleSearch = () => {
    setAppliedFilters(filters);
  };

  const handleResetFilters = () => {
    setFilters([]);
    setAppliedFilters([]);
  };

  return (
    <PageComponent
      title="목록 페이지"
      actions={
        <>
          <Button>등록</Button>
        </>
      }
    >
      <FilterArea
        filters={filters}
        onAdd={handleAddFilter}
        onRemove={handleRemoveFilter}
        onChange={handleChangeFilter}
        onSearch={handleSearch}
        onReset={handleResetFilters}
      />

      <Table<MockRow>
        // size="small"
        // tableLayout="fixed"
        bordered
        columns={columns}
        dataSource={filteredDataSource}
        pagination={{
          pageSize: 15,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} / 총 ${total}건`,
        }}
      />
    </PageComponent>
  );
}
