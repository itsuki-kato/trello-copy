"use client";

import React from "react";
import { useState } from "react";
import {
  Breadcrumb,
  Layout,
  Card,
  Flex,
  Button,
  Space,
  Modal,
  Form,
  Input,
} from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TodoCard from "../components/todoCard";
import { Item } from "@/components/Item";

const { Content } = Layout;

export default function Home() {
  const [items, setItems] = useState([1, 2, 3]);
  const [secondItems, setSecondItems] = useState([4, 5, 6]);
  const [thirdItems, setThirdItems] = useState([7, 8, 9]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <Flex justify="center" gap="large">
            <Card
              type="inner"
              title="Default size card"
              extra={
                <Button
                  icon={<PlusCircleTwoTone />}
                  onClick={showModal}
                ></Button>
              }
              style={{ width: 300 }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                {items.map((id) => (
                  <TodoCard key={id} id={id} />
                ))}
              </Space>
            </Card>

            <Card
              type="inner"
              title="Default size card"
              extra={
                <Button
                  icon={<PlusCircleTwoTone />}
                  onClick={showModal}
                ></Button>
              }
              style={{ width: 300 }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                {secondItems.map((id) => (
                  <TodoCard key={id} id={id} />
                ))}
              </Space>
            </Card>

            <Card
              type="inner"
              title="Default size card"
              extra={
                <Button
                  icon={<PlusCircleTwoTone />}
                  onClick={showModal}
                ></Button>
              }
              style={{ width: 300 }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                {thirdItems.map((id) => (
                  <TodoCard key={id} id={id} />
                ))}
              </Space>
            </Card>

          </Flex>
        </SortableContext>
      </DndContext>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
}
