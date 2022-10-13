import { Table } from "antd";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../Api";
import { getUsers } from "../redux/reducers/userReducer";

const TableComponent = ({ data, columns, pageDetails, setUpdate }) => {
  const {
    hasNextPage,
    hasPrevPage,
    page,
    prevPage,
    nextPage,
    totalPages,
    total,
  } = pageDetails;
  console.log(data, pageDetails);

  // console.log(
  //   hasNextPage,
  //   hasPrevPage,
  //   page,
  //   prevPage,
  //   nextPage,
  //   totalPages,
  //   total
  // );

  const dispatch = useDispatch();

  const onShowSizeChange = async (current, pageSize) => {
    console.log(current, pageSize);
    const data = await fetchUsers(current, pageSize);
    dispatch(getUsers(data));
  };

  const onPageChange = async (pageNumber) => {
    console.log(pageNumber);
    const data = await fetchUsers(pageNumber);
    dispatch(getUsers(data));
  };

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        loading={data === null ? true : false}
        pagination={{
          total: total,
          // current: page,
          defaultCurrent: page,
          showSizeChanger: true,
          onChange: onPageChange,
          onShowSizeChange: onShowSizeChange,
        }}
      />
      ;
    </div>
  );
};

export default TableComponent;
