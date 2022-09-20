import { Descriptions, PageHeader } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'


export default function PreviewNews(props) {
    const [newsInfo, setNewsInfo] = useState({})



    console.log(props);

    useEffect(() => {
        console.log(newsInfo);
    }, [newsInfo])


    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8000/news?id=${props.match.params.id}&_expand=role&_expand=category`
        }).then(res => {
            setNewsInfo(...res.data)
        })
    }, [props.match.params.id])


    const auditStateMapToText = ['未审核', '审核中', '审核通过', '审核未通过']
    const publishStateMapToText = ['未发布', '待发布', '已上线', '已下架']

    return (

        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => { props.history.goBack() }}
                title="新闻概览"
            />
            {Object.keys(newsInfo).length === 0 ? null :
                <Descriptions title=" " column={3} bordered style={{marginTop:'20px'}}>

                    <Descriptions.Item label="新闻作者" >{newsInfo.author}</Descriptions.Item>
                    <Descriptions.Item label="发布区域">{newsInfo.region === '' ? '全球' : newsInfo.region}</Descriptions.Item>
                    <Descriptions.Item label="新闻类型" >{newsInfo.category.value}</Descriptions.Item>


                    <Descriptions.Item label="发布时间" >{newsInfo.publishTime ? moment(newsInfo.publishTime).format('YYYY/MM/DD HH:mm:ss') : '-'}</Descriptions.Item>
                    <Descriptions.Item label="审核状态" >{auditStateMapToText[newsInfo.auditState]}</Descriptions.Item>
                    <Descriptions.Item label="发布状态" >{publishStateMapToText[newsInfo.publishState]}</Descriptions.Item>

                    <Descriptions.Item label="创建时间" >{moment(newsInfo.createTime).format('YYYY/MM/DD HH:mm:ss')}</Descriptions.Item>
                    <Descriptions.Item label="访问数量" style={{ color: 'red' }}>{newsInfo.view}</Descriptions.Item>
                    <Descriptions.Item label="点赞数量" style={{ color: 'red' }}>{newsInfo.star}</Descriptions.Item>
                    {/* <Descriptions.Item label="评论数量" >{newsInfo.username}</Descriptions.Item> */}
                    
                    <Descriptions.Item label="新闻标题" span={3}>{newsInfo.title}</Descriptions.Item>
                    <Descriptions.Item label="新闻内容" span={3}>
                        {<div dangerouslySetInnerHTML={{
                            __html: newsInfo.content
                        }}>
                        </div>}
                    </Descriptions.Item>
                </Descriptions>}
        </div>

    )
}
