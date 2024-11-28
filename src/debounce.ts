function debounce(func:Function, delay:number) {
  let timeout:ReturnType<typeof setTimeout>;

  return function (...args:any) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      return func(...args);
    }, delay);
  };
}
export default debounce