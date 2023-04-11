import { IconButton } from "@material-ui/core";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./style.css";
import { Badge } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { shoppingCartActions } from "../../store/actionReducer/shopping-cart-action";
import { useEffect } from "react";
import { useState } from "react";
import Apis, { endpoints } from "../../configs/Apis";

export default function Ecard(props) {
  let path = `/dish/${props.obj.id}`
  // if (props.type === "lesson")
  //     path = `/lessons/${props.obj.id}`
  const [renderName, setRenderName] = useState(<></>);
  const shoppingCard = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const loadAuthor = async () => {
  //     try {
  //       let res = await Apis.get(endpoints["author"]);
  //       setAuthor(res.data);
  //       res.data.map((item) => {
  //         if (item.id === props.obj.author_id) {
  //           // console.log(item.author_name);
  //           setRenderName(item.author_name);
  //         }
  //       });
  //     } catch (error) {
  //       console(error);
  //     }
  //   };

  //   // const nameAuthor = async () => {
  //   //       await res.data.map(item =>  {
  //   //         console.log(item.author_name);
  //   //         if(item.id === props.obj.author_id){

  //   //             // console.log(item.author_name);
  //   //             setRenderName(item.author_name)
  //   //         }

  //   //     })}

  //   loadAuthor();
  // }, []);

  // setRenderName(nameAuthor)
  const handleAddCard = (prd) => {
    const find = shoppingCard?.products?.find((f) => f.id === prd?.id);
    if (find) {
      dispatch(shoppingCartActions.upQtyProduct(prd, 1));
    } else {
      dispatch(
        shoppingCartActions.addProduct({
          ...prd,
          qty: 1,
        })
      );
    }
  };

  return (
    <Col md={4} xs={12}>
      <Card className="margin-card">
        <Link to={path}>
          <Card.Img
            className="image-courses"
            variant="top"
            src={props.obj.dish_image}
          />
        </Link>
        <Card.Body>
          <Card.Title
            style={{ fontWeight: "bold", fontSize: 15 }}
            className="text-info"
          >
            {props.obj.dish_name}
          </Card.Title>
          <Card.Title className="card-title">
            {props.obj.active} 
          </Card.Title>
          <Card.Title
            style={{ minHeight: 25, fontWeight: "bold" }}
            className="text-danger"
          >
            {/* {renderName} */}
          </Card.Title>
          <Card.Text style={{ color: "red", fontWeight: "bold" }}>
            {props.obj.dish_price.toLocaleString()}Đ
          </Card.Text>
          <div className="top-act-prd">
            <IconButton onClick={() => handleAddCard(props.obj)}>
              <Badge badgeContent={props.count} color="primary">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
