import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import Apis, { endpoints } from "../../../configs/Apis";
import "./style.css";


export default function AddStore() {
  const [data, setData] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const image = useRef();
  const [name, setName] = useState();
  const [descirption, setDescirption] = useState();

  useEffect(() => {
    const loadData = async () => {
      let res = await Apis.get(endpoints["store"]);

      setData(res.data);
    };
    loadData();
  }, []);
  console.log("store", data);

  const handleSubmit = (event) => {
    event.preventDefault();
    let addStore = async () => {
      const formData = new FormData();
      formData.append("store_name", name);
      formData.append("store_info", descirption);
      formData.append("store_image", image.current.files[0]);
      console.log(formData);
      let res = await Apis.post(endpoints["store"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(alert("Thêm thành công!"));
    };
    addStore();
  };

  const handleClose = () => {
    setIsShowing(!isShowing)
    window.location.reload()
  }
  return (
    <>
      <button
        className="btn btn-primary"
        style={{ margin: 10 }}
        onClick={() => setIsShowing(!isShowing)}
      >
        Thêm công ty
      </button>
      <Modal isOpen={isShowing} ariaHideApp={false}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên cửa hàng:</label>
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
          <button
            style={{ margin: 15 }}
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary submit"
          >
            Submit
          </button>
          <button
            className="btn btn-primary "
            onClick={handleClose}
          >
            Đóng
          </button>
        </form>
      </Modal>
      <h1>Quản lý cửa hàng</h1>
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr >
              <th>Tên cửa hàng</th>
              <th>Thông tin cửa hàng</th>
              <th>Ảnh</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item?.store_name}</td>
                  <td>{item?.store_info}</td>
                  <td>
                    <img height={100} width={100} src={item?.store_image} />
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
