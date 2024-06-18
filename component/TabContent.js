// components/TabContent.js
// 'use client'

// import React, { useEffect, useState } from 'react';
// import { Spinner, Modal, Button } from 'react-bootstrap';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
// import Box from '@mui/material/Box';
// import { AnimatePresence,motion } from 'framer-motion';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';




// const TabContent = ({ selectedTab }) => {
//     const [content, setContent] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(0);
//     const itemsPerPage = 3;

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             const response = await fetch(`/api/${selectedTab}/${selectedTab}post`);
//             const data = await response.json();

//             setContent(data);
//             setLoading(false);
//         };

//         fetchData();
//     }, [selectedTab]);

//     useEffect(()=>{
//         setCurrentPage(0)
//     },[selectedTab])

//     const nextPage = () => {
//         setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(content.length / itemsPerPage) - 1));
//     };

//     const prevPage = () => {
//         setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
//     };

//     const displayedContent = content.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

//     const variants = {
//         enter: (direction) => ({
//             x: direction > 0 ? 1000 : -1000,
//             opacity: 0
//         }),
//         center: {
//             x: 0,
//             opacity: 1
//         },
//         exit: (direction) => ({
//             x: direction < 0 ? 1000 : -1000,
//             opacity: 0
//         }),
//     };

//     const direction = currentPage > 0 ? 1 : -1;

//     return (
//         <div style={{ position: 'relative', padding: '10px' }}>

//             {loading ? <Spinner animation="border" /> :
//                 (

//                     (

//                         <div>


//                             <AnimatePresence initial={false} custom={direction} mode='wait'>
//                         <motion.div
//                             key={currentPage}
//                             custom={direction}
//                             variants={variants}
//                             initial="enter"
//                             animate="center"
//                             exit="exit"
//                             transition={{ type: "tween", duration: 0.5 }}
//                             style={{ position: 'relative', width: '100%' }}
//                         >
//                             <Box
//                                 sx={{
//                                     display: 'grid',
//                                     gridTemplateColumns: { xs: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' },
//                                     gap: 2,
//                                     borderBottom: '1px solid gray',
//                                     marginBottom: 4,
//                                     paddingTop: 4,
//                                     marginTop: -1,
//                                     paddingLeft: 15,
//                                     paddingRight: 2,

//                                 }}
//                             >
//                                 {displayedContent.map((a, i) => (


//                                     <Card sx={{ maxWidth: 345 }} className='col-span-4' key={i}>
//                                         <CardActionArea href={selectedTab + '/detail/' + a._id}>
//                                             <CardMedia
//                                                 component="img"
//                                                 height="140"
//                                                 image={a.filesrc}
//                                                 alt={a.filename}
//                                             />
//                                             <CardContent>
//                                                 <Typography gutterBottom variant="h5" component="div" >
//                                                     {a.title}
//                                                 </Typography>
//                                                 <Typography variant="body2" color="text.secondary"
//                                                     sx={{
//                                                         display: '-webkit-box',
//                                                         overflow: 'hidden',
//                                                         textOverflow: 'ellipsis',
//                                                         WebkitLineClamp: 3, // 표시할 최대 줄 수
//                                                         WebkitBoxOrient: 'vertical',
//                                                     }}
//                                                 >
//                                                     {a.content}
//                                                 </Typography>
//                                             </CardContent>
//                                         </CardActionArea>
//                                     </Card>


//                                 ))}
//                             </Box>
//                             </motion.div>
//                             </AnimatePresence>

//                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', padding: '0 20px' }}>
//                                 <ArrowBackIosNewIcon onClick={prevPage} style={{ cursor: 'pointer' }} disabled={currentPage === 0}/>
//                                 <ArrowForwardIosIcon onClick={nextPage} style={{ cursor: 'pointer' }} disabled={(currentPage + 1) * itemsPerPage >= content.length}/>
//                             </div>

//                         </div>
//                     )

//                 )}
//         </div>
//     );
// };

// export default TabContent;

'use client'

import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import { AnimatePresence, motion } from 'framer-motion';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Tooltip from '@mui/material/Tooltip';

