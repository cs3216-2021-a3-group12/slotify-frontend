import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../AuthContext";

const AuthRoute = ({
  component: Component,
  path,
  children,
  ...rest
}: {
  component: any;
  path: string;
  children?: any;
  [rest: string]: any;
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
    >
      {children}
    </Route>
  );
};

export default AuthRoute;
