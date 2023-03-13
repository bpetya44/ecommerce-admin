import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";

const columns = [
  {
    title: "#",
    dataIndex: "key",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price.length - b.price.length,
    sortDirections: ["descend"],
  },
  {
    title: "Qty",
    dataIndex: "quantity",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a?.category?.length - b?.category?.length,
    sortDirections: ["descend"],
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a?.brand?.length - b?.brand?.length,
    sortDirections: ["descend"],
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      price: `$${productState[i].price}`,
      quantity: productState[i].quantity,
      category: productState[i].category,
      brand: productState[i].brand,
      color: productState[i].color,
      action: (
        <>
          <Link className="text-danger fs-5" to="/">
            <BiEdit />
          </Link>
          <Link className="text-danger ms-3 fs-5" to="/">
            <BiTrash />
          </Link>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ProductList;
