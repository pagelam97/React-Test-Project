import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './DraftEditor.css'

export default function DraftEditor(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())



    useEffect(() => {
        if (props.content === undefined) return
        const currentHtml = props.content
        const contentBlock = htmlToDraft(currentHtml);

        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            //editorState第一次赋值之后,马上调用父组件的马上赋值给父组件,这样确保当不点击编辑器,直接点下一步的时候拿到的不是<p></p>
            //放在setTimeout是因为确保editorState已经更新完了才调用 props.getEditorContext()
            setTimeout(() => {
                setEditorState(editorState)
                let draftToHtmlValue = draftToHtml(convertToRaw(editorState.getCurrentContent()))
                console.log(draftToHtmlValue);
                props.getEditorContext(draftToHtmlValue)
            }, 0)
        }

    }, [props.content])


    const onEditorStateChange = (value) => {
        setEditorState(value)
    }

    const handleOnBlur = () => {
        let draftToHtmlValue = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        props.getEditorContext(draftToHtmlValue)
    }
    return (
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorContent"
            onEditorStateChange={onEditorStateChange}
            onBlur={handleOnBlur}
        />
    )
}
