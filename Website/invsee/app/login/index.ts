"use client";

import axios, { AxiosResponse } from "axios";

class LoginEngine {
  public Server(email: string, password: string) {
    const url = "http://localhost:9090/honego/v1/user/login";
    const credentials = {
      email: email,
      password: password,
    };
    return axios.post(url, credentials);
  }
}

export default LoginEngine;
