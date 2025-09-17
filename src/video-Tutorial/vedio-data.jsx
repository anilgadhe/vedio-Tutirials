
import { useContext, useEffect, useState } from 'react'
import { userContext } from './user-dashboard'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addToWatchLater, dislikeVedio, likeVideo } from '../slicers/slicer';

import Button from '@mui/material/Button';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));


export function Vediodata({ onChildClick }) {

    const [expandedCard, setExpandedCard] = useState(false);

    const handleExpandClick = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    const [vedios, setVedios] = useState([{
        title: "",
        description: "",
        url: null,
        likes: 0,
        dislikes: 0,
        views: 0,
        comments: '',
        category_id: '',
        id: null
    }],)

    let context = useContext(userContext);
    const dispatch = useDispatch();

    function handleAddtoWatchLater(data) {
        dispatch(addToWatchLater(data))
    }

    const handleLike = async (videoId, userId) => {
        const { data: video } = await axios.get(`http://localhost:3000/videos/${videoId}`);

        let updatedVideo;

        if (!video.likedBy.includes(userId)) {
            // 👉 Like
            updatedVideo = {
                ...video,
                likes: video.likes + 1,
                likedBy: [...video.likedBy, userId]
            };
            console.log("Liked successfully!");
        } else {
            // 👉 Unlike
            updatedVideo = {
                ...video,
                likes: video.likes > 0 ? video.likes - 1 : 0,
                likedBy: video.likedBy.filter(uid => uid !== userId)
            };
            console.log("Unliked successfully!");
        }

        // Save back to JSON server
        await axios.put(`http://localhost:3000/videos/${videoId}`, updatedVideo);

        // Update Redux/global state if needed
        dispatch(likeVideo(videoId));
    };


    async function handleDislikes(videoId, userId) {

        const { data: video } = await axios.get(`http://localhost:3000/videos/${videoId}`);

        let updatedVideo;

        if (!video.dislikedBy.includes(userId)) {
            // 👉 disLike
            updatedVideo = {
                ...video,
                dislikes: video.dislikes + 1,
                dislikedBy: [...video.dislikedBy, userId]
            };
            console.log("Liked successfully!");
        } else {
            // 👉 dislike
            updatedVideo = {
                ...video,
                dislikes: video.dislikes > 0 ? video.dislikes - 1 : 0,
                dislikedBy: video.dislikedBy.filter(uid => uid !== userId)
            };
        }

        await axios.put(`http://localhost:3000/videos/${videoId}`, updatedVideo);

        // Update Redux/global state if needed
        dispatch(dislikeVedio(videoId));

    }

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios.get('http://localhost:3000/videos').then(response => setVedios(response.data))
            .catch((err) => {
                console.log("failed to  load vedios:", err);
            })
    }, [vedios])

    let stringData = context.toLowerCase();

    return (
        <div className="d-flex flex-wrap">

            {
                vedios.filter(vedio => {
                    return stringData == "" || vedio.title.toLowerCase().includes(stringData);
                }).map(data => (
                    <Card key={data.id} className='m-2' sx={{ maxWidth: 350 }}>
                        <CardHeader
                            title={data.title}
                        />
                        <CardMedia
                            component="iframe"
                            src={data.url}
                            height="194"
                            title="YouTube video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <CardContent>
                            <div className='d-flex justify-content-around'>

                                <div>
                                    <Button
                                        className={`bi bi-hand-thumbs-up-fill fs-3 ${data.likedBy?.includes(user.id) ? "text-danger" : ""}`}
                                        onClick={() => handleLike(data.id, user.id)}>
                                    </Button>
                                    <div className='text-center'>{data.likes}</div>
                                </div>

                                <div>
                                    <Button className={`bi bi-hand-thumbs-down-fill fs-3 ${data.dislikedBy?.includes(user.id) ? "text-danger" : ""}`} onClick={() => { handleDislikes(data.id, user.id) }} ></Button>
                                    <div className='text-center'>{data.dislikes}</div>
                                </div>

                                <div>
                                    <div className="bi bi-eye fs-3"></div>
                                    <div className='text-center'>{data.views}</div>
                                </div>
                            </div>
                        </CardContent>
                        <Button variant='contained' onClick={() => { handleAddtoWatchLater(data) }} color='success' className='w-100 bi bi-save2-fill fs-4'></Button>
                        <CardActions disableSpacing>
                            <ExpandMore
                                expand={expandedCard === data.id}
                                onClick={() => handleExpandClick(data.id)}
                                aria-expanded={expandedCard === data.id}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expandedCard === data.id} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography style={{ height: "100px", overflow: "scroll" }} sx={{ marginBottom: 2 }}>
                                    <span className='bi bi-person-badge'></span> {data.comments}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>

                ))

            }

        </div>
    )
}
