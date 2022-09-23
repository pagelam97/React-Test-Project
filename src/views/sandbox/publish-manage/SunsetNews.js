import React from 'react'
import NewPublish from '../../../compoments/publish-manage/NewPublish'
import usePubilish from '../../../compoments/publish-manage/usePubilish'
import { Button } from 'antd';
import {  DeleteOutlined } from '@ant-design/icons';



export default function SunsetNews() {

  const { dataSource, handleDeleteBtn } = usePubilish(3)


  return (
    <div>
      SunsetNews
      <NewPublish dataSource={dataSource}
        BTN={(id) => {
          return <Button type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => { handleDeleteBtn(id) }}
          // style={{ backgroundColor: '#ca611e', borderColor: '#fef6e3' }} 
          >
            删除
          </Button >
        }}>
      </NewPublish>
    </div>
  )
}