const TabContent = ({ selectedTab }) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPageWithFilename, setCurrentPageWithFilename] = useState(0);
    const [currentPageWithoutFilename, setCurrentPageWithoutFilename] = useState(0);
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(`/api/${selectedTab}/${selectedTab}post`);
            const data = await response.json();

            setContent(data);
            setLoading(false);
        };

        fetchData();
    }, [selectedTab]);

    useEffect(() => {
        setCurrentPageWithFilename(0);
        setCurrentPageWithoutFilename(0);
    }, [selectedTab]);

    const nextPageWithFilename = () => {
        setCurrentPageWithFilename(prevPage => Math.min(prevPage + 1, Math.ceil(itemsWithFilename.length / itemsPerPage) - 1));
    };

    const prevPageWithFilename = () => {
        setCurrentPageWithFilename(prevPage => Math.max(prevPage - 1, 0));
    };

    const nextPageWithoutFilename = () => {
        setCurrentPageWithoutFilename(prevPage => Math.min(prevPage + 1, Math.ceil(itemsWithoutFilename.length / itemsPerPage) - 1));
    };

    const prevPageWithoutFilename = () => {
        setCurrentPageWithoutFilename(prevPage => Math.max(prevPage - 1, 0));
    };

    const itemsWithFilename = content.filter(item => item.filename);
    const itemsWithoutFilename = content.filter(item => !item.filename);

    const displayedContentWithFilename = itemsWithFilename.slice(currentPageWithFilename * itemsPerPage, (currentPageWithFilename + 1) * itemsPerPage);
    const displayedContentWithoutFilename = itemsWithoutFilename.slice(currentPageWithoutFilename * itemsPerPage, (currentPageWithoutFilename + 1) * itemsPerPage);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        }),
    };

    const direction = currentPageWithFilename > 0 ? 1 : -1;

    return (
        <div style={{ position: 'relative', padding: '10px',margin:'2rem' }}>
            <div>
                <h4>
                    긴 글
                </h4>
            </div>
            {loading ? <Spinner animation="border" /> : (
                <div>
                    <AnimatePresence initial={false} custom={direction} mode='wait'>
                        <motion.div
                            key={currentPageWithFilename}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "tween", duration: 0.5 }}
                            style={{ position: 'relative', width: '100%' }}
                        >
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' },
                                    gap: 2,

                                    marginBottom: 2,
                                    paddingTop: 2,
                                    marginTop: 2,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}
                            >
                                {displayedContentWithFilename.map((a, i) => (
                                    <Card sx={{ maxWidth: 345 }} className='col-span-4' key={i}>
                                        <CardActionArea href={selectedTab + '/detail/' + a._id}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={JSON.parse(a.filesrc)[0]}
                                                alt={a.filename}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    <h5>{a.title}</h5>
                                                    
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary"
                                                    sx={{
                                                        display: '-webkit-box',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    <span>{a.content}</span>
                                                    
                                                </Typography>
                                                <Typography>

                                                    <span style={{ fontSize: '13px', textAlign: 'left' }}><strong>닉네임 : </strong>{a.author}</span>

                                                </Typography>
                                                <Typography style={{ textAlign: 'right' }}>
                                                    <span style={{ fontSize: '13px', textAlign: 'right' }}>{a.postAt}</span>
                                                </Typography>

                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                ))}
                            </Box>
                        </motion.div>
                    </AnimatePresence>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>

                        <ArrowBackIosNewIcon onClick={prevPageWithFilename} style={{ cursor: 'pointer' }} disabled={currentPageWithFilename === 0} />
                        <ArrowForwardIosIcon onClick={nextPageWithFilename} style={{ cursor: 'pointer' }} disabled={(currentPageWithFilename + 1) * itemsPerPage >= itemsWithFilename.length} />
                    </div>


                    {itemsWithoutFilename.length > 0 && (
                        <div>
                            <div style={{ borderTop: '2px solid gray', marginTop: '20px', paddingTop: '20px' }}>
                                <div>
                                    <h4>
                                        짧 글
                                    </h4>
                                </div>
                                <AnimatePresence initial={false} custom={direction} mode='wait'>
                                    <motion.div
                                        key={currentPageWithoutFilename}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ type: "tween", duration: 0.5 }}
                                        style={{ position: 'relative', width: '100%' }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' },
                                                gap: 2,

                                                marginBottom: 2,
                                                paddingTop: 2,
                                                marginTop: 2,
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                            }}
                                        >
                                            {displayedContentWithoutFilename.map((a, i) => (
                                                <Card sx={{ maxWidth: 345 }} className='col-span-4' key={i}>
                                                    <CardActionArea href={selectedTab + '/detail/' + a._id}>
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div">
                                                                <h5>{a.title}</h5>
                                                                
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary"
                                                                sx={{
                                                                    display: '-webkit-box',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    WebkitLineClamp: 3,
                                                                    WebkitBoxOrient: 'vertical',
                                                                }}
                                                            >
                                                                <span>{a.content}</span>
                                                            </Typography>
                                                            <Typography>

                                                                <span style={{ fontSize: '13px', textAlign: 'left' }}><strong>닉네임 : </strong>{a.author}</span>

                                                            </Typography>
                                                            <Typography style={{ textAlign: 'right' }}>
                                                                <span style={{ fontSize: '13px', textAlign: 'right' }}>{a.postAt}</span>
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            ))}
                                        </Box>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                                <ArrowBackIosNewIcon onClick={prevPageWithoutFilename} style={{ cursor: 'pointer' }} disabled={currentPageWithoutFilename === 0} />
                                <ArrowForwardIosIcon onClick={nextPageWithoutFilename} style={{ cursor: 'pointer' }} disabled={(currentPageWithoutFilename + 1) * itemsPerPage >= itemsWithoutFilename.length} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TabContent;


