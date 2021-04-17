const log = (config) => (set, get, api) =>
  config(
    (args) => {
      set(args);
      console.log("STATE", get());
    },
    get,
    api
  );

export default log;
