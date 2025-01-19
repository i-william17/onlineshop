import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="w-full h-[370px] relative group"
    >
      <div className="w-full h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 overflow-hidden">
        {/* Image Section */}
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <div className="relative w-full h-[170px] overflow-hidden rounded-lg mb-3 group">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={`${data.images && data.images[0]?.url}`}
              alt={data.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </Link>

        {/* Content Section */}
        <div className="space-y-2">
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <h5 className={`${styles.shop_name} hover:text-indigo-600 transition-colors duration-300`}>
              {data.shop.name}
            </h5>
          </Link>

          <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
            <h4 className="text-gray-800 font-medium line-clamp-2 hover:text-indigo-600 transition-colors duration-300">
              {data.name}
            </h4>

            <div className="flex items-center space-x-1 mt-2">
              <Ratings rating={data?.ratings} />
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <span className={`${styles.productDiscountPrice} text-indigo-600`}>
                  sh {data.originalPrice === 0 ? data.originalPrice : data.discountPrice}
                </span>
                {data.originalPrice && (
                  <span className={`${styles.price} text-gray-500 line-through`}>
                    sh {data.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-green-500 font-medium text-sm">
                {data?.sold_out} sold
              </span>
            </div>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-4 top-4 flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => click ? removeFromWishlistHandler(data) : addToWishlistHandler(data)}
            title={click ? "Remove from wishlist" : "Add to wishlist"}
          >
            {click ? (
              <AiFillHeart className="text-red-500" size={22} />
            ) : (
              <AiOutlineHeart className="text-gray-600" size={22} />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => setOpen(!open)}
            title="Quick view"
          >
            <AiOutlineEye className="text-gray-600" size={22} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => addToCartHandler(data._id)}
            title="Add to cart"
          >
            <AiOutlineShoppingCart className="text-gray-600" size={22} />
          </motion.button>
        </div>
      </div>

      {/* Quick View Modal */}
      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </motion.div>
  );
};

export default ProductCard;