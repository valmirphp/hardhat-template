import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('Greeter', (m) => {
  const greeter = m.contract('Greeter', ['Hello, world!']);

  m.call(greeter, 'setGreeting', ['Olá Mundo!']);

  return { greeter };
});
