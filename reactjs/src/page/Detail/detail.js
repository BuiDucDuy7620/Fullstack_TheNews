import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Header from '../../component/headerComponent.js'

const Detail = () => {
    const { id } = useParams();
    // const navigate = useNavigate();

    const [name, setName] = useState('')
    const [detailNews, setDetailNews] = useState('')
    // const[comment,setComent]=useState('')

    const get = async () => {
        try {
            await axios.get(`http://localhost:5000/api/news/getNewsById/${id}`)
                .then((news) => {
                    const dulieu = news.data;
                    setName(dulieu.userID);
                    setDetailNews(dulieu[0]);
                    // // setComment()
                    console.log(news.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error)
        }

    }


    const [user, setUser] = useState(null)
    const getUserLogin = async (token) => {
        try {
            await axios.get('http://localhost:5000/api/user/getUserLogin',
                {
                    headers: {
                        "auth-token": token
                    }
                }
            )
                .then((response) => {
                    const dulieu = response.data;
                    setUser(dulieu.user)
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }
const[comment,setComment]=useState([])
    const getAllCommentByID = async (token) => {
        try {
            await axios.get(`http://localhost:5000/api/comment/getAllCommentsByNewsId/${id}`

            )
                .then((response) => {
                    setComment(response.data)                   
                    console.log("commenttttttttt",response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            getUserLogin(token);
        } else {
            setUser(null)
        }
        get();
        getAllCommentByID()

    }, [])


    const [content, setContent] = useState('')
    const handleOnchangeInput = (e) => {
        setContent(e.target.value)
        console.log('conetdddddddddddddd', content);
    }
    const handleComment = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/api/comment/createComment',
                {
                    userID: user.id,
                    newsID: id,
                    content: content
                }
            )
                .then((news) => {
                    console.log(news);
                    alert('comment success')
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <Header

            ></Header>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{detailNews.title}</Card.Title>
                    <Card.Text>
                        {name}
                    </Card.Text>
                    <Card.Text>
                        {detailNews.content}
                    </Card.Text>
                    <Card.Text>
                {detailNews.image==""||detailNews.image==null?"":<img width={100} height={100} src={detailNews.image}/>}

                        {/* {detailNews.image} */}
                    </Card.Text>

                </Card.Body>
            </Card >
            <input name={content} type='text' value={content} onChange={handleOnchangeInput}></input>
            <button
                onClick={handleComment}
            >comment</button>
            {
                comment.map((item, index) => {
                    return (
                        <div key={index}>
                            <span>{item.userID.name}:</span>
                            <span>{item.content}</span>

                            <br />
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Detail