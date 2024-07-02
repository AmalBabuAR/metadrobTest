import React, { useEffect, useRef } from "react";

const Canvas2DComponent = ({ objects, speeds }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const drawRectangle = (ctx, x, y, size, rotationY) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.transform(1, 0, 0, Math.cos(rotationY), 0, 0);
      ctx.fillStyle = "white";
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.restore();
    };

    const drawRing = (ctx, x, y, innerRadius, outerRadius, rotationY) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.transform(1, 0, 0, Math.cos(rotationY), 0, 0);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(0, 0, outerRadius, 0, 2 * Math.PI);
      ctx.moveTo(innerRadius, 0);
      ctx.arc(0, 0, innerRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.restore();
    };

    const drawDiamond = (ctx, x, y, size, rotationY) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.transform(1, 0, 0, Math.cos(rotationY), 0, 0);
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.moveTo(0, -size / 2); // Top point
      ctx.lineTo(size / 2, 0); // Right point
      ctx.lineTo(0, size / 2); // Bottom point
      ctx.lineTo(-size / 2, 0); // Left point
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      if (objects[0]) {
        drawRectangle(context, width / 4, height / 2, 50, speeds[0]);
      }
      if (objects[1]) {
        drawRing(context, width / 2, height / 2, 15, 25, speeds[1]);
      }
      if (objects[2]) {
        drawDiamond(context, (3 * width) / 4, height / 2, 50, speeds[2]);
      }
      speeds.forEach((speed, index) => {
        speeds[index] += speed;
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, [objects, speeds]);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} width={800} height={600}></canvas>
    </div>
  );
};

export default Canvas2DComponent;
