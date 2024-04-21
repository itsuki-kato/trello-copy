"use client";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "antd";

type Props = {
  id: number;
};

export default function TodoCard(props: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const [isDragging, setisDragging] = useState<boolean>(false);

  const handleCardClick = () => {
    setisDragging(true);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        className={`${isDragging ? "border-blue-500" : ""}`}
        size="small"
        title="Small size card"
        extra={<a href="#">More</a>}
        style={{ cursor: "pointer" }}
        onClick={handleCardClick}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
}
