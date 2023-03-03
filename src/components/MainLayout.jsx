import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineDatabase,
  AiOutlineBold,
  AiOutlineWindows,
  AiOutlineBgColors,
  AiOutlineShopping,
  AiOutlineBook,
  AiOutlineContainer,
  AiOutlineAudit,
  AiOutlineFileAdd,
  AiOutlineContacts,
  AiFillBell,
} from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h1 className="fs-6 text-center py-3 mb-0">
            <span className="sm-logo">
              <GrUserAdmin />
            </span>
            <span className="lg-logo"> Shop Corner Admin</span>
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={(key) => {
            console.log(key);
            if (key === "signout") {
              navigate("/login");
            } else {
              navigate(`/${key.key}`);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-5" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <UserOutlined className="fs-5" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <AiOutlineDatabase className="fs-5" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-5" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineContainer className="fs-5" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <AiOutlineBold className="fs-5" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <AiOutlineBold className="fs-5" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <AiOutlineWindows className="fs-5" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <AiOutlineWindows className="fs-5" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-5" />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineBgColors className="fs-5" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <AiOutlineShopping className="fs-5" />,
              label: "Orders",
            },
            {
              key: "blog",
              icon: <AiOutlineBook className="fs-5" />,
              label: "Blog",
              children: [
                {
                  key: "blog",
                  icon: <AiOutlineFileAdd className="fs-5" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <AiOutlineAudit className="fs-5" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <AiOutlineFileAdd className="fs-5" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <AiOutlineAudit className="fs-5" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <AiOutlineContacts className="fs-5" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          <div className="d-flex gap-1 align-items-center text-center">
            <div className="position-relative">
              <AiFillBell />
              <span className="badge">3</span>
            </div>
            <div>
              <img className="w-50" src="../images/user.png" alt="admin" />
            </div>
            <div className="">
              <h5>Petya</h5>
              <p>petya@b.me</p>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
