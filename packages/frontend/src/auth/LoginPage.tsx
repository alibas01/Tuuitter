import { FormControl, Grid, Input, Box } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { StateContext, ContextType } from "../StateProvider";
import { login } from "./authApi";
import { Redirect } from "react-router-dom";

export default function LoginPage() {
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useContext<ContextType>(StateContext);

  async function handleSubmit(evt: any) {
    evt.preventDefault();

    const user = await login(handle, password);
    dispatch({
      type: "setUser",
      payload: user,
    });
  }

  if (state.user) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container>
      <Grid item xs={8} style={{ backgroundColor: "black", height: "vh-100" }}>
        {/* Empty grid for spacing */}
      </Grid>
      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={1}>
            {/* Empty grid for spacing */}
          </Grid>
          <Grid item xs={4}>
            <form onSubmit={(evt) => handleSubmit(evt)}>
              <FormControl fullWidth>
                <Input
                  id="handle"
                  placeholder="Handle"
                  value={handle}
                  onChange={(evt) => setHandle(evt.target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <Input type="submit" value="Login"></Input>
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
