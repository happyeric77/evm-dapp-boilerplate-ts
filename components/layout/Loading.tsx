import { Alert, Spin } from "antd";
import { FC } from "react";
import { useLoading } from "../../hooks/useLoading";

const Loading: FC = () => {
  const { loading } = useLoading();
  return (
    <>
      {loading.isShown && (
        <Spin tip={loading.tip ?? "Loading..."}>
          {loading.title && <Alert message={loading.title} description={loading.description} type="info" />}
        </Spin>
      )}
    </>
  );
};
export default Loading;
