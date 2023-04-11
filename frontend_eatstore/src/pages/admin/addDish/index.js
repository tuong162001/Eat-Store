import { useEffect, useRef, useState } from "react";
import Apis, { endpoints } from "../../../configs/Apis";
import "./style.scss";
import Modal from "react-modal";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Menu } from "@mui/material";
import { forEach } from "lodash";

export default function AddDish() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [dishName, setDishName] = useState();
  const [active, setActive] = useState(true);
  const [menu, setMenu] = useState();
  const [numberPage, setNumberPage] = useState();
  const [quantity, setQuantity] = useState();
  const image = useRef();
  const [descirption, setDescirption] = useState();
  const [category, setCategory] = useState();
  const [company, setCompany] = useState();
  const [price, setPrice] = useState();
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [page, setPage] = useState(1);
  const location = useLocation();


  useEffect(() => {
    const loadData = async () => {
      let query = "";
      if (query === "") query = `?page=${page}`;
      else query += `&page=${page}`;
      let res = await Apis.get(`${endpoints["dish"]}${query}`);
        setData(res.data.results);
        setNext(res.data.next !== null);
        setPrev(res.data.previous !== null);
      let res1 = await Apis.get(endpoints["menu"]);
      // let res2 = await Apis.get(endpoints["author"]);
      // let res3 = await Apis.get(endpoints["company"]);
    console.log(res.data);
      // setData3(res3.data);
      setData1(res1.data);
      // setData2(res2.data);
      setData(res.data.results);
    };
    loadData();
  }, [page]);
  const paging = (inc) => {
    setPage(page + inc);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let addDish = async () => {
      const formData = new FormData();
      formData.append("dish_name", dishName);
      formData.append("dish_price", price);
      formData.append("dish_info", descirption);
      formData.append("dish_image", image.current.files[0]);
      // formData.append("author_id", author);
      formData.append("active", active);
      menu.forEach(i => {
        formData.append("menu",i)
      });
      
      console.log(formData);
      let res = await Apis.post(endpoints["dish"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setDishName("")
      // setPublicDate("")
      setActive("")
      setDescirption("")
      setPrice("")
    };
    addDish();
  };

   const handleMultipleMenu = (event) => {
    let target = event.target
		let name = target.name
    let value = Array.from(event.target.selectedOptions, option => option.value).map(i=>Number(i));;
    setMenu( value);
    // setMenu(event.target.value)
    // console.log(menu);
    // var options = event.target.options;
    //         var value = [];
    //         for (var i = 0, l = options.length; i < l; i++) {
    //           if (options[i].selected) {
    //             value.push(options[i].value);
    //           }
    //         }
    //         setMenu({value: value});
   }
console.log(menu);
  return (
    <>
      <button
        className="btn btn-primary"
        style={{ margin: 10 }}
        onClick={() => setIsShowing(!isShowing)}
      >
        Thêm món ăn
      </button>
      <Modal isOpen={isShowing} ariaHideApp={false}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên món ăn:</label>
            <input
              type="text"
              className="form-control"
              onChange={(event) => setDishName(event.target.value)}
              value={dishName}
            />
          </div>
          <form className="form-group">
            <label>Menu:</label>
            <select
              className="custom-select multiple-select"
              onChange={handleMultipleMenu}
              value={menu}
              multiple={true} 
              size="10"
              name="selectOptions"
            >
              {/* <option selected value={0}></option> */}
              {data1?.map((item, idx) => {
                return (
                  <option  value={item.id} key={item.id}>
                    {item.menu_name}
                  </option>
                );
              })}
            </select>
          </form>
          {/* <form id="form2">
    <select  
             multiple>
      <option value='blue'>Blue</option>
      <option value='green'>Green</option>
      <option value='red'>Red</option>
      <option value='yellow'>Yellow</option>
      <option value='orange'>Orange</option>
      <option value='blue'>Blue</option>
      <option value='green'>Green</option>
      <option value='red'>Red</option>
      <option value='yellow'>Yellow</option>
      <option value='orange'>Orange</option>
      <option value='blue'>Blue</option>
      <option value='green'>Green</option>
      <option value='red'>Red</option>
      <option value='yellow'>Yellow</option>
      <option value='orange'>Orange</option>
    </select>
  </form> */}
          <div className="form-group">
            <label>Giá:</label>
            <input
              name="price"
              type="text"
              className="form-control"
              onChange={(event) => setPrice(event.target.value)}
              value={price}
            />
          </div>
          <div className="form-group">
            <label>Ảnh:</label>
            <input name="image" type="file" v="form-control" ref={image} />
          </div>
          <div className="form-group">
            <label>Thông tin:</label>
            <input
              name="descirption"
              t
              type="text"
              className="form-control"
              onChange={(event) => setDescirption(event.target.value)}
              value={descirption}
            />
          </div>
          {/* <div className="form-group">
            <label>Danh mục:</label>
            <select
              name="category"
              className="custom-select"
              onChange={(event) => setCategory(event.target.value)}
              value={category}
            >
              <option selected value={0}></option>
              {data1?.map((item, idx) => {
                return (
                  <option selected value={item.id} key={item.id}>
                    {item.category_name}
                  </option>
                );
              })}
            </select>
          </div> */}
          {/* <div className="form-group">
            <label>Menu:</label>
            <select
              name="company"
              className="custom-select"
              onChange={(event) => setCompany(event.target.value)}
              value={company}
            >
              <option selected value={0}>
                Chọn
              </option>
              {data3?.map((item, idx) => {
                return (
                  <option
                    selected
                    defaultValue={item.id}
                    value={item.id}
                    key={item.id}
                  >
                    {item.company_name}
                  </option>
                );
              })}
            </select>
          </div> */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary "
          >
            Submit
          </button>
          <button
            className="btn btn-primary "
            onClick={() => setIsShowing(!isShowing)}
          >
            Đóng
          </button>
        </form>
      </Modal>

      <h1>Quản lí món ăn</h1>
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Giá</th>
              <th>Thông tin</th>
              {/* <th>Menu</th> */}
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.dish_name}</td>
                  <td>{item.dish_info}</td>
                  <td>{item.dish_price} VND</td>
                  {/* <td>{item.menu}</td> */}
                  <td>{item.active == true ? "Còn" : "Hết"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination-button">
          <Button 
          style={{borderRadius:'45%',color:'red'}}
          // variant="info" 
          onClick={() => paging(-1)} disabled={!prev}>
            {'<<'}
          </Button>
          <Button
            // variant="info"
            style={{borderRadius:'45%',color:'red'}}
            onClick={() => paging(1)}
            disabled={!next}
          >
            {'>>'}
          </Button>
        </div>
    </>
  );
}
