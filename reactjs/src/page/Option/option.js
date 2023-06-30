import React from 'react'
import Header from '../../component/headerComponent'
import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import NewsOption from "../../component/newsOption"

// css
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios'
const Option = () => {
    const { id } = useParams()
    const [news, setNews] = useState([])
    // const [user, setUser] = useState(null)
    const getNewsByUserID = async () => {
        try {

            await axios.get(`http://localhost:5000/api/news/getNewsByUserID/${id}`)
                .then((news) => {
                    console.log(id)
                    const data = news.data
                    setNews(data)
                    console.log(data[0]._id);

                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) { console.log(error); }
    }
    // const getUserLogin = async (token) => {
    //     try {
    //         await axios.get('http://localhost:5000/api/user/getUserLogin',
    //             {
    //                 headers: {
    //                     "auth-token": token
    //                 }
    //             })
    //             .then((response) => {
    //                 const dulieu = response.data
    //                 setUser(dulieu.user)
    //             })
    //             .catch((err) => { console.log(err); })
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }
    useEffect(() => {

        getNewsByUserID();
        // const token = localStorage.getItem('token')
        // if (token) {
        //     getUserLogin(token)
        // }
    }, [])

    const [titlePost, setTitlePost] = useState('');
    const [contentPost, setContentPost] = useState("");
    const [descriptionPost, setDescriptionPost] = useState("");
    const [imagePost, setImagePost] = useState("");

    const onChangeTitlePost = (e) => {
        setTitlePost(e.target.value)
    }
    const onChangeContentPost = (e) => {
        setContentPost(e.target.value)
    }

    const convertToBase64 = (e) => {
        var reader=new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload=()=>{
            console.log(reader.result);
            setImagePost(reader.result)
        }
        reader.onerror=(error)=>{
            console.log('error',error);
        }
    }
    const onChangeDescriptionPost = (e) => {
        setDescriptionPost(e.target.value)
    }

    const onHandleSubmitPost = async (e) => {

        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/api/news/createNews', {
                userID: id,
                title: titlePost,
                description: descriptionPost,
                content: contentPost,
                image: imagePost
            })
                .then((response) => {
                    alert('post succes')
                })
                .catch((error) => {
                    console.log(error);
                    alert(error)
                })
        } catch (error) {
            console.log(error);
        }
    }

    // const onHandleSubmitUpdate = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.put('http://localhost:5000/api/news/updateNewsById',

    //         )
    //             .then((response) => {
    //                 alert('post succes')
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 alert(error)
    //             })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
 
    return (
        <div>
            <Header></Header>
            {
                news.map((item, index) => {
                 
                    return (
                        // <div key={index}>


                        //     <Card style={{ width: '18rem' }}>
                        //         <Card.Body >
                        //             <Card.Title>{item.title}</Card.Title>
                        //             <Card.Text>
                        //                 {item.description}
                        //             </Card.Text>
                        //             <Card.Text>
                        //                 {item.content}
                        //             </Card.Text>
                        //             <Card.Text>
                        //                 {item.image}
                        //             </Card.Text>
                        //         </Card.Body>

                        //     </Card >
                        //     {/* <button onClick={onHandleSubmitUpdate}>Update</button> */}
                        //     <button onClick={onHandleSubmitDelete}>Xoa</button>
                        //     <p />

                        // </div>
                        <div key={index}>

                            <NewsOption
                            newsID={item._id}
                                title={item.title}
                                description={item.description}
                                content={item.content}
                                image={item.image}
                            ></NewsOption>
                            <p/>
                        </div>


                    )
                })
            }
            <Form onSubmit={onHandleSubmitPost}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" value={titlePost} onChange={onChangeTitlePost} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" placeholder="Enter content" value={contentPost} onChange={onChangeContentPost} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" value={descriptionPost} onChange={onChangeDescriptionPost} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" placeholder="Enter Image" 
                    // value={imagePost}
                    onChange={convertToBase64} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                {imagePost==""||imagePost==null?"":<img width={100} height={100} src={imagePost}/>}
                </Form.Group>




                <Button variant="primary" type="submit" onSubmit={onHandleSubmitPost}>
                    POST
                </Button>
            </Form>


        </div>
    )
}

export default Option