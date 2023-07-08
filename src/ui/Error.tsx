import { useNavigate, useRouteError } from "react-router-dom";
import { errorMessage } from "../utils/helpers";

function ErrorComponent() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errorMessage(error)}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default ErrorComponent;
