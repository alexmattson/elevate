import {
  DefaultPage,
  GetStarted,
  TestPage1,
  TestPage2,
} from './index';

export default {
  path: '',
  name: 'home',
  childRoutes: [
    { path: 'default-page', component: DefaultPage, isIndex: true },
    { path: 'get-started', component: GetStarted },
    { path: 'test-page-1', component: TestPage1 },
    { path: 'test-page-2', component: TestPage2 },
  ],
};
