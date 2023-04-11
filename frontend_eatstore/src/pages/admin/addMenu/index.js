import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import Apis, { endpoints } from "../../../configs/Apis";
import "./style.css";

export default function AddMenu() {
  const [data, setData] = useState([]);
  const [dataStore, setDataStore] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const image = useRef();
  const [name, setName] = useState();
  const [descirption, setDescirption] = useState();
  const [store, setStore] = useState();
  const [orderId, setOrderId] = useState();

  useEffect(() => {
    const loadData = async () => {
      let res = await Apis.get(endpoints["menu"]);
      let res1 = await Apis.get(endpoints["store"]);
      setDataStore(res1.data)
      setData(res.data);
    };
    loadData();
  }, []);
  //   console.log("author", data);

  const handleSubmit = (event) => {
    event.preventDefault();
    let addAuthor = async () => {
      const formData = new FormData();
      formData.append("menu_name", name);
      formData.append("parent_id", descirption);
      formData.append("menu_image", image.current.files[0]);
      formData.append("active", true);
      formData.append("order", orderId);
      store.forEach(i => {
        formData.append("store",i)
      });
      console.log(formData);
      let res = await Apis.post(endpoints["menu"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    };
    addAuthor();
  };

  const handleMultipleStore = (event) => {
    let target = event.target
		let name = target.name
    let value = Array.from(event.target.selectedOptions, option => option.value).map(i=>Number(i));;
    setStore( value);

   }

  console.log(isShowing);
  return (
    <>
      <button
        className="btn btn-primary"
        style={{ margin: 10 }}
        onClick={() => setIsShowing(!isShowing)}
      >
        Thêm menu
      </button>
      <Modal isOpen={isShowing} ariaHideApp={false}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên menu:</label>
            <input
              name="bookName"
              type="text"
              className="form-control"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Ảnh:</label>
            <input name="image" type="file" v="form-control" ref={image} />
          </div>
          <div className="form-group">
            <label>menu con:</label>
            <input
              name="descirption"
              t
              type="text"
              className="form-control"
              onChange={(event) => setDescirption(event.target.value)}
              value={descirption}
            />
          </div>
          <div className="form-group">
            <label>menu con:</label>
            <input
              name="descirption"
              t
              type="text"
              className="form-control"
              onChange={(event) => setOrderId(event.target.value)}
              value={orderId}
            />
          </div>
          <form className="form-group">
            <label>Cửa hàng:</label>
            <select
              className="custom-select multiple-select"
              onChange={handleMultipleStore}
              value={store}
              multiple={true} 
              size="10"
              name="selectOptions"
            >
              {/* <option selected value={0}></option> */}
              {dataStore?.map((item, idx) => {
                return (
                  <option  value={item.id} key={item.id}>
                    {item.store_name}
                  </option>
                );
              })}
            </select>
          </form>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary submit"
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
      <h1>Quản lý menu</h1>
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Tên menu</th>
              <th>Thông tin</th>
              <th>Ảnh</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.menu_name}</td>
                  <td>{item.active == true ? "Còn" : "Hết"}</td>
                  <td>
                    <img height={100} width={100} src={item.menu_image} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
