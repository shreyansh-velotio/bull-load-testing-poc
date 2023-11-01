// Perform a computationally intensive operation
export function simulateComputationIntensiveTask() {
  const startTime = Date.now();

  let result = 0;
  while (Date.now() - startTime < 2000) {
    result += 1;
  }
}

// Perform a computationally light operation
export function simulateComputationLightTask() {
  const startTime = Date.now();

  let result = 0;
  while (Date.now() - startTime < 500) {
    result += 1;
  }
}
