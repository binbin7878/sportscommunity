'use client'

import Link from "next/link"
import SellIcon from '@mui/icons-material/Sell';
import { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Container, Grid, Paper, Box, Button, CardActionArea,Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Result } from "postcss";

export const dynamic = 'force-dynamic' // 항상 다이나믹 렌더링



export default function LikeList(){

    const [likeList,setLikeList]=useState([])
    const [likePost, setLikePost] = useState([])


    useEffect(()=>{
        fetch('/api/get/likelist')
        .then((r)=>r.json())
        .then((result)=>{
            console.log('likelist',result)
            setLikeList(result)
            setLikePost(result.map(post=>post.post_id))
                  

        })
    },[])
    
    

    


    const handleLike = (postId,title,content) => {
        fetch('/api/market/market_liked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post_id: postId,
                post_title:title,
                post_content:content })
        }).then((r) => r.json())
            .then((result) => {
                console.log('찜전송결과:', result)
                if (result.status === '찜콩') {
                    setLikePost((prev) => [...prev, postId])
                } else if (result.status === '찜콩취소') {
                    setLikePost((prev) => prev.filter(id => id !== postId))
                }
            })
    }

    return(
        <div>
            <div style={{margin:'3rem'}}>
                <h4>찜 목록</h4>
            </div>
            <Divider component={'div'}></Divider>

            <div className="main-market">
                <Container style={{ marginTop: '2rem' }}>
                    <Grid container spacing={4}>
                        {likeList.map((post,i) => (
                            <Grid item xs={12} sm={6} md={4} key={post.post_id}>
                                <Paper style={{ height: '100%', padding: '1rem', backgroundColor: 'whitesmoke' }}>
                                    <CardActionArea href={'/market/detail/' + post.post_id}>                                        
                                        <Typography variant="strong" style={{ marginTop: '0.5rem' }}>제목 : {post.post_title}</Typography><br></br>
                                        <Typography variant="strong" style={{ marginTop: '0.5rem' }}>내용 : {post.post_content}</Typography>
                                    </CardActionArea>
                                    <Box display="flex" alignItems="center" style={{ marginTop: '0.5rem' }}>
                                        <IconButton onClick={() => handleLike(post.post_id,post.post_title,post.post_content)}>
                                            <FavoriteIcon style={{
                                                color: likePost.includes(post.post_id) ? 'red' : 'inherit'
                                            }} />
                                        </IconButton>
                                        
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
        </div>
        
            
        
    )
}