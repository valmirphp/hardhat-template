import "hardhat/types";

import { Greeter } from "../types";

declare module "hardhat/types" {
  interface HardhatRuntimeEnvironment {
    helpers: {
      greeter: () => Promise<Greeter>;
    };
  }
}
