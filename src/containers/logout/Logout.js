import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";

import firebase from "../../shared/firebase";
import { setCookie } from "../../shared/functions/utils";

const Logout = () => {
  const [state, setState] = useState({
    loggedOut: false,
    logOutError: false
  });
  useEffect(() => {
    if (!state.loggedOut) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          setCookie("loginToken", "", 0);
          setState({ loggedOut: true, logOutError: false });
          setTimeout(() => {
            window.location.href = "/login";
          }, 5000);
        })
        .catch(err => {
          console.log({ err });
          setState({ loggedOut: false, logOutError: true });
        });
    }
  }, [state]);
  if (state.logOutError)
    return (
      <div className="wrapper">
        <Typography variant="h5" component="h3">
          Oops!! a error occourd:
        </Typography>
        <div>{state.error}</div>
      </div>
    );
  return (
    <div className="wrapper">
      <Typography variant="h5" component="h3">
        Logging out, See you next time!
      </Typography>
    </div>
  );
};

export default Logout;
