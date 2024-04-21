"use client";

import { forwardRef } from "react";
import { Card } from "antd";

export const Item = forwardRef(({ id, ...props }, ref) => {
  return (
    <div {...props} ref={ref} style={style}>
      <Card
        className="border-blue-500"
        size="small"
        title="Small size card"
        extra={<a href="#">More</a>}
        style={{ cursor: "pointer" }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
});

const style = {
  border: "1px solid rgba(0, 0, 0, 0.12)",
};
