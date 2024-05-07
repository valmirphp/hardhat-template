import "hardhat/types";
import type { Greeter } from "@app/typechain";

declare module "hardhat/types" {
  interface HardhatRuntimeEnvironment {
    helpers: {
      getGreeter: () => Promise<Greeter>;
    };
  }
}
