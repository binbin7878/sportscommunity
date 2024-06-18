'use client'
import { Divider, Grid, Typography, Card, CardContent, CardMedia, IconButton, Container, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

import Comment from './comment'


export default function Detail(props) {

    const router = useRouter()
    console.log('props', props)

    const [itemInfo, setItemInfo] = useState([])
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState([])

    useEffect(() => {
        fetch('/api/get/merket?id=' + props.params.id)
            .then((r) => r.json())
            .then((result) => {
                console.log('result:', result)
                setItemInfo(result)
                setCurrentImage(JSON.parse(result[0].filesrc))

            })
    }, [props])

    const [user, getUser] = useState('')


    useEffect(() => {
        fetch('/api/get/session')
            .then((r) => r.json())
            .then((result) => {
                getUser(result)
            })
    }, [props])

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === currentImage.length - 1 ? 0 : prevIndex + 1));
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? currentImage.length - 1 : prevIndex - 1));
    };

    return (


        <div>
            <Container>




                {console.log('iteminfo:', itemInfo)

                }
                {console.log('setcurrentimage', currentImage)}

                {itemInfo.length > 0 && (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card style={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    alt={itemInfo[0].title}
                                    image={currentImage[currentImageIndex]}
                                    title={itemInfo[0].title}
                                    style={{ height: '400px', width: '100%', objectFit: 'cover', position: 'relative' }}
                                />
                                <IconButton onClick={prevImage} style={{ position: 'absolute', left: 0, bottom: 0, color: 'black' }}>
                                    <ArrowBackIcon />
                                </IconButton>

                                <IconButton onClick={nextImage} style={{ position: 'absolute', right: 0, bottom: 0, color: 'black' }}>
                                    <ArrowForwardIcon />
                                </IconButton>

                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card style={{ height: '400px' }}>
                                {
                                    user == itemInfo[0].author ?
                                        <div style={{ textAlign: 'right' }}>
                                            <IconButton aria-label="delete" onClick={(e) => {
                                    if(window.confirm('댓글을 삭제하시겠습니까?')){

                                        fetch('/api/market/delete_post',{
                                            method:'DELETE',
                                            body:itemInfo[0]._id
                                        }).then((r)=>r.json())
                                        .then((result)=>{
                                            if(result=='삭제완료'){
                                                alert('삭제완료!')
                                                router.push('/market')
                                            }else{
                                                alert('서버오류!')
                                            }
    
                                        })
                                    }else{
                                        alert('삭제 취소!')
                                    }                                    

                                }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div> : ''
                                }
                                <CardContent style={{ height: '100%' }}>
                                    <Typography variant="strong" gutterBottom style={{ fontSize: '40px' }}>
                                        {itemInfo[0].title}<br></br>
                                    </Typography>
                                    <Typography variant="strong" color="textSecondary" gutterBottom>
                                        {itemInfo[0].price + '원'}<br></br>
                                    </Typography>
                                    <Typography variant="span" gutterBottom style={{ fontSize: '25px' }}>
                                        {itemInfo[0].content}
                                    </Typography>
                                    {/* 기타 상세 정보 표시 */}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}
                <br></br>
                <Divider component="div" style={{ borderColor: 'gray' }} />
                <Comment postid={props.params.id}></Comment>



            </Container>
        </div>
    )
}