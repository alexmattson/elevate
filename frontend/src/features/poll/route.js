import {
  DefaultPage,
} from './index';

export default {
  path: 'poll',
  childRoutes: [
    { path: 'default-page', component: DefaultPage },
  ],
};
