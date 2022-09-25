import axios from 'axios'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { PageHeader, Card, Col, Row, List } from 'antd'
import { useHistory } from 'react-router-dom'
export default function News() {
    const [data, setData] = useState([])

    const history = useHistory()

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/news?publishState=2&_expand=category'
        }).then(res => {
            console.log(Object.entries(_.groupBy(res.data, item => item.category.title)));
            setData(Object.entries(_.groupBy(res.data, item => item.category.title)))
        })
    }, [])


    const handleTitleClick = (value) => {
        history.push(`/detail/${value}`)
    }

    return (
        <div>
            <PageHeader
                className="site-page-header"
                // onBack={() => null}
                title="新闻时事"
                subTitle="查看新闻"
            />
            <div className="site-card-wrapper" style={{ width: '95%', margin: '0 auto' }}>
                <Row gutter={[16, 16]}>
                    {
                        data.map((item => {
                            return (
                                <Col span={8} key={item[0]}>
                                    <Card title={item[0]} bordered={true} hoverable={true} style={{ height: '350px' }}>
                                        <List
                                            size="large"
                                            dataSource={item[1]}
                                            renderItem={newsItem => <List.Item><a onClick={() => { handleTitleClick(newsItem.id) }}>{newsItem.title}</a> </List.Item>}
                                            pagination={{ pageSize: 3 }}
                                        />
                                    </Card>
                                </Col>
                            )
                        }))
                    }
                </Row>
            </div>
        </div>
    )
}
