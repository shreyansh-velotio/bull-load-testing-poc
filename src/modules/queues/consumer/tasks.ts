export function simulateComputationIntensiveTask(): number {
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i) * Math.sin(i);
  }
  return result;
}

export function simulateComputationLightTask(): number {
  return 2 + 2;
}
