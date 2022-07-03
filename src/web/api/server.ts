import { makeContainer } from '@web/crosscutting/container';
import { makeApp } from './app';

const dependencies = makeContainer();

const port = Number(process.env.PORT || 3000);
makeApp().listen(port, function startServer() {
  console.log(`Server running on http://localhost:${port}`);
});
