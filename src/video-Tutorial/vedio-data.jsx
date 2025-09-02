
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

     

    useEffect(() => {
        axios.get('http://localhost:3000/videos').then(response => setVedios(response.data))
            .catch((err) => {
                console.log("failed to  load vedios:", err);
            })
    }, [])

 let stringData = context.toLowerCase();

    return (
        <div className="d-flex flex-wrap">

            {
                vedios.filter(vedio => {
                  return stringData == "" || vedio.title.toLowerCase().includes(stringData);
                }).map(data => (
                    <Card key={data.id} className='m-2'  sx={{ maxWidth: 350 }}>
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
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                  Description : {data.description}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                                expand={expandedCard === data.id}
                                onClick={()=>handleExpandClick(data.id)}
                                aria-expanded={expandedCard === data.id}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expandedCard === data.id} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography sx={{ marginBottom: 2 }}>
                                    <span className='bi bi-hand-thumbs-up'>{data.likes}</span>

                                </Typography>
                                <Typography sx={{ marginBottom: 2 }}>
                                    <span className='bi bi-hand-thumbs-down'>{data.dislikes}</span>
                                </Typography>
                                <Typography className="bi bi-eye" sx={{ marginBottom: 2 }}>
                                    {data.views}
                                </Typography>
                                <Typography sx={{ marginBottom: 2 }}>
                                    {data.comments}
                                </Typography>

                            </CardContent>
                        </Collapse>
                    </Card>

                ))

            }

        </div>
    )
}
