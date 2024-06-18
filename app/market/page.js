
// 'use client'


// import Link from "next/link"
// import SellIcon from '@mui/icons-material/Sell';
// import { useEffect, useState } from "react";
// import { Result } from "postcss";
// import { AppBar, Toolbar, IconButton, Typography, Container, Grid, Paper, Avatar, Box, TextField, Button, CardActionArea } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';

// export const dynamic = 'force-dynamic'//항상 다이나믹 렌더링


// export default async function Market() {

//     const [marketList, setMarketList] = useState([])
//     const [likePost,setLikePost]=useState([])
    

    
//     useEffect(()=>{
//         fetch('/api/market/getlike').then((r)=>r.json())
//         .then((result)=>{
//             console.log('찜목록',result)
//             setLikePost(result)
//         })

//     },[])


//     useEffect(() => {
//         fetch('/api/market/marketList')
//             .then((r) => r.json())
//             .then((result) => {

//                 setMarketList(result)

//             })
//     }, [])

    

    
    

    
//     return (
//         <div>
//             {console.log('marketlist', marketList)}
//             <div className="list-bg" >
//                 <h4>market</h4>
//                 <div style={{ textAlign: 'right' }}><Button variant="outlined" endIcon={<SellIcon />} href="/market/sell">판매하기</Button></div>
//             </div>
//             <div className="main-market">


//                 <Container style={{ marginTop: '2rem' }}>
//                     <Grid container spacing={4}>

//                         {marketList.map((post, i) => (
                            

//                                 <Grid item xs={12} sm={6} md={4} key={post._id}>

                                    
//                                         <Paper style={{ height:'100%', padding: '1rem', backgroundColor:'whitesmoke' }}>
//                                         <CardActionArea href={'/market/detail/'+post._id} >
//                                             <Box display="flex" alignItems="center">
//                                                 <Typography variant="subtitle1" style={{ marginLeft: '1rem' }}>
//                                                     판매자 : {post.author}
//                                                 </Typography>
//                                             </Box>
//                                             <img src={JSON.parse(post.filesrc)[0]} alt="post" style={{ width: '100%', height: '200px', objectFit: 'cover', marginTop: '1rem'  }} />
//                                             <Typography variant="body2" style={{ marginTop: '0.5rem' }}>제목 : {post.title}</Typography>
//                                             </CardActionArea>
//                                             <Box display="flex" alignItems="center" style={{ marginTop: '0.5rem' }}>
//                                                 <IconButton onClick={((e)=>{
//                                                     fetch('/api/market/market_liked',{
//                                                         method:'POST',
//                                                         body:post._id
//                                                     }).then((r)=>r.json())
//                                                     .then((result)=>{
//                                                         console.log('찜전송결과:',result)
//                                                         if(result.status=='찜콩'){                                                            
//                                                             setLikePost([...likePost,post._id])
//                                                             setTimeout(() => {
//                                                                 e.target.style.color = 'red'
//                                                             }, 500)
                                                            
//                                                         }else if(result.status=='찜콩취소'){
                                                            
//                                                             setLikePost(likePost.filter(id=>id!==post._id))
//                                                             setTimeout(() => {
//                                                                 e.target.style.color = ''
//                                                             }, 500)
//                                                         }
//                                                     })
//                                                 })} style={{
//                                                     color:likePost.includes(post._id)?'red':''
//                                                 }} >
                                                    
//                                                     <FavoriteIcon/>
//                                                 </IconButton>
//                                                 <Typography variant="body2" > 판매가 : {post.price}</Typography>
//                                             </Box>
//                                         </Paper>
                                    
//                                 </Grid>

                            
//                         ))}

//                     </Grid>
//                 </Container>


//                 {/* {
//                     marketList.map((a,i)=>{
//                         return(
//                             <div>
//                                 <div>
//                                     <a href={'/market/detail/'+a._id}>{a.title}</a>
//                                 </div>
//                                 <div>
//                                     {a.content}
//                                 </div>
//                                 <div>
//                                     {a.author}
//                                 </div>
//                                 <div>
//                                     {a.price}
//                                 </div>
//                                 <div className="img-container">
//                                     <img src={JSON.parse(a.filesrc)[0]}/>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 } */}
//             </div>
//         </div>
//     )
// }

// //여러페이지 만드려면 [dynamic route]
// //현재 ul이 뭔지 궁금하면 props/useRouter
// //페이지 이동,prefetch 등은 useRouter

'use client'

import Link from "next/link"
import SellIcon from '@mui/icons-material/Sell';
import { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Container, Grid, Paper, Box, Button, CardActionArea } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const dynamic = 'force-dynamic' // 항상 다이나믹 렌더링

export default function Market() {
    const [marketList, setMarketList] = useState([])
    const [likePost, setLikePost] = useState([])

    useEffect(() => {
        fetch('/api/market/getlike')
            .then((r) => r.json())
            .then((result) => {
                console.log('찜목록', result)
                setLikePost(result)
            })
    }, [])

    useEffect(() => {
        fetch('/api/market/marketList')
            .then((r) => r.json())
            .then((result) => {
                setMarketList(result)
            })
    }, [])

    const handleLike = (postId,title,content) => {
        fetch('/api/market/market_liked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                post_id: postId,
                post_title:title,
                post_content:content})
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

    return (
        <div>
            {console.log('marketlist', marketList)}
            <div className="list-bg" style={{margin:'3rem'}}>
                <h4>market</h4>
                <div style={{ textAlign: 'right' }}>
                    <Button variant="outlined" endIcon={<SellIcon />} href="/market/sell">판매하기</Button>
                </div>
            </div>
            <div className="main-market">
                <Container style={{ marginTop: '2rem' }}>
                    <Grid container spacing={4}>
                        {marketList.map((post) => (
                            <Grid item xs={12} sm={6} md={4} key={post._id}>
                                <Paper style={{ height: '100%', padding: '1rem', backgroundColor: 'whitesmoke' }}>
                                    <CardActionArea href={'/market/detail/' + post._id}>
                                        <Box display="flex" alignItems="center">
                                            <Typography variant="strong" style={{ marginLeft: '1rem' }}>
                                                판매자 : {post.author}
                                            </Typography>
                                        </Box>
                                        <img src={JSON.parse(post.filesrc)[0]} alt="post" style={{ width: '100%', height: '200px', objectFit: 'cover', marginTop: '1rem' }} />
                                        <Typography variant="strong" style={{ marginTop: '0.5rem' }}>제목 : {post.title}</Typography>
                                    </CardActionArea>
                                    <Box display="flex" alignItems="center" style={{ marginTop: '0.5rem' }}>
                                        <IconButton onClick={() => handleLike(post._id,post.title,post.content)}>
                                            <FavoriteIcon style={{
                                                color: likePost.includes(post._id) ? 'red' : 'inherit'
                                            }} />
                                        </IconButton>
                                        <Typography variant="strong"> 판매가 : {post.price}</Typography>
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

