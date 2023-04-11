import { useEffect, useState } from "react";
import React from 'react';
import Apis, { endpoints } from "../configs/Apis";
import "./style.css";
import PrimarySearchAppBar from "./Components/Menu";
import ListCategory from "./Components/ListCategory";



export default function Header() {
    const [data, setData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            let res = await Apis.get(endpoints['dish'])
            setData(res.data.results)
        }
        loadData()

    }, [])

    console.log(data);
    return (
        <>
            <header>
                <div className="header-always-top">
                    <PrimarySearchAppBar />
                    
          {/* <ListCategory /> */}
                </div>
            </header>


        </>
    )

}