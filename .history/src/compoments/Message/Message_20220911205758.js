import React from "react";
import { message } from 'antd'


const success = (text) => {
    text = text || 'This is a success message'
    message.success(text);
};

const error = (text) => {
    text = text || 'This is an error message'
    message.error(text);
};

const warning = (text) => {
    text = text || 'This is a warning message'
    message.warning(text);
};

export {
    success, error, warning
}