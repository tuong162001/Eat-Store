import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import tesst from "./test";
import Login from "../pages/login";
import SignInForm from "./Components/SignInForm";
import ShoppingCard from "../pages/shoppingCard/shoppingCard";
import Order from "../pages/order";
import { useSelector } from "react-redux";
import Admin from "../pages/admin";
import Statistic from "../pages/admin/statistic";
import DetailBook from "../pages/detailDish";
import AddStore from "../pages/admin/addStore";
import AddDish from "../pages/admin/addDish";
import DetailDish from "../pages/detailDish";
import AddMenu from "../pages/admin/addMenu";
import UpdateUser from "../pages/admin/UpdateUser";

export default function Body() {
  const { isLogin, user } = useSelector((state) => state.userReducer);
  if (!user?.is_superuser) {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/menu" element={<Home />} /> */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/shopping-card" element={<ShoppingCard />} />
          <Route exact path="/order" element={<Order />} />
          <Route exact path="/dish/:id/" element={<DetailDish />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Admin />
        <Routes>
          <Route exact path="/thong-ke" element={<Statistic />} />
          <Route exact path="/add-store" element={<AddStore />} />
          <Route exact path="/add-dish" element={<AddDish />} />
          <Route exact path="/add-menu" element={<AddMenu />} />
          <Route exact path="/add-user" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
