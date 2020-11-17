#!/usr/bin/env node
import App from './app';

const app = App();

app.create().then(() => app.start());
