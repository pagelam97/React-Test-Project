import React from 'react'
import style from './Child.module.sass'

console.log(style);

export default function Child() {
    return (
        <div>
            <ul >
                <li className={style.childStyle}>Child组件</li>
                <li>Child组件</li>
                <li>Child组件</li>
                <li>Child组件</li>
            </ul>

        </div>
    )
}
