import { Card, Col, Row, List, Avatar, Space, Drawer, Button } from 'antd';

import { EditOutlined, EllipsisOutlined, SettingOutlined, CloseOutlined } from '@ant-design/icons';

import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';


import * as ECharts from 'echarts';

import _ from 'lodash'


const { Meta } = Card;

export default function Home() {


    const [mostViewList, setMostViewList] = useState([])
    const [mostStarList, setMostStarList] = useState([])
    const [allNewsList, setAllNewsList] = useState([])
    const [lbarChart, setLbarChart] = useState('')
    const [pieChart, setPieChart] = useState('')
    const [isDrawerVisable, setIsDrawerVisable] = useState(false)
    const [currentUserNewList, setCurrentUserNewList] = useState([])
    const history = useHistory(null)
    const barRef = useRef(null)
    const pieRef = useRef()

    const currentUserInfo = JSON.parse(localStorage.getItem('token'))



    useEffect(() => {

        axios({
            method: 'get',
            url: 'http://localhost:8000/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=5'
        }).then(res => {
            setMostViewList(res.data)
        })
    }, [])

    useEffect(() => {

        axios({
            method: 'get',
            url: `http://localhost:8000/news?publishState=2&author=${currentUserInfo.username}&_expand=category`
        }).then(res => {
            setCurrentUserNewList(res.data)
        })
    }, [])

    useEffect(() => {

        axios({
            method: 'get',
            url: 'http://localhost:8000/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=5'
        }).then(res => {
            setMostStarList(res.data)
        })
    }, [])


    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/news?publishState=2&_expand=category'
        }).then(res => {
            let barCharData = _.groupBy(res.data, item => item.category.title)
            renderBarChar(barCharData)
            setAllNewsList(res.data)
        })
        return () => {
            window.onresize = null
        }


    }, [])

    useEffect(() => {
        if (!isDrawerVisable) return
        renderPieChar()

    }, [isDrawerVisable])

    const renderPieChar = () => {
        var mypiechart = pieChart
        console.log(currentUserNewList);
        if (mypiechart === '') {
            console.log('pieRef.current------>', pieRef.current);
            mypiechart = ECharts.init(pieRef.current);
            setPieChart(mypiechart)
        }

        let currentUserListUnorder = _.groupBy(currentUserNewList, item => item.category.title)
        let data = []
        for (let key in currentUserListUnorder) {
            data.push({ name: key, value: currentUserListUnorder[key].length })
        }

        let option = {
            title: {
                text: '????????????',
                // subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        mypiechart.setOption(option);
    }



    const renderBarChar = (data) => {
        var barChart = lbarChart

        if (barChart === '') {
            barChart = ECharts.init(barRef.current);
        }
        // ??????????????????dom????????????echarts??????


        // ?????????????????????????????????
        var option = {
            title: {
                text: '??????????????????'
            },
            color: ["#3398DB"],
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            legend: {
                data: ['??????']
            },
            xAxis: {
                data: Object.keys(data),
                axisLabel: {
                    rotate: 30
                }
            },
            yAxis: {
                minInterval: 1
            },
            series: [
                {
                    name: '??????',
                    type: 'bar',
                    data: Object.values(data).map(item => item.length)
                }
            ]
        };

        // ???????????????????????????????????????????????????
        barChart.setOption(option);
        window.onresize = () => {
            console.log(1);
            barChart.resize()
        }
    }



    return (

        <div className='home-page'>

            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="??????????????????" >
                            <List
                                dataSource={mostViewList}
                                renderItem={item => <List.Item>   <a onClick={(e) => {
                                    e.preventDefault()
                                    history.push(`/news-manage/preview/${item.id}`)
                                }}>{item.title}</a>  </List.Item>}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="??????????????????">
                            <List
                                dataSource={mostStarList}
                                renderItem={item => <List.Item>   <a onClick={(e) => {
                                    e.preventDefault()
                                    history.push(`/news-manage/preview/${item.id}`)
                                }}>{item.title}</a>  </List.Item>}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <SettingOutlined key="setting" onClick={() => {
                                    setIsDrawerVisable(true)

                                }} />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={currentUserInfo.username}
                                description={<div>
                                    <Space>
                                        <span style={{ fontWeight: 'bold' }}>{currentUserInfo.region ? currentUserInfo.region : '??????'}</span>
                                        <span>{currentUserInfo.role.roleName}</span>
                                    </Space>
                                </div>}

                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            <div ref={barRef} style={{
                height: '400px',
                marginTop: '20px'
            }}></div>

            <Drawer
                title="????????????????????????"
                placement={'right'}
                width='500px'
                closable={false}
                onClose={() => { setIsDrawerVisable(false) }}
                visible={isDrawerVisable}
                extra={<CloseOutlined onClick={() => { setIsDrawerVisable(false) }} />}

            >
                <div ref={pieRef} style={{
                    height: '400px',
                    width: '500px',
                    marginTop: '20px'
                }}></div>
            </Drawer>
        </div>
    )
}


// useEffect(() => {
//     // ??????????????????dom????????????echarts??????
//     var barChart = ECharts.init(document.getElementById('main'));

//     // ?????????????????????????????????
//     var option = {
//         title: {
//             text: '??????????????????'
//         },
//         tooltip: {},
//         legend: {
//             data: ['??????']
//         },
//         xAxis: {
//             data: ['??????', '?????????', '?????????', '??????', '?????????', '??????']
//         },
//         yAxis: {},
//         series: [
//             {
//                 name: '??????',
//                 type: 'bar',
//                 data: [5, 20, 36, 10, 10, 20]
//             }
//         ]
//     };

//     // ???????????????????????????????????????????????????
//     barChart.setOption(option);
// }, [])
