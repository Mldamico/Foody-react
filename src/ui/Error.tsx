import { useNavigate, useRouteError } from "react-router-dom";
import { errorMessage } from "../utils/helpers";
import { LinkButton } from "./LinkButton";

function ErrorComponent() {
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errorMessage(error)}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default ErrorComponent;
