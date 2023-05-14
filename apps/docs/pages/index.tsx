import { ColumnDefinitionType, Table, useTable } from '@dalukasdev/table';

export default function Docs() {
  const data = [
    {
      id: '1',
      name: 'John Doe',
      age: 25,
      element: 'male',
      xd: '2023-05-13 02:55:28',
    },
    {
      id: '2',
      name: 'John Doe',
      age: 25,
      element: 'male',
      xd: '2023-05-13 02:55:28',
    },
    {
      id: '3',
      name: 'John Doe',
      age: 25,
      element: 'male',
      xd: '2023-05-13 02:55:28',
    },
    {
      id: '4',
      name: 'John Doe',
      age: 25,
      element: 'male',
      xd: '2023-05-13 02:55:28',
    },
    {
      id: '5',
      name: 'John Doe',
      age: 25,
      element: 'male',
      xd: '2023-05-13 02:55:28',
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

  const columns: ColumnDefinitionType<SingleDataType>[] = [
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
      key: 'element',
      header: 'test element',
      type: 'element',
      element: (row) => <div>{}</div>,
    },
    {
      key: 'xd',
      header: 'xd',
      searchable: true,
      searchKey: 'genderrrrs',
      type: 'date',
    },
  ];

  console.log(searchTerm);
  return (
    <div className="bg-red-500 p-10">
      <div ref={tableCard}>
        <Table
          data={data}
          columns={columns}
          // paginatorProps={data?.getPastEvents?.paginatorInfo}
          // onSearchChange={onSearchChangedHandler}
          // onNextPage={nextPageHandler}
          // onPreviousPage={prevPageHandler}
          // onPageSizeChange={pageSizeChangeHandler}
          // currentPageSize={pageSize}
          // currentPage={page}
          // searchTerm={searchTerm}
          // disableSearch
          // isLoading={(isLoading && !data) || (isRefetching && !data)}
          // pagination={false}
        />
      </div>
    </div>
  );
}
