import _ from 'lodash';
import { ResponsiveBar } from '@nivo/bar'
import { zip, zipObject, zipObjectDeep } from 'lodash';
import { useEffect, useState } from 'react';
import Apis, { endpoints } from '../../../configs/Apis';

const data1 = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

export default function Statistic() {
    const [data, setData] = useState([])
    const [month, setMonth] = useState([])
    const [year, setYear] = useState([])
    const [price, setPrice] = useState([])
    const tempMonth = []
    const temp = []
    const tempPrice = []
    const tempYear = []
    var tempArr = []
    const months = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
    ];

    function convertData(arr, idx) {
        let temp = months[new Date(arr.created_at).getMonth()]
        if (temp === idx) {
            return arr.price
        }

    }

    function convertMonth(arr, idx) {
        let temp = months[new Date(arr.created_at).getMonth()]
        if (temp === idx) {
            return 1
        }

    }

    

    useEffect(() => {
        const loadData = async () => {
            let res = await Apis.get(endpoints['order-all'])
            console.log(res.data);
            // setData(res.data)
            const loadPrice = async () => {
                await res?.data?.map(item => {
                    months.map(mon => {
                        let a = convertData(item, mon)
                        let b = convertMonth(item,mon)
                        if (a) {
                            let c = { [mon]: a }
                            tempPrice.push(c)
                            setPrice(tempPrice)
                        }
                        if (b) {
                            let d = { [mon]: b }
                            temp.push(d)
                            // setPrice(tempPrice)
                        }
                    })
                })
                console.log(tempPrice);
                months?.map(mon => {
                    let a = (_.sumBy(tempPrice, mon))
                    let b = (_.sumBy(temp, mon))
                    if (a) {
                        let c = {
                            "month": mon,
                            "revenue": a
                        }
                        tempMonth.push(c)
                    } else {
                        let c = {
                            "month": mon,
                            "revenue": 0
                        }
                        tempMonth.push(c)
                    }
                    if(b) {
                        let d = {
                            "month":mon,
                            "count": b
                           
                        }
                        tempArr.push(d)
                    }else {
                        let d = {
                            "month": mon,
                            "revenue": 0
                        }
                        tempArr.push(d)
                    }
                    


                    setMonth(tempMonth)
                    setData(tempArr)
                })
            }
            loadPrice()
        }
        loadData()
    }, [])
    console.log(month);
    console.log(data.length);
        // for (let i = 0; i < data.length; t++) {
        //     let temp = 0;
        //     if()
        // }
     
    const format = v => `${v.toLocaleString()}`
    return (
        <>
            <h1>Thống kê doanh thu theo tháng</h1>
            <div style={{ height: 500, width: 1000, marginLeft: 200 }}>
                <ResponsiveBar
                    data={month}
                    margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
                    padding={0.2}
                    // valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'nivo' }}
                    valueFormat={format}
                    tooltipFormat={format}
                    keys={["revenue"]} indexBy="month"
                    axisLeft={{ format: v => `${v.toLocaleString()}VNĐ` }}
                    axisBottom={{ format: v => `Tháng ${v}` }}
                    enableGridX={true}
                    tooltip={({ id, value, color, label, index }) => (
                        <div
                            style={{
                                padding: 12,
                                color,
                                background: '#222222',
                            }}
                        >
                            <span style={{ color: 'white' }}>Tháng {index}   </span>
                            <br />
                            <strong>
                                {value.toLocaleString()} VNĐ
                            </strong>
                        </div>
                    )}
                />
            </div>
            <h1>Thống kê đơn hàng</h1>
            <div style={{ height: 500, width: 1000, marginLeft: 200 }}>
                <ResponsiveBar
                    data={data}
                    margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
                    padding={0.2}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'nivo' }}
                    valueFormat={format}
                    tooltipFormat={format}
                    keys={["count"]} indexBy="month"
                    axisLeft={{ format: v => Math.floor(v) !== v || `${v} Đơn hàng`   }}
                    axisBottom={{ format: v => `Tháng ${v}` }}
                    enableGridX={true}
                    tooltip={({ id, value, color, label, index }) => (
                        <div
                            style={{
                                padding: 12,
                                color,
                                background: '#222222',
                            }}
                        >
                            <span style={{ color: 'white' }}>Số đơn hàng tháng: {index}   </span>
                            <br />
                            <strong>
                                {value.toLocaleString()} Đơn
                            </strong>
                        </div>
                    )}
                />
            </div>
        </>
    )
}