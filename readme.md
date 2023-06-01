# Bull Library Test Analysis Documentation

## Introduction

The "bull" library is a powerful task and job queue implementation that provides a flexible and efficient solution for managing and processing asynchronous tasks. With "bull", developers can easily organize and prioritize tasks, distribute workloads across multiple queues, and leverage concurrency to improve processing efficiency.

This documentation aims to provide an analysis of the performance characteristics of the "bull" library under various test scenarios. By examining factors such as task type (computation-intensive or computation-light), queue concurrency, and scope (global or local), we can gain insights into the library's behavior and its suitability for different use cases.

_The analysis encompasses **9 queues**, each receiving a substantial load of **1500** **jobs** for the **multiple queue scenarios**, and **13500 jobs** for the **single queue scenarios**. This comprehensive testing approach ensures that the library's behavior is thoroughly evaluated under different workload scenarios, providing developers with valuable insights into its performance and scalability._

_In order to simulate real-world scenarios, **computation-intensive tasks** have an **average execution time** of around **500 milliseconds**, while **computation-light tasks** have an **average execution time** of **50 milliseconds**. This realistic execution time distribution ensures that the tests closely resemble real-world conditions, making the analysis more reliable and relevant to practical use cases._

Tasks used for this:

```tsx
// Perform a computationally intensive operation
export function simulateComputationIntensiveTask() {
  const startTime = Date.now();

  let result = 0;
  while (Date.now() - startTime < 500) {
    result += 1;
  }
}

// Perform a computationally light operation
export function simulateComputationLightTask() {
  const startTime = Date.now();

  let result = 0;
  while (Date.now() - startTime < 50) {
    result += 1;
  }
}
```

## Test Scenarios

The scenarios cover **different combinations of queue quantity, task type, and scope**, providing insights into the performance characteristics of the library under various conditions.

- Multiple Queue, Computation Intensive, Global Scoped
- Multiple Queue, Computation Intensive, Local Scoped
- Multiple Queue, Computation Light, Global Scoped
- Multiple Queue, Computation Light, Local Scoped
- Single Queue, Computation Intensive, Global Scoped
- Single Queue, Computation Intensive, Local Scoped
- Single Queue, Computation Light, Global Scoped
- Single Queue, Computation Light, Local Scoped

<aside>
💡 All the scenarios will be *tested for queue’s concurrency 1 and 4* so that we can analyze if the concurrency can improve the efficiency of the queues.

</aside>

### Multiple Queue, Computation Intensive, Global Scoped

**Description**

This scenario involves multiple queues with computation-intensive tasks in a global scope.

**Result**

| Concurrency | Average Response Time | Average Process Time | Average Throughput |
| ----------- | --------------------- | -------------------- | ------------------ |
| 1           | 6 minutes 20 seconds  | 546 milliseconds     | 219 Jobs/minute    |
| 4           | 1 minute 45 seconds   | 571 milliseconds     | 837 Jobs/minute    |

**Conclusion**

The average response time is relatively low, indicating that the tasks took **comparatively less amount of time to complete**. And, the average process time is also low, suggesting **efficient processing of individual tasks**. The throughput of 219 Jobs/minute indicates a **moderate level of task processing**.

When **concurrency is 4,** the average response time is lower, indicating **improved parallel processing**. The average process time remains relatively the same, suggesting **no improvement around the individual tasks**. The throughput of 837 Jobs/minute is 4x higher compared to the concurrency level of 1, suggesting a **significant increase in job processing capacity**.

### **Multiple Queue, Computation Intensive, Local Scoped**

**Description**

In this scenario, multiple queues with computation-intensive tasks are executed in a local scope.

**Result**

| Concurrency | Average Response Time | Average Process Time      | Average Throughput |
| ----------- | --------------------- | ------------------------- | ------------------ |
| 1           | 1 hour 31 minutes     | 8 seconds 9 milliseconds  | 15.04 Jobs/minute  |
| 4           | 2 hours 7 minutes     | 16 seconds 4 milliseconds | 26.30 Jobs/minute  |

**Conclusion**

When **concurrency is 1**, the average response time is significantly higher compared to the previous scenario, indicating a **longer processing time for tasks**. The average process time remains relatively high too, suggesting **inefficient task execution**. And, the throughput of 15.04 Jobs/minute is lower compared to the global scoped scenario, indicating **slower overall task processing**

