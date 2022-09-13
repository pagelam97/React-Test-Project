import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function RightList() {
  const [dataSource, setDataSource] = useState([])


  useEffect(()=>{
axios({
  method:'get',
  url:''
})
  },[])


  return (
    <div>
      RightList
    </div>
  )
}
