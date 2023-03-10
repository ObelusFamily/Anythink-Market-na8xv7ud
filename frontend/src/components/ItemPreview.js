import React from "react";
import { Link } from "react-router-dom";
import agent from "../agent";
import { connect } from "react-redux";
import { ITEM_FAVORITED, ITEM_UNFAVORITED } from "../constants/actionTypes";

const mapDispatchToProps = (dispatch) => ({
  favorite: (slug) =>
    dispatch({
      type: ITEM_FAVORITED,
      payload: agent.Items.favorite(slug),
    }),
  unfavorite: (slug) =>
    dispatch({
      type: ITEM_UNFAVORITED,
      payload: agent.Items.unfavorite(slug),
    }),
});

const ItemPreview = (props) => {
  const item = props.item;
  const isVerified = item.seller.isVerified;

  const handleClick = (ev) => {
    ev.preventDefault();
    if (item.favorited) {
      props.unfavorite(item.slug);
    } else {
      props.favorite(item.slug);
    }
  };

  const TopSellerView = () => {
    return(
      <div className="d-flex">
        <img 
          src="verified_seller.svg" 
          alt=""
          className="verified-seller"
        /> 
        <span className="mx-2">TOP SELLER</span>
      </div>
    )
  }

  return (
    <div
      className="card bg-dark border-light p-3"
      style={{ borderRadius: "20px" }}
      id={`item_${item.slug}`}
    >
      <img
        alt="item"
        src={item.image}
        className="card-img-top item-img"
        style={{ borderRadius: "20px" }}
      />
      <div className="card-body">
        <Link to={`/item/${item.slug}`} className="text-white">
          <h3 className="card-title">{item.title}</h3>
          <p className="card-text crop-text-3">{item.description}</p>
        </Link>
        <div className="d-flex flex-row align-items-center pt-2 item-footer">
          <Link to={`/@${item.seller.username}`} className="flex-grow-1">
            <img
              src={item.seller.image}
              alt={item.seller.username}
              className="user-pic rounded-circle pr-1"
            />
          </Link>
          {isVerified ?<TopSellerView /> : null}
          <button className="btn btn-outline-secondary" onClick={handleClick}>
            <i className="ion-heart"></i> {item.favoritesCount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ItemPreview);