When **concurrency is 4**, **response time and process time get worse** but the **job processing capacity increases**.

### **Multiple Queue, Computation light, Global Scoped**

**Description**

This scenario involves multiple queues with computation-light tasks executed in a global scope.

**Result**

| Concurrency | Average Response Time       | Average Process Time | Average Throughput |
| ----------- | --------------------------- | -------------------- | ------------------ |
| 1           | 1 minute 1 second           | 86 milliseconds      | 1357.8 Jobs/minute |
| 4           | 33 seconds 891 milliseconds | 129 milliseconds     | 3426.6 Jobs/minute |

**Conclusion**

When **concurrency is 1**, the average response time is relatively low, indicating **quick task completion**. The average process time is also low, suggesting **efficient processing of individual tasks**. The high throughput of 1357.8 Jobs/minute indicates a **high level of task processing efficiency**.

When **concurrency is 4**, queues become even **more efficient in response time and level of task processing** but **fall behind in the processing time of the jobs**.

### **Multiple Queue, Computation light, Local Scoped**

**Description**

In this scenario, multiple queues with computation-light tasks are executed in a local scope.

**Result**

| Concurrency | Average Response Time | Average Process Time       | Average Throughput |
| ----------- | --------------------- | -------------------------- | ------------------ |
| 1           | 9 minutes 11 seconds  | 801 milliseconds           | 150.6 Jobs/minute  |
| 4           | 9 minutes 25 seconds  | 3 seconds 209 milliseconds | 151.2 Jobs/minute  |

**Conclusion**

When **concurrency is 1**, the average response time is higher compared to the computation-intensive global scoped scenario, indicating a **longer processing time for tasks**. The average process time is higher as well, suggesting that c**omputation-light tasks take longer to process in the local scope**. The **throughput of 150.6 Jobs/minute is lower compared to the computation-intensive global scoped** scenario.

When **concurrency is 4**, there is no effect on the queue, except the processing time of the queue increases.

### **Single Queue, Computation Intensive, Global Scoped**

**Description**

This scenario involves a single queue with computation-intensive tasks executed in a global scope.

**Result**

| Concurrency | Average Response Time | Average Process Time | Average Throughput |
| ----------- | --------------------- | -------------------- | ------------------ |
| 1           | 1 hour                | 538 milliseconds     | 210.6 Jobs/minute  |
| 4           | 14 minutes 56 seconds | 531 milliseconds     | 913.8 Jobs/minute  |

**Conclusion**

When **concurrency is 1**, the average response time is significantly higher compared to the global scoped scenario, indicating a **longer processing time for tasks**. The average process time remains relatively low, suggesting **efficient task execution**. However, the throughput of 120.6 Jobs/minute is lower compared to the global scoped scenario, indicating **slower overall task processing**.

When **concurrency is 4**, the average response time is lower compared to the concurrency level of 1, indicating **improved parallel processing**. The average process time remains relatively the same, suggesting **no change in the efficiency of processing of individual tasks**. The throughput of 913.8 Jobs/minute is higher compared to the concurrency level of 1, indicating **faster overall task processing**.

### **Single Queue, Computation Intensive, Local Scoped**

**Description**

In this scenario, a single queue with computation-intensive tasks is executed in a local scope.

**Result**

| Concurrency | Average Response Time | Average Process Time     | Average Throughput |
| ----------- | --------------------- | ------------------------ | ------------------ |
| 1           | 1 hour 51 minutes     | 1 second 1 millisecond   | 120.6 Jobs/minute  |
| 4           | 1 hour 51 minutes     | 4 seconds 2 milliseconds | 121.2 Jobs/minute  |

**Conclusion**

When **concurrency is 1**, the average response time is significantly higher compared to the global scoped scenario, indicating a **longer processing time for tasks**. The average process time remains relatively low, suggesting **efficient task execution**. However, the throughput of 120.6 Jobs/minute is lower compared to the global scoped scenario, indicating **slower overall task processing**.

When **concurrency is 4**, there is no effect on the queue, except the processing time of the queue increases.

### **Single Queue, Computation light, Global Scoped**

**Description**

This scenario involves a single queue with computation-light tasks in a global scope.

**Result**

