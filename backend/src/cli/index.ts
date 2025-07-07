#!/usr/bin/env node

import { CLIApplication } from './cli-application.js';

const app = new CLIApplication();
app.run(process.argv.slice(2));
