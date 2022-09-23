import React from 'react'
import NewPublish from '../../../compoments/publish-manage/NewPublish'
import usePubilish from '../../../compoments/publish-manage/usePubilish'
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';



export default function UnpublishedNews() {

    const { dataSource, handlePushBtn } = usePubilish(1)


    return (
        <div>
            UnpublishedNews
            <NewPublish dataSource={dataSource}
                BTN={(id) => {
                    return <Button type="primary"
                        icon={<CloseOutlined />}
                        onClick={() => { handlePushBtn(id) }}
                        style={{ backgroundColor: '#35911d', borderColor: '#f5feeb' }} >
                        发布
                    </Button >
                }}>
            </NewPublish>
        </div>
    )
}
