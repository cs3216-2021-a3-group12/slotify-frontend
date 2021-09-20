import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../AuthContext";

const AuthRoute = ({
  component: Component,
  path,
  ...rest
}: {
  component: any;
  path: string;
}) => {
  const userDetails = useAuthState();
  return (
    <Route
      path={path}
      render={(props) =>
        !Boolean(userDetails.accessToken) ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default AuthRoute;
