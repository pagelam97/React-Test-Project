import { Button } from 'antd'
import axios from 'axios'
import React from 'react'

export default function Home() {
const handleClick =()=>{

axios({
    method:'get',
    url:'http://localhost:8000/'
})


}


    return (
        <div>
            <Button type='danger' onClick={handleClick}>点击</Button>
        </div>
    )
}
