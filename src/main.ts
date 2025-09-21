import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { initFlowbite } from 'flowbite';

bootstrapApplication(App, appConfig)
  .then(() => {
    // Initialize Flowbite after Angular app is bootstrapped
    initFlowbite();
  })
  .catch((err) => console.error(err));
