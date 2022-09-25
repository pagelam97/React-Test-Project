import React, { useEffect, useState } from 'react'

import { PageHeader, Descriptions, Space } from 'antd'
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import { success, warning } from '../../compoments/Message/Message';

export default function Detail(props) {

    console.log(props);
    const [view, setView] = useState(0)
    const [currentNews, setCurrentNews] = useState({})
    const [alreadyClick, setAlreadtClick] = useState(false)
    const history = useHistory(null)
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8000/news?id=${props.match.params.id}&_expand=category`
        }).then(res => {
            console.log(res.data);
            setCurrentNews(...res.data)
            axios({
                method: 'patch',
                url: `http://localhost:8000/news/${props.match.params.id}`,
                data: { view: res.data[0].view + 1 }
            })

        })
    }, [props.match.params.id])


    const handleHeartClick = () => {
        if (alreadyClick) {
            warning('已经点过赞了!')
            return
        }
        axios({
            method: 'patch',
            url: `http://localhost:8000/news/${props.match.params.id}`,
            data: { star: currentNews.star + 1 }
        })
        success('点赞成功')
        setAlreadtClick(true)
        setCurrentNews({ ...currentNews, star: currentNews.star + 1 })
    }

    return (

        Object.keys(currentNews).length === 0 ? null : (<div>
            <PageHeader
                className="site-page-header"
                onBack={() => history.goBack()}
                title={currentNews.title}
                subTitle={<div><Space><span>{currentNews.category.title}</span><HeartTwoTone twoToneColor="#eb2f96" onClick={handleHeartClick} /></Space></div>}
            />
            <div style={{ textAlign: 'center', width: '95%', margin: '10px auto' }}>
                <Descriptions>
                    <Descriptions.Item label="创建者">{currentNews.author}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">{moment(currentNews.publishTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                    <Descriptions.Item label="区域">{currentNews.region ? currentNews.region : '全球'}</Descriptions.Item>
                    <Descriptions.Item label="访问数量">{currentNews.view}</Descriptions.Item>
                    <Descriptions.Item label="点赞数量">{currentNews.star}</Descriptions.Item>
                    <Descriptions.Item label="评论数量">{0}</Descriptions.Item>
                </Descriptions>
            </div>
            <div style={{ width: '95%', margin: '10px auto' }}>
                <div dangerouslySetInnerHTML={{
                    __html: currentNews.content
                }}>
                </div>
            </div>
        </div>

        )

    )



}
