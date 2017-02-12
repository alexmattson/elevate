import {
  DefaultPage,
  CreatePoll,
  ShowPoll
} from './index';

export default {
  path: 'poll',
  childRoutes: [
    { path: 'default-page', component: DefaultPage, isIndex: true },
    { path: 'create-poll', component: CreatePoll },
    { path: ':id', component: ShowPoll }
  ],
};
