import React, { useRef } from 'react'
import { Button, PageHeader, Space, Steps, Form, Input, Select, Descriptions, Badge } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { error, success } from '../../../compoments/Message/Message';

import DraftEditor from '../../../compoments/RichTextEditor/DraftEditor';

import elementStyle from './addNews.module.css'
import { useHistory } from 'react-router-dom';

const { Step } = Steps;
const { Option } = Select

export default function UpdataNews(props) {

    console.log(props.match.params.id);

    const [newsInfo, setNewsInfo] = useState({})

    const [currentStep, setCurrentStep] = useState(0)
    const [categories, setcategories] = useState('')
    const [editorContent, setEditorContent] = useState('')
    const [newsTitle, setNewsTitle] = useState('')
    const [newsCategoriesId, setNewsCategoriesId] = useState(1)

    const titleForm = useRef(null)
    const history = useHistory()


    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8000/news?id=${props.match.params.id}&_expand=role&_expand=category`
        }).then(res => {
            console.log(...res.data);
            setNewsInfo(...res.data)
        })

    }, [props.match.params.id])



    useEffect(() => {
        if (Object.keys(newsInfo).length === 0) return
        console.log(newsInfo);

        titleForm.current.setFieldValue('title', newsInfo.title)
        titleForm.current.setFieldValue('categoryId', newsInfo.categoryId)
    }, [newsInfo])

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/categories'
        }).then(res => {
            console.log(res.data);
            setcategories(res.data)
        }
        )
    }, [])

    const currentUserInfo = JSON.parse(localStorage.getItem('token'))
    console.log(currentUserInfo);

    const handleNextBtn = () => {
        console.log('dianle');

        if (currentStep === 0) {
            titleForm.current.validateFields().then(
                res => {
                    setNewsTitle(titleForm.current.getFieldValue('title'))
                    setNewsCategoriesId(titleForm.current.getFieldValue('categoryId'))
                    setCurrentStep(currentStep + 1)
                }
            ).catch(res => {
                error('????????????????????????')
            })
        } else {
            //setCurrentStep(currentStep + 1)

            if (editorContent === '' || editorContent.trim() === '<p></p>') {
                console.log(editorContent);
                error('????????????????????????')
            } else {
                setCurrentStep(currentStep + 1)
            }
        }
    }

    const handlePreBtn = () => {
        setCurrentStep(currentStep - 1)
    }


    const handlePushBtn = (auditState) => {

        console.log(auditState);

        let newPushNews = {
            //  ...newsInfo,
            "title": newsTitle,
            "categoryId": newsCategoriesId,
            "auditState": auditState
            // "title": newsTitle,
            // "categoryId": newsCategoriesId,
            // "content": editorContent,
            // "region": currentUserInfo.region ? currentUserInfo.region : "??????",
            // "author": currentUserInfo.username,
            // "roleId": currentUserInfo.roleId,
            // "auditState": auditState,
            // "publishState": 0,
            // "createTime": Date.now(),
            // "star": 0,
            // "view": 0,
        }
        axios({
            method: 'patch',
            url: `http://localhost:8000/news/${newsInfo.id}`,
            data: newPushNews
        }).then(res => {
            let pushPath = auditState === 0 ? "/news-manage/draft" : "/audit-manage/list"
            let alterMessage = auditState === 0 ? '????????????,????????????????????????' : '????????????,???????????????????????????'
            history.push(pushPath)
            success(alterMessage)
        }).catch(res => {
            console.log(res);
            error('??????????????????')
        })

    }

    const getEditorContext = (value) => {
        console.log('currentEditorValue---->', value)
        setEditorContent(value)
    }


    return (
        <div>
            <PageHeader
                className="site-page-header"
                // onBack={() => window.history.back()}
                title="????????????"
                subTitle="??????????????????"
            />


            <Steps current={currentStep} style={{ marginTop: '20px' }}>
                <Step title="????????????" description="???????????????????????????." />
                <Step title="????????????" description="??????????????????." />
                <Step title="????????????" description="?????????????????????????????????." />
            </Steps>


            <div className='main-content' style={{ marginTop: '20px' }}>
                <div className={currentStep === 0 ? '' : elementStyle.elementHidden}>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        name="basic"
                        autoComplete="off"
                        ref={titleForm}
                    >
                        <Form.Item
                            label="????????????"
                            name="title"
                            rules={[{ required: true, message: '?????????????????????!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="????????????"
                            name="categoryId"
                            rules={[{ required: true, message: '?????????????????????!' }]}
                        >
                            <Select
                            //   onChange={handleChange}
                            >
                                {categories && categories.map((item) => {
                                    return <Option value={item.id} key={item.id}>{item.value}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Form>
                </div>

                <div className={currentStep === 1 ? '' : elementStyle.elementHidden}>
                    <DraftEditor getEditorContext={getEditorContext} content={newsInfo.content} />
                </div>

                <div className={currentStep === 2 ? '' : elementStyle.elementHidden}>
                    {categories && <Descriptions title=" " column={3} bordered style={{ marginTop: '20px' }}>

                        <Descriptions.Item label="????????????" >{newsInfo.author}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{newsInfo.region === '' ? '??????' : newsInfo.region}</Descriptions.Item>
                        <Descriptions.Item label="????????????" >{categories[newsCategoriesId - 1].value}</Descriptions.Item>


                        {/* <Descriptions.Item label="????????????" >{newsInfo.username}</Descriptions.Item> */}

                        <Descriptions.Item label="????????????" span={3}>{newsTitle}</Descriptions.Item>
                        <Descriptions.Item label="????????????" span={3}>
                            {<div dangerouslySetInnerHTML={{
                                __html: editorContent
                            }}>
                            </div>}
                        </Descriptions.Item>
                    </Descriptions>}
                </div>
            </div>

            <div className='control' style={{ marginTop: '20px' }}>
                <Space>
                    {currentStep < 2 ? <Button type='primary' onClick={() => { handleNextBtn() }}>?????????</Button> : null}
                    {currentStep === 0 ? null : <Button type='primary' onClick={() => { handlePreBtn(0) }}>?????????</Button>}
                    {
                        currentStep === 2 ?
                            <>
                                <Button type="primary" style={{ backgroundColor: '#2bce5b' }} onClick={() => { handlePushBtn(0) }} >??????????????????</Button>
                                <Button danger onClick={() => { handlePushBtn(1) }}>????????????</Button>
                            </>
                            : null}

                </Space>
            </div>
        </div>
    )
}
