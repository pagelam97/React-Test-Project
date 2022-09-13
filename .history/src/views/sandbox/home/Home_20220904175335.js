import { Button } from 'antd'
import React from 'react'

export default function Home() {
const handleClick =()=>{
    console.log('click');
}


    return (
        <div>
            home
            <Button onClick={handleClick()}></Button>
        </div>
    )
}
