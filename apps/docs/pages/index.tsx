import { ColumnDefinitionType, Table, useTable } from '@dalukasdev/table';

export default function Docs() {
  const data = [
    {
      id: '1',
      name: 'John Doe',
      age: 25,
      gender: 'male',
    },
    {
      id: '2',
      name: 'John Doe',
      age: 25,
      gender: 'male',
    },
    {
      id: '3',
      name: 'John Doe',
      age: 25,
      gender: 'male',
    },
    {
      id: '4',
      name: 'John Doe',
      age: 25,
      gender: 'male',
    },
  ];

  type DataType = typeof data;
  type SingleDataType = (typeof data)[number];
  const {
    tableCard,
    onSearchChangedHandler,
    multiSelect,
    nextPageHandler,
    page,
    pageSize,
    pageSizeChangeHandler,
    prevPageHandler,
    resetTable,
    searchTerm,
    onMultiSelectChange,
  } = useTable<SingleDataType>();

  const columns: ColumnDefinitionType<Partial<SingleDataType>>[] = [
    {
      key: 'name',
      header: "User's name",
    },
    {
      key: 'age',
      header: 'age',
    },
    {
      key: 'gender',
      header: 'gender',
    },
  ];

  return (
    <div className="p-10">
      <div ref={tableCard}>
        <Table
          data={data}
          columns={columns}
          // paginatorProps={data?.getPastEvents?.paginatorInfo}
          onSearchChange={onSearchChangedHandler}
          onNextPage={nextPageHandler}
          onPreviousPage={prevPageHandler}
          onPageSizeChange={pageSizeChangeHandler}
          currentPageSize={pageSize}
          currentPage={page}
          searchTerm={searchTerm}
          // disableSearch
          // isLoading={(isLoading && !data) || (isRefetching && !data)}
        />
      </div>
    </div>
  );
}
