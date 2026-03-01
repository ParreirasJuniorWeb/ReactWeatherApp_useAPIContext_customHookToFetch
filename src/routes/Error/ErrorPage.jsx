import { useRouteError }  from "react-router-dom";

const ErrorPage = () => {

    const error = useRouteError();

    console.log(error);

  return (
    <div className="error">
      <h1>Ops!</h1>
      <p>Temos um problema na execução da aplicação.</p>
      <p>
        {error.statusText}
      </p>
      <p>
        {error.error.message}
      </p>
    </div>
  )
}

export default ErrorPage;