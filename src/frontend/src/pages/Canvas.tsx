import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../config";

type Coordinates = {
  x: number;
  y: number;
};

interface Props {
  history: any;
  match: any;
}

const canvas_width = 500;
const canvas_height = 500;
const Canvas: React.FC<Props> = ({ history, match }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(
    null
  );
  const [socket, setSocket] = React.useState<SocketIOClient.Socket | null>(
    null
  );
  const canvasId = match.params.id;

  React.useEffect(() => {
    setSocket(socketIOClient(ENDPOINT));

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  React.useEffect(() => {
    let mouseDown: boolean = false;
    let start: Coordinates = { x: 0, y: 0 };
    let end: Coordinates = { x: 0, y: 0 };
    let canvasOffsetLeft: number = 0;
    let canvasOffsetTop: number = 0;

    function handleMouseDown(evt: MouseEvent) {
      mouseDown = true;

      start = {
        x: evt.clientX - canvasOffsetLeft,
        y: evt.clientY - canvasOffsetTop,
      };

      end = {
        x: evt.clientX - canvasOffsetLeft,
        y: evt.clientY - canvasOffsetTop,
      };
    }

    function handleMouseUp(evt: MouseEvent) {
      mouseDown = false;

      if (canvasRef.current) {
        // transmit this to socket
        const canvasContent = canvasRef.current.toDataURL();
        if (socket) {
          socket.emit("save", {
            image: canvasContent,
            canvasId: canvasId,
          });
        }
      }
    }

    function handleMouseMove(evt: MouseEvent) {
      if (mouseDown && context) {
        start = {
          x: end.x,
          y: end.y,
        };

        end = {
          x: evt.clientX - canvasOffsetLeft,
          y: evt.clientY - canvasOffsetTop,
        };

        // Draw our path
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.strokeStyle = `#${randomColor()}`;
        context.lineWidth = 3;
        context.stroke();
        context.closePath();

        if (socket) {
          socket.emit("freeDraw", { start, end, canvasId });
        }
      }
    }

    function randomColor(): string {
      const color = new Array<string>(6);

      for (let i = 0; i < 6; i++) {
        const val = Math.floor(Math.random() * 16);

        if (val < 10) {
          color[i] = val.toString();
        } else {
          color[i] = String.fromCharCode(val + 87);
        }
      }

      return color.join("");
    }

    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");

      if (renderCtx) {
        canvasRef.current.addEventListener("mousedown", handleMouseDown);
        canvasRef.current.addEventListener("mouseup", handleMouseUp);
        canvasRef.current.addEventListener("mousemove", handleMouseMove);

        canvasOffsetLeft = canvasRef.current.offsetLeft;
        canvasOffsetTop = canvasRef.current.offsetTop;

        setContext(renderCtx);
      }
    }

    if (socket && context) {
      socket.on(
        "freeDrawAll",
        ({
          start,
          end,
          canvasId: id,
        }: {
          start: Coordinates;
          end: Coordinates;
          canvasId: string;
        }) => {
          if (canvasId == id) {
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.strokeStyle = `#${randomColor()}`;
            context.lineWidth = 3;
            context.stroke();
            context.closePath();
          }
        }
      );
    }

    return function cleanup() {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousedown", handleMouseDown);
        canvasRef.current.removeEventListener("mouseup", handleMouseUp);
        canvasRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [context]);

  React.useEffect(() => {
    if (socket) {
      socket.emit("loadHistory", canvasId);

      if (context) {
        socket.on("historySent", (canvasSaved: any) => {
          console.log(canvasSaved);
          const image = new Image();
          image.onload = () => {
            context.clearRect(0, 0, canvas_width, canvas_width);
            context.drawImage(image, 0, 0); // draw the new image to the screen
          };
          image.src = canvasSaved;
        });
      }
    }
  }, [socket]);

  const handleBack = () => {
    history.push("/");
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Typography variant="body1" onClick={handleBack}>
        Go Back to Menu
      </Typography>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={canvas_width}
        height={canvas_height}
        style={{
          border: "2px solid #000",
          marginTop: 10,
        }}
      ></canvas>
    </div>
  );
};

export default Canvas;
