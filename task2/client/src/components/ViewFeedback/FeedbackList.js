import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import FeedbackItem from "./FeedbackItem";

export default function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:3212/feedbacks');
                setFeedbacks(result.data.body);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Container>
                <h1>Feedbacks</h1>
                <ul>
                    {feedbacks.map(item => (
                        <FeedbackItem {...item} key={item.id} />
                    ))}
                </ul>
            </Container>
        </>
    )
}
