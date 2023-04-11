import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import Ecard from "../layouts/Components/Card";
import { useDispatch, useSelector } from "react-redux";
import ListCategory from "../layouts/Components/ListCategory";
import SwipeableTextMobileStepper from "../layouts/Components/SliderQC";
import "./style.css";


function unique(arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
function countArr(arr,j) {
  var count = 0; 
  for(var i = 0; i < arr.length; ++i){ if(arr[i] == j) count++; }
  return count
}
function CheckMax(count) {
  return count > 5
}

export default function Home() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const shoppingCard = useSelector((state) => state.shoppingCart);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [page, setPage] = useState(1);
  const [data1, setData1] = useState([]);
  let tempArr = []
  let tempArr1 = []

  useEffect(() => {
    const loadData = async () => {
      let query = location.search;
      if (query === "") query = `?page=${page}`;
      else query += `&page=${page}`;
      try {
        let res = await Apis.get(`${endpoints["dish"]}${query}`);
        let res1 = await Apis.get(endpoints["detail-order"]);
        
        // console.log(res1.data);
        setData(res.data.results);
        setNext(res.data.next !== null);
        setPrev(res.data.previous !== null);
        // let a = res1.data.map(item => item.book)
        // let c = unique(a)
        // let b = c.map(i => {
        //   // countArr(a,2)
        //   let d = {
        //     "id":i,
        //     "count":countArr(a,i)
        //   }
        //   tempArr.push(d)

        // })
        // let c1 = tempArr.sort(function(a, b){return a.count - b.count});
        // const tempId = (c1.splice(-4,100))
        // tempId.map(async id => {
        //   let res2 = await Apis.get(endpoints["detail-book"](id.id))
        //   // console.log(res2.data);
        //   tempArr1.push(res2.data)
          
        //   console.log(tempArr1);
        //   setTimeout(() => {
        //     setData1(tempArr1)
        //   }, 1000);
        // })
        
        // console.log(tempArr1);
        
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [location.search, page]);
  const paging = (inc) => {
    setPage(page + inc);
  };
  //  let a = data1.map(item => { item.find(item => item.count >= 5)});
  // let a = data1.map(i => i.count)
  // let c = data1.sort(function(a, b){return a - b});
  // let d = c.splice(-4,100)
  // let b = CheckMax(a)
  // console.log(b);
  
  // let b = a.sort(function(a, b){return a - b});
  // console.log(b.splice(-4,100));

  //  console.log(data1);
  // console.log(data1.map(i => i.id));
  // const data2 = data1.map(i => i.id)
  const truoc = <> <h1> `{'>>'}` </h1> </>
  return (
    <>
      <Container>
        <div className="slider-list-flex">
          <ListCategory />
          <SwipeableTextMobileStepper />
        </div>
        <hr />
        {/* <h1 style={{ height: 10000 }}>My Hhome</h1> */}
        <h1>Sách được mua nhiều nhất </h1>
        {/* <Row>
          {data1?.map((itm, idx) => {
            const find = shoppingCard?.products?.find((f) => f.id === itm.id);
            let count = 0;
            if (find) {
              count = find?.qty;
            }
            return <Ecard key={idx} obj={itm} count={count} type="id" />;
          })}
        </Row> */}
        <hr/>
        <h1>Món ăn phổ biến</h1>
        <Row>
          {data.map((itm, idx) => {
            const find = shoppingCard?.products?.find((f) => f.id === itm.id);
            let count = 0;
            if (find) {
              count = find?.qty;
            }
            return <Ecard key={idx} obj={itm} count={count} type="id" />;
          })}
        </Row>
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
      </Container>
    </>
  );
}
