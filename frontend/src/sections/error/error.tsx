import { Alert, Button } from "antd";
import { FC } from "react";

interface IErrorView {
  error?: Error;
}

const ErrorView: FC<IErrorView> = ({ error }) => {
  const reload = () => {
      window.location.reload();
  };

  return (
    <div className="ErrorView" data-testid="error-boundary">
      <h1>Oops! It seems there was an error.</h1>
      <Button onClick={reload}>Reload</Button>
      {error && (
        <>
          <pre>
            {error.name}: {error.message}
          </pre>
          <Alert message={error.stack || ''} type="error" />
        </>
      )}
    </div>
  );
};

export default ErrorView;
