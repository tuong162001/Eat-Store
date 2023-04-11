import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import Apis, { endpoints } from "../../../configs/Apis";
import "./style.css";


export default function UpdateUser() {
  const [data, setData] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const image = useRef();
  const [name, setName] = useState();
  const [descirption, setDescirption] = useState();
  const [isCheck, setIsCheck] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      let res = await Apis.get(endpoints["user"]);

      setData(res.data);
    };
    loadData();
  }, []);


  useEffect(() => {
    setIsCheck(!isCheck)
  },[descirption])
  // console.log("user", data);

  

  const handleClose = () => {
    setIsShowing(!isShowing)
    // window.location.reload()
  }
    
  const handleBtnUpdate = (item) => {
    setIsShowing(!isShowing)
    setName(item)
    // setIsCheck(item.is_active)
    // setDescirption(item.is_active)
  }
  

  function UpdateUser(item) {
    
    const handleIsCheck =  () => {
      // console.log(isCheck);
      setDescirption(!item.is_active)
      // setIsCheck(descirption)
      console.log(descirption);
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(item.id);
      let addStore = async () => {
        const formData = new FormData();
        formData.append("is_active", descirption);
        console.log(formData);
        let res = await Apis.patch(endpoints["update-user"](item.id), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then(alert("Update thành công!")).then(window.location.reload());
      };
      addStore();
    };

    return(
      <Modal isOpen={isShowing} ariaHideApp={false}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên tài khoản:     </label>
    
    
             <label style={{fontSize:30,paddingLeft:20}}>    { item.username}</label>
          </div>
          <div className="form-group" style={{display:"flex", justifyContent:"flex-start", margin:10}}>
          <label>Kích hoạt:</label>
            <input style={{width:"10%", height:30}} type="checkbox" className="control" onChange={() => handleIsCheck()} defaultChecked={item.is_active} ></input>
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
    )
  }
  return (
    <>
      {/* <button
        className="btn btn-primary"
        style={{ margin: 10 }}
        onClick={() => setIsShowing(!isShowing)}
      >
        Thêm công ty
      </button> */}
      {isShowing && UpdateUser(name)}
      <h1>Quản lý tài khoản</h1>
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr >
              <th>Tên tài khoản</th>
              <th>Email</th>
              <th>Active</th>
              <th>Avatar</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => {
              let active = item?.is_active;
              let a = "";
              // console.log(active);
              if(active){
                a = "Đã kích hoạt"
              } else {
                a = "Chưa kích hoạt"
              }
              console.log(item.id);
              return (
                <tr key={idx}>
                  <td>{item?.username}</td>
                  <td>{item?.email}</td>
                  <td>{a}</td>
                  <td>
                    <img height={100} width={100} src={item?.avatar} />
                  </td>
                  <td><button  className="btn btn-primary" disabled={item.id === 1 ? true : false} onClick={() => handleBtnUpdate(item)}>Update</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
