import axios from "axios";

export let endpoints = {
  'menu': "/menu/",
  'dish': "/dish/",
  'user': "/user/",
  'update-user':(id) => `/user/${id}/`,
    "detail-dish" : (id) => `/dish/${id}/`,
  "oauth2-info": "/oauth2-info/",
  'login': "/o/token/",
  "current-user": "/user/current_user/",
  'register': "/user/",
  'order': "/orders/add-order/",
  "order-detail": (id) => `/orders/${id}/add-detail/`,
  "order-all": "/orders/",
  "follow": "/follow/",
  "comment": (id) => `/dish/${id}/comments/`,
  "rating": (id) => `/dish/${id}/rating/`,
  "add-comment": (id) => `/dish/${id}/add-comment/`,
  "store": "/store/",
  // "detail-book" : (id) => `/books/${id}/`,
  // "comment": (id) => `/books/${id}/comments/`,
  // "add-comment": (id) => `/books/${id}/add-comment/`,
  // "rating": (id) => `/books/${id}/rating/`,
  // "detail-order": "/order_detail/",
};
export default axios.create({
  baseURL: "http://localhost:8000/",
});
