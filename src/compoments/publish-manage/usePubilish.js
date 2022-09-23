import axios from 'axios'
import { useEffect, useState } from 'react'



export default function usePubilish(publishState) {
    const [dataSource, setDataSource] = useState([])
    const currentUserInfo = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8000/news?author=${currentUserInfo.username}&publishState=${publishState}&_expand=category`
        }).then(res => {
            console.log(res.data);
            setDataSource(res.data)
        })

    }, [])


    //发布
    const handlePushBtn = (item) => {
        console.log('发布');
        console.log(item);

        axios({
            method: 'patch',
            url: `http://localhost:8000/news/${item.id}`,
            data: {
                publishState: 2,
                publishTime: Date.now()
            }
        }).then(res => {

            axios({
                method: 'get',
                url: `http://localhost:8000/news?author=${currentUserInfo.username}&publishState=${publishState}&_expand=category`
            }).then(res => {
                console.log(res.data);
                setDataSource(res.data)
            })

        }).catch(res => {
            console.log('失败');
        })









    }

    //下架
    const handleSunset = (item) => {
        console.log('下架');
     //   console.log(item);

        axios({
            method: 'patch',
            url: `http://localhost:8000/news/${item.id}`,
            data: {
                publishState: 3,
            }
        }).then(res => {

            axios({
                method: 'get',
                url: `http://localhost:8000/news?author=${currentUserInfo.username}&publishState=${publishState}&_expand=category`
            }).then(res => {
                console.log(res.data);
                setDataSource(res.data)
            })

        }).catch(res => {
            console.log('失败');
        })

    }
    //删除
    const handleDeleteBtn = (item) => {
        console.log('删除');
        console.log(item);


        axios({
            method: 'delete',
            url: `http://localhost:8000/news/${item.id}`,
        }).then(res => {

            axios({
                method: 'get',
                url: `http://localhost:8000/news?author=${currentUserInfo.username}&publishState=${publishState}&_expand=category`
            }).then(res => {
                console.log(res.data);
                setDataSource(res.data)
            })

        }).catch(res => {
            console.log('失败');
        })

    }

    return {
        dataSource, handleSunset, handlePushBtn, handleDeleteBtn
    }
}
