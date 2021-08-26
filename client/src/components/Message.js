import React from 'react';

const getClassName = (message) => {
  let baseClass = 'alert';
  if (message.isError) {
    baseClass = baseClass + ' alert-danger';
  } else {
    baseClass = baseClass + ' alert-success';
  }
  return baseClass;
};

function Message({ message }) {
  return <div className={getClassName(message)}>{message.msgBody}</div>;
}

export default Message;
