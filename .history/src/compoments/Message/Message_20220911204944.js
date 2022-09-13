import React from "react";
import { message } from 'antd'


const success = () => {
    message.success('This is a success message');
};

const error = () => {
    message.error('This is an error message');
};

const warning = () => {
    message.warning('This is a warning message');
};

export {
    success, error, warning
}