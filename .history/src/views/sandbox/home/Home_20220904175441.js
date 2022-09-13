import { Button } from 'antd'
import React from 'react'

export default function Home() {
const handleClick =()=>{
    console.log('click');
}


    return (
        <div>
            <Button type='danger' onClick={handleClick}>点击</Button>
        </div>
    )
}
