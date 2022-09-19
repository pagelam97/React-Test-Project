import React, { useRef } from 'react'
import { Button, PageHeader, Space, Steps, Form, Input, Select, Descriptions, Badge } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { error, success } from '../../../compoments/Message/Message';

import DraftEditor from '../../../compoments/RichTextEditor/DraftEditor';

import elementStyle from './addNews.module.css'
import { useHistory } from 'react-router-dom';
console.log(elementStyle);

const { Step } = Steps;
const { Option } = Select

export default function AddNews() {

    const [currentStep, setCurrentStep] = useState(0)
    const [categories, setcategories] = useState([])
    const [editorContent, setEditorContent] = useState('')
    const [newsTitle, setNewsTitle] = useState('')
    const [newsCategoriesId, setNewsCategoriesId] = useState(1)

    const titleForm = useRef(null)
    const history = useHistory()




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
                error('按照提示填写表单')
            })
        } else {
            //setCurrentStep(currentStep + 1)

            if (editorContent === '' || editorContent.trim() === '<p></p>') {
                error('新闻内容不能为空')
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
            "title": newsTitle,
            "categoryId": newsCategoriesId,
            "content": editorContent,
            "region": currentUserInfo.region ? currentUserInfo.region : "全球",
            "author": currentUserInfo.username,
            "roleId": currentUserInfo.roleId,
            "auditState": auditState,
            "publishState": 0,
            "createTime": Date.now(),
            "star": 0,
            "view": 0,
        }
        axios({
            method: 'post',
            url: 'http://localhost:8000/news',
            data: newPushNews
        }).then(res => {
            let pushPath = auditState === 0 ? "/news-manage/draft" : "/audit-manage/list"
            let alterMessage = auditState === 0 ? '提交成功,请在草稿箱中查看' : '提交成功,请在审核列表中查看'
            history.push(pushPath)
            success(alterMessage)
        }).catch(res => {
            console.log(res);
            error('新增新闻失败')
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
                title="撰写新闻"
                subTitle="新建一条文章"
            />


            <Steps current={currentStep} style={{ marginTop: '20px' }}>
                <Step title="基本信息" description="编辑新闻标题和分类." />
                <Step title="新闻内容" description="编辑新闻内容." />
                <Step title="新闻提交" description="保存到草稿箱或提交审核." />
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
                            label="新闻标题"
                            name="title"
                            rules={[{ required: true, message: '请输入新闻标题!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="新闻分类"
                            name="categoryId"
                            rules={[{ required: true, message: '请选择新闻分类!' }]}
                        >
                            <Select
                            //   onChange={handleChange}
                            >
                                {categories.map((item) => {
                                    return <Option value={item.id} key={item.id}>{item.value}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Form>
                </div>

                <div className={currentStep === 1 ? '' : elementStyle.elementHidden}>
                    <DraftEditor getEditorContext={getEditorContext} />
                </div>

                <div className={currentStep === 2 ? '' : elementStyle.elementHidden}>
                    <Descriptions title="新闻概览" column={3} bordered>

                        <Descriptions.Item label="新闻作者" >{currentUserInfo.username}</Descriptions.Item>
                        <Descriptions.Item label="发布区域">{currentUserInfo.region === '' ? '全球' : currentUserInfo.region}</Descriptions.Item>
                        <Descriptions.Item label="新闻类型" >{categories.length === 0 ? '' : categories[newsCategoriesId - 1].value}</Descriptions.Item>
                        <Descriptions.Item label="新闻标题" span={3}>{newsTitle}</Descriptions.Item>
                        <Descriptions.Item label="新闻内容" span={3}>
                            {editorContent}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </div>

            <div className='control' style={{ marginTop: '20px' }}>
                <Space>
                    {currentStep < 2 ? <Button type='primary' onClick={() => { handleNextBtn() }}>下一步</Button> : null}
                    {currentStep === 0 ? null : <Button type='primary' onClick={() => { handlePreBtn(0) }}>上一步</Button>}
                    {
                        currentStep === 2 ?
                            <>
                                <Button type="primary" style={{ backgroundColor: '#2bce5b' }} onClick={() => { handlePushBtn(0) }} >保存到草稿箱</Button>
                                <Button danger onClick={() => { handlePushBtn(1) }}>提交审核</Button>
                            </>
                            : null}

                </Space>
            </div>


        </div>
    )
}
