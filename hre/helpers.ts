import { extendEnvironment } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

extendEnvironment((hre: HardhatRuntimeEnvironment) => {
  hre.helpers = {
    greeter: async () => {
      const Greeter = await hre.deployments.get("Greeter");
      return hre.ethers.getContractAt("Greeter", Greeter.address);
    },
  };
});
