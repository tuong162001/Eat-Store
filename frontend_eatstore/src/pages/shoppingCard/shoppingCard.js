import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash"
import { useNavigate } from "react-router-dom"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import useMediaQuery from '@mui/material/useMediaQuery';
import clsx from 'clsx';
import { shoppingCartActions } from "../../store/actionReducer/shopping-cart-action";


import { ShoppingCardStyled } from "./ShoppingCard-styled";
import { Container } from "@mui/system";


export default function ShoppingCard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isDesktop = useMediaQuery('(min-width:1100px)');
    const shoppingCard = useSelector(state => state.shoppingCart)
    const { isLogin, user } = useSelector(state => state.userReducer)

    // console.log(shoppingCard?.products?.length)

    const handleRemovePrdClick = (prd) => {
        dispatch(shoppingCartActions.removeProduct(prd))
    }
    const handleGo2HomeClick = () => {
        navigate('/')
    }

    const handlePayment = () => {
        if (isLogin) {
            navigate('/order')
        } else {
            navigate('/login')
        }

    }

    const handleUpdateQty = (prd, number) => {
        dispatch(shoppingCartActions.upQtyProduct(prd, number))
    }

    function formatNumber(number) {
        return new Intl.NumberFormat('vn', { style: 'currency', currency: 'VND' }).format(number)
    }

    function renderNoProds() {
        return (
            <div className="no-data" >
                <ErrorOutlineIcon />
                <Typography>Giỏ hàng của bạn chưa có sản phẩm nào</Typography>
                <Button variant="contained" color="primary" style={{ marginTop: 32 }} onClick={handleGo2HomeClick}>Mua thêm sản phẩm</Button>
                <div style={{ height: 250 }}></div>
            </div>
        )
    }
    function renderProds() {
        return (
            <>
                <Button fullWidth variant="outlined" style={{ color: "#000", borderColor: "#bebebe", background: "white" }} onClick={handleGo2HomeClick}>Mua thêm sản phẩm khác</Button>
                <div className="wrap-prds">
                    {shoppingCard?.products?.map((prd, idx) => {
                        return (
                            <div key={idx} className="prd-item">
                                <div className={clsx("col1", {
                                    "col1-desktop": isDesktop
                                })}>
                                    <img style={{ width: "100%" }} src={prd.dish_image} />
                                    <Button size={isDesktop ? "normal" : "small"} variant="contained" style={{ background: "#1565c0" }} onClick={() => handleRemovePrdClick(prd)}>Xóa</Button>
                                </div>

                                <div className={clsx("col2", { "col2-desktop": isDesktop })}>
                                    <Typography variant={isDesktop ? "body1" : "caption"}>{prd.dish_name}</Typography>
                                </div>

                                <div className="col3">
                                    <div className="wrap-price">
                                        {/* <Typography>{prd.price}</Typography> */}
                                        <Typography>{formatNumber((prd.dish_price))}</Typography>
                                    </div>
                                    <div className="wrap-act">
                                        <Button size={isDesktop ? "normal" : "small"} variant="contained" onClick={() => handleUpdateQty(prd, -1)}>-</Button>
                                        <TextField value={prd.qty} style={{ width: 30, margin: "0 4px", textAlign: "right" }} size="small" />
                                        <Button size={isDesktop ? "normal" : "small"} variant="contained" onClick={() => handleUpdateQty(prd, 1)}>+</Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="sum">
                    <div className="sum-top btn-hover">
                        <Typography style={{ flex: 1 }}>Tổng tiền</Typography>

                        <Typography color="#B32034">{formatNumber(_.sum(shoppingCard.products.map(p => p.qty * Number(p.price))))}</Typography>
                    </div>

                    <Button onClick={handlePayment} style={{ background: 'white', border: '1px solid' }} >Thanh Toán</Button>
                </div>

                <div style={{ marginBottom: 32 }} />
            </>
        )
    }
    return (
        <ShoppingCardStyled>
            <div className="space-empty"></div>
            <Container style={{ padding: isDesktop ? "0px 16px" : 0, maxWidth: isDesktop ? 800 : "unset" }}>
                {shoppingCard?.products?.length ? renderProds() : renderNoProds()}
            </Container>
        </ShoppingCardStyled>
    );
}


