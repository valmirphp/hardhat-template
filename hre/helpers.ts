import { extendEnvironment } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import GreeterModule from '@app/ignition/Greeter';
import { Greeter } from '@app/typechain';

extendEnvironment((hre: HardhatRuntimeEnvironment) => {
  hre.helpers = {
    getGreeter: async () => {
      const { greeter } = await hre.ignition.deploy(GreeterModule);
      return greeter as unknown as Greeter;
    },
  };
});
