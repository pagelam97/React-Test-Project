import React from 'react'
import style from './Child.module.css'

console.log(style);

export default function Child() {
    return (
        <div>
            <ul className={style.childStyle}>
                <li>Child组件</li>
                <li>Child组件</li>
                <li>Child组件</li>
                <li>Child组件</li>
            </ul>

        </div>
    )
}
