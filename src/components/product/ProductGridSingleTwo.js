import PropTypes from "prop-types"
import React, { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { useToasts } from "react-toast-notifications"
import { getDiscountPrice } from "../../helpers/product"
import ProductModal from "./ProductModal"
import Image from '../../assets/img/products/product_640-1.jpg'
import routes from '../../constants/routes'

const ProductGridSingleTwo = ({
  productItem,
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
  colorClass,
  titlePriceClass
}) => {
  const [modalShow, setModalShow] = useState(false)
  const { addToast } = useToasts()

  const discountedPrice = getDiscountPrice(productItem.productPrice, productItem.productPrice)
  const finalProductPrice = +(productItem.productPrice * currency.currencyRate).toFixed(2)
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2)

  return (
    <Fragment>
      <div
        className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap-2 ${
            spaceBottomClass ? spaceBottomClass : ""
          } ${colorClass ? colorClass : ""} `}
        >
          <div className="product-img">
            <Link to={{
              pathname: process.env.PUBLIC_URL + routes.productItem,
              state: productItem,
              search: productItem.id + ""
            }}>
              <img
                className="default-img"
                src={Image}
                alt=""
              />
              {/* If you have more than one image */}
              {false ? (
                <img
                  className="hover-img"
                  src={Image}
                  alt=""
                />
              ) : (
                ""
              )}
            </Link>
            {productItem.discount || productItem.new ? (
              <div className="product-img-badges">
                {productItem.discount ? (
                  <span className="pink">-{productItem.discount}%</span>
                ) : (
                  ""
                )}
                {productItem.new ? <span className="purple">New</span> : ""}
              </div>
            ) : (
              ""
            )}

            <div className="product-action-2">
              {productItem.affiliateLink ? (
                <a
                  href={productItem.affiliateLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Buy now"
                >
                  {" "}
                  <i className="fa fa-shopping-cart"></i>{" "}
                </a>
              ) : productItem.variation && productItem.variation.length >= 1 ? (
                <Link
                  to={`${process.env.PUBLIC_URL}/product/${productItem.id}`}
                  title="Select options"
                >
                  <i className="fa fa-cog"></i>
                </Link>
              ) : productItem.stock && productItem.stock > 0 ? (
                <button
                  onClick={() => addToCart(productItem, addToast)}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  {" "}
                  <i className="fa fa-shopping-cart"></i>{" "}
                </button>
              ) : (
                <button disabled className="active" title="Out of stock">
                  <i className="fa fa-shopping-cart"></i>
                </button>
              )}

              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="fa fa-eye"></i>
              </button>

              <button
                className={compareItem !== undefined ? "active" : ""}
                disabled={compareItem !== undefined}
                title={
                  compareItem !== undefined
                    ? "Added to compare"
                    : "Add to compare"
                }
                onClick={() => addToCompare(product, addToast)}
              >
                <i className="fa fa-retweet"></i>
              </button>
            </div>
          </div>
          <div className="product-content-2">
            <div
              className={`title-price-wrap-2 ${
                titlePriceClass ? titlePriceClass : ""
              }`}
            >
              <h3>
                <Link to={{
                  pathname: process.env.PUBLIC_URL + routes.productItem,
                  state: productItem,
                  search: productItem.id + ""
                }}>
                  {productItem.productName}
                </Link>
              </h3>
              <div className="price-2">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>
                      {currency.currencySymbol + finalDiscountedPrice}
                    </span>{" "}
                    <span className="old">
                      {currency.currencySymbol + finalProductPrice}
                    </span>
                  </Fragment>
                ) : (
                  <span>{currency.currencySymbol + finalProductPrice} </span>
                )}
              </div>
            </div>
            <div className="pro-wishlist-2">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => addToWishlist(productItem, addToast)}
              >
                <i className="fa fa-heart-o" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={productItem}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  )
}

ProductGridSingleTwo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  wishlistItem: PropTypes.object
}

export default ProductGridSingleTwo
