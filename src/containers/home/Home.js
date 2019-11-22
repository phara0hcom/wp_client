import React from "react";
import Typography from "@material-ui/core/Typography";

import cssClasses from "./Home.module.css";
import { Paper } from "@material-ui/core";

const Home = () => {
  return (
    <div className="wrapper">
      <Typography variant="h5">Home</Typography>
      <Paper className={cssClasses.main}>
        <div>
          Sorry I didn't have enough time to add any components here. I could
          have added some fake graphs components that other people have made but
          felt it was cheating. So I will leave you with this apology.
        </div>
        <div className={cssClasses.padding}>My sincerest apology,</div>
        <div className={cssClasses.padding}>
          <div>Tamer Elsayed</div>
          <p>
            <a href="https://tamerelsayed.com">tamerelsayed.com</a>
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default Home;
