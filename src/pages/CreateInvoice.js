import { Button, Col, Input, Row, Select, Table, Typography } from "antd";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaFileInvoice } from "react-icons/fa";
import Layout from "../layout/DashboarLayout";

const CreateInvoice = () => {
  const { Title } = Typography;
  const { Option } = Select;
  const { TextArea } = Input;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Service Name",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Total",
      key: "total",
      dataIndex: "total",
    },
    {
      title: "Discount",
      key: "discount",
      dataIndex: "discount",
    },
    {
      title: "Discount Total",
      key: "discountT",
      dataIndex: "discountT",
    },
  ];

  const data = [
    {
      key: "1",
      name: (
        <Select
          defaultValue="coffee"
          style={{ width: 120 }}
          // onChange={handleChange}
        >
          <Option value="coffee">coffee</Option>
          <Option value="toffee">toffee</Option>
        </Select>
      ),
      service: (
        <Select
          defaultValue="coffee"
          style={{ width: 120 }}
          // onChange={handleChange}
        >
          <Option value="coffee">coffee</Option>
          <Option value="toffee">toffee</Option>
        </Select>
      ),
      quantity: (
        <Select
          defaultValue="coffee"
          style={{ width: 120 }}
          // onChange={handleChange}
        >
          <Option value="coffee">coffee</Option>
          <Option value="toffee">toffee</Option>
        </Select>
      ),
      price: (
        <Select
          defaultValue="coffee"
          style={{ width: 120 }}
          // onChange={handleChange}
        >
          <Option value="coffee">coffee</Option>
          <Option value="toffee">toffee</Option>
        </Select>
      ),
      total: (
        <Select
          defaultValue="coffee"
          style={{ width: 120 }}
          // onChange={handleChange}
        >
          <Option value="coffee">coffee</Option>
          <Option value="toffee">toffee</Option>
        </Select>
      ),
      discount: (
        <Select
          defaultValue="coffee"
          style={{ width: 120 }}
          // onChange={handleChange}
        >
          <Option value="coffee">coffee</Option>
          <Option value="toffee">toffee</Option>
        </Select>
      ),
      discountT: (
        <Select
          defaultValue="coffee"
          style={{ width: 120 }}
          // onChange={handleChange}
        >
          <Option value="coffee">coffee</Option>
          <Option value="toffee">toffee</Option>
        </Select>
      ),
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // const hasSelected = selectedRowKeys.length > 0;

  return (
    <Layout active="create-invoice">
      <div className="general-margin-padding">
        <Title className="general-title-h1">
          <FaFileInvoice style={{ marginRight: "10px" }} />
          Create Invoice
        </Title>

        <div className="invoice">
          <Row>
            <Col xs={24} lg={12}>
              <Title level={4}>From,</Title>
              <p>The Forge User 1</p>
              <p>090078601</p>
              <p>info@theforge.pk</p>
            </Col>
            <Col xs={24} lg={12}>
              <Title level={4}>To,</Title>
              <Input placeholder="Mobile Number" />
              <Input placeholder="Customer Name" disabled />
              <Input placeholder="Invoice Number" />
            </Col>
          </Row>

          <div className="add-invoice">
            <Table
              columns={columns}
              dataSource={data}
              rowSelection={rowSelection}
              scroll={{ x: 1200 }}
              pagination={false}
            />
            <div className="add-remove-btn">
              <Button icon={<AiOutlineMinus />}>Remove</Button>
              <Button icon={<AiOutlinePlus />}>Add</Button>
            </div>
          </div>

          <div className="notes">
            <Row gutter={[30, 30]}>
              <Col xs={24} lg={12}>
                <Title level={5}>Notes: </Title>
                <TextArea rows={4} />
                <Button type="primary">Save Invoice</Button>
              </Col>
              <Col xs={24} lg={12}>
                <div className="row-inputs">
                  <p>Total Loyalty Points Available:</p>
                  <Input placeholder="total loyalty point avail" />
                </div>
                <div className="row-inputs">
                  <p>Points to Redeem:</p>
                  <Input placeholder="points to redeem" />
                </div>
                <div className="row-inputs">
                  <p>Total:</p>
                  <Input placeholder="total loyalty point avail" />
                </div>
                <div className="row-inputs">
                  <p>Discount:</p>
                  <Input placeholder="total loyalty point avail" />
                </div>
                <div className="row-inputs">
                  <p>Tax Rate:</p>
                  <Input placeholder="total loyalty point avail" />
                </div>
                <div className="row-inputs">
                  <p>Net Total:</p>
                  <Input placeholder="total loyalty point avail" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateInvoice;
