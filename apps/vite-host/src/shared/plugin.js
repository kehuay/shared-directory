export default function () {
  return {
    name: 'delegate-modules-plugin',
    loadEntry({ remoteInfo }) {
      console.log("host", remoteInfo)
      if (remoteInfo.name === 'shared') {
        return {
          init() { },
          async get(path) {
            console.log("host", path)
            path = path.replace('./', '');
            const result = await import(`./${path}`);
            return () => ({
              ...result,
              __esModule: true
            });
          },
        };
      }
    },
  };
}
