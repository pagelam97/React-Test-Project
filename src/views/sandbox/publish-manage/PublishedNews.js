import React from 'react'
import NewPublish from '../../../compoments/publish-manage/NewPublish'
import usePubilish from '../../../compoments/publish-manage/usePubilish'
import { Button } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';



export default function PublishedNews() {

  const { dataSource, handleSunset } = usePubilish(2)


  return (
    <div>
      PublishedNews
      <NewPublish dataSource={dataSource}
        BTN={(id) => {
          return <Button type="primary"
            icon={<ArrowDownOutlined />}
            onClick={() => { handleSunset(id) }}
            style={{ backgroundColor: '#ca611e', borderColor: '#fef6e3' }} >
            下架
          </Button >
        }}>
      </NewPublish>
    </div>
  )
}
