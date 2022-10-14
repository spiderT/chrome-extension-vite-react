import './index.scss';
import React, { useState } from 'react';
import { Input, Modal, Form, Radio } from 'antd';
import { CollectionCreateFormProps, Type } from '../../interface';
import { transFormToInterface } from '../../utils';

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({ open, onCreate, onCancel, initialValues }) => {
  const [form] = Form.useForm();

  const handleValues = (values: any) => {
    const res = transFormToInterface(values);
    if (initialValues.id) {
      res.id = initialValues.id;
    }
    onCreate(res);
  };

  return (
    <Modal
      open={open}
      title="添加快捷方式"
      okText="完成"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleValues(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="horizontal" preserve={false} name="form_in_modal" initialValues={initialValues}>
        <Form.Item name="type" label="类型" rules={[{ required: true, message: '请选择网站类型!' }]}>
          <Radio.Group>
            <Radio value={Type.DEVELOP}>前端框架</Radio>
            <Radio value={Type.BUILD}>打包工具</Radio>
            <Radio value={Type.SERVER}>Javascript运行时</Radio>
            <Radio value={Type.DESKTOP}>跨端</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="name" label="名称" rules={[{ required: true, message: '请输入网站名称!' }]}>
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item name="icon" label="图标" rules={[{ message: '请输入正确的图标链接!', pattern: /^(https|http)?:\/\/.+/ }]}>
          <Input placeholder="请输入网站图标链接" />
        </Form.Item>
        <Form.Item name="desc" label="desc">
          <Input placeholder="请输入网站描述" />
        </Form.Item>
        <Form.Item name="url" label="网址" rules={[{ required: true, message: '请输入网址!', pattern: /^(https|http)?:\/\/.+/ }]}>
          <Input placeholder="请输入网址" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
