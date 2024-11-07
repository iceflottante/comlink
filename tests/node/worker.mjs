import { parentPort } from "worker_threads";
import * as comlink from "../../dist/esm/comlink.mjs";
import nodeEndpoint from "../../dist/esm/node-adapter.mjs";

await new Promise((resolve) => {
  let time = 0;
  const handle = setInterval(() => {
    console.log((time += 200), "passed");
  }, 200);

  setTimeout(() => {
    clearInterval(handle);
    resolve();
  }, 1_000);
});

comlink.expose(
  {
    void: () => {
      console.log("void");
    },
    number: () => {
      console.log("number");
      return 1;
    },
    calc: (a, b) => {
      console.log("calc");
      return a + b;
    },
    object: () =>
      comlink.proxy({
        void: () => {
          console.log("object.void");
        },
        number: () => {
          console.log("object.number");
          return 2;
        },
        calc: (a, b) => {
          console.log("object.calc");
          return a + b;
        },
      }),
  },
  nodeEndpoint(parentPort)
);
