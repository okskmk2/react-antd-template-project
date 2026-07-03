import { message, Modal, notification } from "antd";

export function callModal(content: string) {
  Modal.info({ content });
}

export function callMessage(content: string) {
  message.info(content);
}

export function callNotification(messageText: string, description?: string) {
  notification.info({
    title: messageText,
    description,
  });
}
