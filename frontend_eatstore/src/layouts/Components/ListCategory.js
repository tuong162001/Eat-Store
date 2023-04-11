
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../../configs/Apis";
import "./style.css";



export default function ListCategory() {
    // const [categories, setCategories] = useState([])
    const [menu, setMenu] = useState([])
    const [menu1, setMenu1] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const loadMenus = async () => {
            let res = await Apis.get(endpoints['menu'])

            setMenu(res.data)
            setMenu1(res.data)
        }

        // console.log(categories)
        loadMenus()

    }, [])
    const handleListMenu = (itm) => {
        let path = `/?menu_id=${itm.id}`
        navigate(path)
    }

console.log(menu);
console.log(menu1);
    return (
        <div className="list-category main-nav-wrap fixed-menu  l3"
        // style={{ position: 'fixed', zIndex: 99999999 }}
        >
            <ul>
                <li><a href="#">Món bán chạy trong tuần</a></li>
                <li><a href="#">Món bán chạy trong tháng</a></li>
                <li><a href="#">Món mới </a></li>
                {menu.map((itm, idx) => {
                    // let path = `/?category_id=${itm.id}`
                    // console.log(itm.parent_id)
                    if (itm.parent_id === 0)
                        return (
                            <li key={idx} >
                                <a style={{ cursor: 'pointer' }} onClick={() => handleListMenu(itm)} >{itm.menu_name}</a>
                                <div className="nav-sub">
                                    {menu1.map((itm, idx) => {
                                        // let path = `/?category_id=${itm.id}`
                                        if (itm.parent_id === 1)
                                        // console.log(menu);
                                            return (
                                                <ul>
                                                    <li key={idx}>
                                                        <div className="nav-sub-list-box">
                                                            <a style={{ cursor: 'pointer' }} onClick={() => handleListMenu(itm)}><h2>{itm.menu_name}</h2></a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            )


                                    })}


                                </div>
                            </li>

                        )

                        
                })}
            </ul>
        </div >
    )

}
