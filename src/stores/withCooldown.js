export default timeout => {
  let isInCooldown = false;
  return (target, name, descriptor) => {
    const originalMethod = descriptor.value;
    const wrappedMethod = function(...args) {
      if (isInCooldown) {
        return;
      }
      isInCooldown = true;
      originalMethod.call(this, ...args);
      setTimeout(() => (isInCooldown = false), timeout);
    };
    descriptor.value = wrappedMethod;
    return descriptor;
  };
};
