import type { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../store";
import { PayloadType } from "../actions/socket-actions";
import { OrdersFeedState } from "../../types/application-types/orders-feed-state";
import { refreshAccessToken } from "../../utils/common";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (
  {
    start,
    disconnect,
    closed,
    open,
    error,
    message,
    send,
  }: {
    start: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    closed: ActionCreatorWithoutPayload;
    error: ActionCreatorWithPayload<string>;
    open: ActionCreatorWithoutPayload;
    send: ActionCreatorWithPayload<PayloadType>;
    message: ActionCreatorWithPayload<OrdersFeedState>;
  },
  withTokenRefresh: boolean = false
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let url = "";
    let isConnected = false;
    let reconnectTimer = 0;

    return (next) => (action) => {
      const { dispatch } = store;
      if (start.match(action)) {
        url = action.payload as string;
        socket = new WebSocket(url);
        isConnected = true;

        socket.onopen = (event) => {
          console.log({ url });
          dispatch(open());
        };

        socket.onerror = (event: Event) => {
          console.log(event);
          dispatch(error("Произошла ошибка"));
        };

        socket.onmessage = async (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);
            if (
              withTokenRefresh &&
              (data as { message: string }).message ===
                "Invalid or missing token"
            ) {
              try {
                const newAccessToken = await refreshAccessToken();

                const wssUrl = new URL(url);
                wssUrl.searchParams.set(
                  "token",
                  newAccessToken.replace("Bearer ", "")
                );
                dispatch(start(wssUrl.toString()));
              } catch (err) {
                dispatch(error((err as { message: string }).message));
              }

              dispatch(disconnect());
            } else {
              dispatch(message(data));
            }
          } catch (err) {
            const e = err as Error;
            dispatch(error(e.message));
          }
        };

        socket.onclose = () => {
          dispatch(closed());

          if (isConnected) {
            console.log("reconnect");
            reconnectTimer = window.setTimeout(() => {
              dispatch(start(url));
            }, RECONNECT_PERIOD);
          }
        };
      }

      if (socket) {
        if (send && send.match(action)) {
          socket.send(JSON.stringify(action.payload));
        }

        if (disconnect.match(action)) {
          isConnected = false;
          clearTimeout(reconnectTimer);
          reconnectTimer = 0;
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  }) as Middleware;
};
