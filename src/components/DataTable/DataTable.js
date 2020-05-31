import React from 'react';
import { Table } from 'antd';

const DataTable = (props) => {
  const { columns, data } = props;
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  return (
    <Table columns={columns} rowSelection={rowSelection} dataSource={data} />
  );
};

// rowSelection objects indicates the need for row selection

export default DataTable;
