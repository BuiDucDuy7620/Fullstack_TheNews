import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

//css
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import { useParams } from "react-router";

const Update = () => {

    const { id } = useParams();
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
    const onChangeImagePost = (e) => {
        setImagePost(e.target.value)
    }
    const onChangeDescriptionPost = (e) => {
        setDescriptionPost(e.target.value)
    }

    // const getNewsById = async () => {
    //     try {
    //         await axios.get(`http://localhost:5000/api/news/getNewsById/${id}`)
    //             .then((news) => {
    //                 const dulieu = news.data;
    //                 console.log(news.data);
    //                 setTitlePost(dulieu[0].title)
    //                 setDescriptionPost(dulieu[0].description)
    //                 setContentPost(dulieu[0].content)
    //                 // setImagePost(dulieu[0].image)



    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // useEffect(() => {
    //     getNewsById()
    // })
    const onHandleSubmitUpdate = async (e) => {

        e.preventDefault()
        try {
            await axios.put(`http://localhost:5000/api/news/updateNewsById/${id}`, {

                title: titlePost,
                description: descriptionPost,
                content: contentPost,
                image: imagePost
            })
                .then((response) => {
                    alert('Update succes')
                })
                .catch((error) => {
                    console.log(error);
                    alert(error)
                })
        } catch (error) {
            console.log(error);
        }
    }
    const navigate = useNavigate()

    const handleClickCancel = () => {
        navigate('/')
    }
    return (
        <div>
            <Form onSubmit={onHandleSubmitUpdate}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="titlePost" value={titlePost} placeholder="Enter title"  onChange={onChangeTitlePost} />
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
                    <Form.Control type="file" placeholder="Enter Image" value={imagePost} onChange={onChangeImagePost} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>




                <Button variant="primary" type="submit" onSubmit={onHandleSubmitUpdate}>
                    UPDATE
                </Button>
                <Button variant="primary" type="submit" onClick={handleClickCancel}>
                    Cancel
                </Button>
            </Form>

        </div>
    )
}

export default Update