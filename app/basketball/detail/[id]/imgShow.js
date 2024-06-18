'use client'
import { useState, useEffect } from "react"

export default function ImgShow(props) {
    console.log('img:', props.imgsrc)
    const [img, showimg] = useState([])

    useEffect(() => {
        if (Array.isArray(props.imgsrc)) {
            showimg(props.imgsrc)
        }
    }, [props.imgsrc]) // props.imgsrc가 변경될 때마다 useEffect가 실행됨

    return (
        <div>
            {console.log('img useState:', img)}
            {
                img.map((a, i) => (
                    <img key={i} src={a} alt={`image-${i}`} />
                ))
            }
        </div>
    )
}
