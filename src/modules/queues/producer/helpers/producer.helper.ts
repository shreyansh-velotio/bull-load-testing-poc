import { MAX_QUEUE } from '../../../shared/constants';
import { QUEUE_NAMES } from '../../enums/queue-name.enum';

export function getQueues(): string[] {
  const queueNames = Object.keys(QUEUE_NAMES).map((key) => {
    return QUEUE_NAMES[key];
  });

  return queueNames.splice(0, MAX_QUEUE);
}
