import { FC } from "react";
import { Alert } from "antd";
import { useNotify } from "../../hooks/useNotify";

const Notify: FC = () => {
  const { notify } = useNotify();
  return (
    <>
      {notify.status && (
        <Alert
          message={notify.title}
          description={notify.description}
          type={notify.status}
          showIcon={notify.showIcon ?? true}
        />
      )}
    </>
  );
};

export default Notify;
