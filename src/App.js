import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Login,
  ForgotPassword,
  ResetPassword,
  Enquiries,
  BlogList,
  BlogCategoryList,
  Orders,
  Customers,
  ColorList,
  CategoryList,
  BrandList,
  ProductList,
  AddBlog,
} from "./pages/index.js";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="blog-category-list" element={<BlogCategoryList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="color-list" element={<ColorList />} />
          <Route path="category-list" element={<CategoryList />} />
          <Route path="brand-list" element={<BrandList />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="blog" element={<AddBlog />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
