import React from 'react'
import NewsComponent from "../../component/newsComponent";
import { useEffect, useState } from 'react'
// import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Header from "../../component/headerComponent.js";
import axios from 'axios'

function Home() {
    const [news, setNews] = useState([])
    // const [loading, setLoading] = useState(true);

    const getNews = async () => {
        try {
            await axios.get('http://localhost:5000/api/news/getAllNews')
                .then((response) => {
                    setNews(response.data);
                    console.log(news)
                    // setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        getNews();
    }, [])
    return (
        <>
        <Header></Header>

            {
                // loading ?
                //     (<div className="loader">
                //         <ClimbingBoxLoader className="loader" color={`#36D7B7`} loading={loading} size={50} />
                //     </div>)
                //     : (
                        <div>
                            {
                                news.map((item, index) => {
                                    return (
                                        <NewsComponent
                                        key={index}
                                        id={item._id}
                                        title={item.title}
                                        description={item.description}
                                        content={item.content}
                                        image={item.image}
                                        name={item.userID.name}
                                        ></NewsComponent>
                                    )
                                })
                            }
                        </div>

                    // )
            }
        </>
    );
}

export default Home;