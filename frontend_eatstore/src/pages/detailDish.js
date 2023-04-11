import { useEffect, useState } from "react";
import { Badge, Button, Col, Form, Image, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import Moment from 'react-moment'
import { useSelector } from "react-redux";
import cookie from "react-cookies";
import Rating from "react-rating"

export default function DetailDish() {
    const [data,setData] = useState()
    const [dataAuthor, setDataAuthor] = useState();
    const [rating, setRating] = useState(0)
    const [dataComment, setDataComment] = useState([]);
    const [changed, setChanged] = useState(1)
    const [commentContent, setCommentContent] = useState(null)
    let {id} = useParams()
    const { isLogin, user } = useSelector((state) => state.userReducer);

    useEffect(() => {
        let loadData = async () => {
            try {
                let res = await Apis.get(endpoints["detail-dish"](id))
                setData(res.data);
                console.log(res.data);
                setRating(res.data.rate)
                console.log(res.data.rate);
                // let res1 = await Apis.get(endpoints["author"]);
                //  res1?.data.map((item) => {
                //     if (res.data.author_id === item.id) {
                //         console.log(item.author_name);
                //       setDataAuthor(item.author_name);
                //     }})
            } catch (error) {
                console.log(error);
            }
        }
    
        let loadComment = async () => {
            try {
                let res = await Apis.get(endpoints["comment"](id))
                setDataComment(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        loadData()
        loadComment()
    },[changed])


    const addComment = async (event) => {
        event.preventDefault()

        try {
            let res = await Apis.post(endpoints['add-comment'](id), {
                "content": commentContent
            }, {
                headers: {
                    "Authorization": `Bearer ${cookie.load("access_token")}`
                }
            })
            console.log(changed);
            dataComment.push(res.data)
            setDataComment(dataComment)
            setChanged(dataComment.length)
            console.log(changed);
            setCommentContent('')
        } catch (err) {
            console.error(err)
        }
 
    }

    const saveRating = async (rate) => {
        if (window.confirm("Bạn có muốn đánh giá khóa học này?") === true) {
            try {
                let res = await Apis.post(endpoints['rating'](id), {
                    "rating": rate
                }, {
                    headers: {
                        "Authorization": `Bearer ${cookie.load("access_token")}`
                    }
                })
                console.info(res.data)
            } catch (err) {
                console.error(err)
            }
        }
    }
    
    if(data === null){
        return <Spinner animation="border" />
    }
    let comment = <em><Link className="text-danger" to="/login">Đăng nhập</Link> để bình luận</em>
    let r = ""
    if (user !== null && user !== undefined) {
        comment = <Form onSubmit={addComment} style={{margin:10}}>
                    <Form.Group className="mb-3" controlId="commentContent">
                      <Form.Control as="textarea" 
                                    value={commentContent}
                                    onChange={(event) => setCommentContent(event.target.value)}
                                    placeholder="Nhập nội dung bình luận..." rows={3} />
                    </Form.Group>
                    <Button type="submit" variant="success">Thêm bình luận</Button>
                  </Form>

        r = <Rating initialRating={rating} onClick={saveRating} />
    }
    // console.log(dataComment);
    console.log(data);
  return (
    <>
      <h1> </h1>
      <div className="container">
        <Row>
            <Col md={5} xs={12} >
                <Image width={450} height={500} src={`${data?.dish_image}`}  rounded   />
            </Col>
            <Col md={7} xs={12}>
                <h2 className="text-success">{data?.dish_name}</h2>
                <p className="text-danger" > Giới thiệu: {data?.dish_info}</p>
                <p className="text-danger"> Giá: {data?.dish_price}</p>
                {/* <p className="text-danger"> Tác giả: {dataAuthor}</p> */}
                <p className="text-danger"> Ngày xuất bản: {data?.created_at}</p>
                <p>
                        {r}
                    </p>
            </Col>
        </Row>
        <hr/>
        {comment}
        {dataComment?.map((item,idx) => 
            <Row key={idx} style={{ marginBottom:10}}>
                <Col md={2} xs={5}>
                            <Image height={70} src={item.creator.avatar}  />
                </Col>
                <Col key={idx} md={2} xs={5}>
                    <p >{item.creator.username}</p>
                    <p >{item.content}</p>
                    <p> <Moment fromNow >{item.update_at}</Moment></p>
                </Col>
                <hr/>
            </Row> )}
      </div>

    </>
  );
}
