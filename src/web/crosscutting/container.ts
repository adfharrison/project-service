import { createContainer, Resolver } from 'awilix';

export function makeContainer() {
  const container = createContainer();

  // allows unfound dependencies to not throw error
  container.resolve('events', { allowUnregistered: true });

  return container.cradle;
}
