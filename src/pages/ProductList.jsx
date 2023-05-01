import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  resetState,
  deleteProduct,
} from "../features/product/productSlice";
import CustomModal from "../components/CustomModal";
import { getColors } from "../features/color/colorSlice";

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
    sorter: (a, b) => b.title.localeCompare(a.title),
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
    sorter: (a, b) => b.title.localeCompare(a.title),
    sortDirections: ["descend"],
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => b.title.localeCompare(a.title),
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
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };
  //console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
    dispatch(getColors());
  }, [dispatch]);

  const colorState = useSelector((state) => state?.color?.colors);
  //console.log(colorState);
  const productState = useSelector((state) => state?.product?.products);
  console.log("ProductState:", productState);
  const data1 = [];
  for (let i = 0; i < productState?.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i]?.title,
      price: `$${productState[i]?.price}`,
      quantity: productState[i]?.quantity,
      category: productState[i]?.category,
      brand: productState[i]?.brand,
      color: productState[i]?.color.map((item) => {
        return (
          <span
            key={item}
            className="me-2"
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              display: "inline-block",
              backgroundColor: `${
                colorState?.find((color) => color._id === item)?.title
              }`,
            }}
          ></span>
        );
      }),

      action: (
        <>
          <Link
            className="text-danger fs-5"
            to={`/admin/product/${productState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            type="submit"
            className="text-danger ms-3 fs-5 bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const deleteAProduct = (e) => {
    dispatch(deleteProduct(e));
    setOpen(false);
    dispatch(resetState());

    setTimeout(() => {
      dispatch(getProducts());
    }, 300);
  };

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        title="Are you sure you want to delete this product?"
        performAction={() => {
          deleteAProduct(productId);
        }}
      />
    </div>
  );
};

export default ProductList;
