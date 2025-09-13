import { Modal, Tabs, TabsProps } from 'antd';
import React, { useState, useEffect } from 'react';
import 'highlight.js/styles/base16/material.css';
import Highlight from 'react-highlight';  

export type PreviewModelProps = {
  open: boolean;
  data?: any;
  onHide:()=>void;
}

const PreviewModel: React.FC<PreviewModelProps> = (props) => {

  const panes: any = [];
  const keys = Object.keys(props.data);
  keys.forEach((key) => {
    panes.push({
        key: key + '1',
        label: key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm')),
        children: <div className='max-h-200 overflow-auto'><Highlight className="java">{props.data[key]}</Highlight></div>,
      } as TabsProps);
  });
  
    useEffect(() => {
        
    }, [props, props.open]);

    return (
      <Modal
        width={900}
        title={'预览'}
        className='!w-400'
        open={props.open}
        footer={false}
        onOk={() => {
          props.onHide();
        }}
        onCancel={() => {
          props.onHide();
        }}
      >
        <Tabs
          type='card' 
          defaultActiveKey="1" 
          items={panes}>
          </Tabs>
      </Modal>
    );
};

export default PreviewModel;