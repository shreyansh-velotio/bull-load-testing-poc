import { Queue1Job } from './queue1-job';
import { Queue2Job } from './queue2-job';
import { Queue3Job } from './queue3-job';
import { Queue4Job } from './queue4-job';
import { Queue5Job } from './queue5-job';
import { Queue6Job } from './queue6-job';
import { Queue7Job } from './queue7-job';
import { Queue8Job } from './queue8-job';
import { Queue9Job } from './queue9-job';
import { Queue10Job } from './queue10-job';
import { MAX_QUEUE } from '../../../shared/constants';

const LOCAL_CONSUMERS = [
  Queue1Job,
  Queue2Job,
  Queue3Job,
  Queue4Job,
  Queue5Job,
  Queue6Job,
  Queue7Job,
  Queue8Job,
  Queue9Job,
  Queue10Job,
].splice(0, MAX_QUEUE);

export default LOCAL_CONSUMERS;
