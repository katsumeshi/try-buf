import { Component, createEffect } from "solid-js";
import {
  QueryClient,
  createQuery,
  QueryClientProvider,
} from "@tanstack/solid-query";
import logo from "./logo.svg";
import styles from "./App.module.css";
import { greet } from "./gen/greet/v1/greet-GreetService_connectquery";
import { createConnectTransport } from "@bufbuild/connect-web";

const queryClient = new QueryClient();

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

const Comp: Component = () => {
  const options = greet.createUseQueryOptions({ name: "GPRC" }, { transport });
  const query = createQuery({
    ...options,
    queryKey: () => options.queryKey,
  });
  const result = () => query.data?.toJsonString();
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div>{result()}</div>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Comp />
    </QueryClientProvider>
  );
};

export default App;
