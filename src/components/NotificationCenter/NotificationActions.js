import { NOTIFICATION } from "state/NotificationsReducer";
import { v4 as uuidv4 } from "uuid";

export const enqueueNotification = (notification) => (dispatch) => {
  dispatch({
    type: `${NOTIFICATION}_ENQUEUE`,
    payload: {
      id: uuidv4(),
      type: "info",
      ...notification,
    },
  });
};

export const dequeueNotification = () => (dispatch) => {
  dispatch({
    type: `${NOTIFICATION}_DEQUEUE`,
  });
};

export const deleteNotification = (id) => (dispatch) => {
  dispatch({
    type: `${NOTIFICATION}_DELETE`,
    payload: id,
  });
};
