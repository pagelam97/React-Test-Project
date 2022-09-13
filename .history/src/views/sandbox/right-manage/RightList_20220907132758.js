
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Space, Table, Tag } from 'antd';

export default function RightList() {
  const [dataSource, setDataSource] = useState([])


  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/rights?_embed=children'
    }).then((res) => {
      console.log(res.data);
      setDataSource(res.data)
    })
  }, [])


  return (
    <div>
      RightList
    </div>
  )
}
