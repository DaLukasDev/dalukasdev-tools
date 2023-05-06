import { ColumnDefinitionType, Table, useTable } from '@dalukasdev/table';

export default function Docs() {
  const data = [
    {
      id: '1',
      name: 'John Doe',
      age: 25,
      gender: 'male',
      xd: 'xd',
    },
    {
      id: '2',
      name: 'John Doe',
      age: 25,
      gender: 'male',
      xd: 'xd',
    },
    {
      id: '3',
      name: 'John Doe',
      age: 25,
      gender: 'male',
      xd: 'xd',
    },
    {
      id: '4',
      name: 'John Doe',
      age: 25,
      gender: 'male',
      xd: 'xd',
    },
    {
      id: '5',
      name: 'John Doe',
      age: 25,
      gender: 'male',
      xd: 'xd',
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
      searchable: true,
      searchKey: 'name',
    },
    {
      key: 'age',
      header: 'age',
      searchable: true,
      searchKey: 'age',
    },
    {
      key: 'gender',
      header: 'gender',
      searchable: true,
      searchKey: 'genderrrr',
    },
    {
      key: 'xd',
      header: 'xd',
      searchable: true,
      searchKey: 'genderrrr',
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
