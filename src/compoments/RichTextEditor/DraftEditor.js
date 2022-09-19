import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './DraftEditor.css'

export default function DraftEditor(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = (value) => {
        setEditorState(value)
    }

    const handleOnBlur =()=>{
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
