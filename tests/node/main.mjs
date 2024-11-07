import { Worker } from "worker_threads";
import * as comlink from "../../dist/esm/comlink.mjs";
import nodeEndpoint from "../../dist/esm/node-adapter.mjs";
import { expect } from "chai";

describe("node", () => {
  describe("Comlink across workers", function () {
    beforeEach(function () {
      this.worker = new Worker("./tests/node/worker.mjs");
    });

    afterEach(function () {
      this.worker.terminate();
    });

    it("can communicate", async function () {
      const proxy = comlink.wrap(nodeEndpoint(this.worker));
      expect(await proxy.void()).to.equal(undefined);
      expect(await proxy.number()).to.equal(1);
      expect(await (await proxy.object()).number()).to.equal(2)
    });
    
    // it("can skip await", async function () {
    //   const proxy = comlink.wrap(nodeEndpoint(this.worker));
    //   const lazy = proxy.object.lazyApply
    //   expect(await lazy.number()).to.equal(2)
    // })

    // it("can tunnels a new endpoint with createEndpoint", async function () {
    //   const proxy = comlink.wrap(nodeEndpoint(this.worker));
    //   const otherEp = await proxy[comlink.createEndpoint]();
    //   const otherProxy = comlink.wrap(otherEp);
    //   expect(await otherProxy.calc(20, 1)).to.equal(21);
    // });
  });
});
