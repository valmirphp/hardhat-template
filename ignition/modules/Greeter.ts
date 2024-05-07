import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export const GreeterModule = buildModule("Greeter", (m) => {
  const greeter = m.contract("Greeter", ["Hello, world!"]);

  m.call(greeter, "setGreeting", ["Olá Mundo!"]);

  return { greeter };
});

export default GreeterModule;
