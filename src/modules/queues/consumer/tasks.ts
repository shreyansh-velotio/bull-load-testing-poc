export function simulateComputationIntensiveTask() {
  const startTime = Date.now();

  let result = 0;
  while (Date.now() - startTime < 2000) {
    // Perform a computationally intensive operation
    result += 1;
  }
}

export function simulateComputationLightTask() {
  const startTime = Date.now();

  let result = 0;
  while (Date.now() - startTime < 500) {
    // Perform a computationally light operation
    result += 1;
  }
}
