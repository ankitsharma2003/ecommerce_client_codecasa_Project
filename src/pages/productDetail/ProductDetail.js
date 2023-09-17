import React, { useEffect, useState } from "react";
import "./ProductDetail.scss";
import dummyImg from "../../assets/naruto.jpeg";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import Loading from "../../components/loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";

function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer.cart);
  const quantity =
    cart.find((item) => item.key === params.productId)?.quantity || 0;

  async function fetchData() {
    const productResponse = await axiosClient.get(
      `/products?filters[key][$eq]=${params.productId}&populate=*`
    );

    if (productResponse.data.data.length > 0) {
      setProduct(productResponse.data.data[0]);
    }
  }

  useEffect(() => {
    setProduct(null);
    fetchData();
  }, [params]);

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="ProductDetail">
      <div className="container">
        <div className="product-layout">
          <div className="product-img center">
            <div className="img-container">
              <img
                src={product?.attributes.image?.data.attributes.url}
                alt="product"
              />
            </div>
          </div>
          <div className="product-info">
            <h1 className="heading">{product?.attributes.title}</h1>
            <h3 className="price">Rs {product?.attributes.price}</h3>
            <p className="description">{product?.attributes.desc}</p>
            <div className="cart-options">
              <div className="quantity-selector">
                <span
                  className="btn decriment"
                  onClick={() => dispatch(removeFromCart(product))}
                >
                  -
                </span>
                <span className="quantity">{quantity}</span>
                <span
                  className="btn incriment"
                  onClick={() => dispatch(addToCart(product))}
                >
                  +
                </span>
              </div>
              <button
                className="btn-primary add-to-cart"
                onClick={() => dispatch(addToCart(product))}
              >
                ADD TO CART
              </button>
            </div>
            <div className="return-policy">
              <ul>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Dolor, necessitatibus?
                </li>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum, corrupti excepturi.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