| Concurrency | Average Response Time | Average Process Time | Average Throughput |
| ----------- | --------------------- | -------------------- | ------------------ |
| 1           | 10 minutes 17 seconds | 87 milliseconds      | 1338 Jobs/minute   |
| 4           | 2 minutes 27 seconds  | 87 milliseconds      | 5434.8 Jobs/minute |

**Conclusion**

When **concurrency is 1**, the average response time is relatively low, indicating **quick task completion**. The average process time is also low, suggesting **efficient processing of individual tasks**. The high throughput of 1338 Jobs/minute indicates a **high level of task processing efficiency**.

When **concurrency is 4**, the **average response time is higher compared to the global scoped scenario with the same concurrency level**, but **concurrency brings the response time significantly down**. Concurrency here **increases the overall task processing**.

### **Single Queue, Computation light, Local Scoped**

**Description**

In this scenario, a single queue with computation-light tasks is executed in a local scope.

**Result**

| Concurrency | Average Response Time | Average Process Time  | Average Throughput |
| ----------- | --------------------- | --------------------- | ------------------ |
| 1           | 12 minutes 54 seconds | 12 minutes 54 seconds | 1089 Jobs/minute   |
| 4           | 11 minutes 15 seconds | 401 milliseconds      | 1210.8 Jobs/minute |

**Conclusion**

When **concurrency is 1**, the **average response time is higher compared to the computation-intensive global scoped scenario**, indicating a **longer processing time for tasks**. The average process time is slightly higher as well, suggesting that **computation-light tasks take longer to process in the local scope**. The **throughput of 1089 Jobs/minute is lower compared to the computation-intensive global scoped scenario**.

When **concurrency is 4**, it sightly improves the performance in all aspects.

## Analysis

The analysis of the "bull" library using different test scenarios with varying concurrency levels provides valuable insights into its performance and scalability. Here are the key findings:

1. **Single vs Multiple Queue:** The multiple queue scenarios showcased faster response times, higher throughputs, and improved task processing efficiency compared to the single queue scenarios. By leveraging parallel processing and concurrency, developers can optimize the performance of the "bull" library and effectively handle a large volume of tasks in real-world applications.
2. **Global vs. Local Scope:** The tests were conducted in both global and local scopes. In general, the global scoped scenarios exhibited better performance with faster response times and higher throughputs compared to the local scoped scenarios. This can be attributed to the potential for resource contention and overhead in managing parallel execution in local scopes.
3. **Concurrency Impact:** Increasing the concurrency level generally leads to improved performance in terms of reduced response times and increased throughput. Higher concurrency allows for parallel execution of tasks, enabling more efficient utilization of computational resources and faster task processing.
4. **Optimal Concurrency Level:** Determining the optimal concurrency level depends on the specific use case and system requirements. The tests demonstrated that higher concurrency levels generally improve performance, but there can be exceptions, such as the local scoped computation-intensive scenario. Thorough testing and analysis are essential to identify the optimal concurrency level for each scenario, ensuring the desired performance gains are achieved.

# References

- Source code: https://github.com/shreyansh-velotio/bull-load-testing-poc
- Redis cloud server: [https://app.redislabs.com/](https://app.redislabs.com/#/)
- For Monitoring: [https://taskforce.sh/](https://taskforce.sh/)

## How to test this on your own?

- Clone this repository `git clone https://github.com/shreyansh-velotio/bull-load-testing-poc.git`
- Install all the packages `npm install`
- We need a remote Redis server for this, which you can get on [Redis cloud](https://app.redislabs.com/) (they provide a free tier which is sufficient for the tests)
- Add the credentials (`REDIS_URL`, `REDIS_PORT`, `REDIS_PASSWORD`, `REDIS_USER`) of the Redis server in the [App file](https://github.com/shreyansh-velotio/bull-load-testing-poc/blob/master/src/modules/shared/constants.ts)
- Create an account on [taskforce.sh](https://taskforce.sh/) and create a connection to the Redis server by entering those credentials which you got earlier.
- Now spin the server and use these [APIs](https://documenter.getpostman.com/view/20911204/2s93m7VLfh) to test these scenarios and monitor those queues using taskforce.

_NOTE: Do flush the Redis server before performing each of the test._

```
// command for flushing, make sure you have redis-cli installed
>> redis-cli -h <host> -p <port> -a <password>
>> FLUSHALL
>> exit
```
