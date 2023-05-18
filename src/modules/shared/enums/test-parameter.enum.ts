/**
 * Basic: Test the performance of jobs in no delay, no batching, and concurrency = 1.
 *
 * Batch Processing: Test the performance of processing jobs in batches instead of one job at a time.
 * Measure the impact on throughput and processing time when processing multiple jobs in a single
 * operation.
 *
 * Concurrency Settings: Experiment with different concurrency settings in Bull queues. Adjust the number
 * of worker processes or threads to observe how it affects the overall performance, especially when
 * dealing with high loads or computationally intensive jobs.
 *
 * Delayed Jobs: Evaluate the performance of handling delayed jobs. Measure the delay time, the impact
 * on overall processing, and any potential bottlenecks that may arise when dealing with a significant
 * number of delayed jobs.
 */

export enum TestParameter {
  BASIC = 'basic',
  BATCH_PROCESSING = 'batch-processing',
  CONCURRENCY_SETTINGS = 'concurrency-settings',
  DELAYED_JOBS = 'delayed-jobs',
}
