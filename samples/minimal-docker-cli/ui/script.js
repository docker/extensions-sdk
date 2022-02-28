window.ddClient
  .execDockerCmd("info", "--format", '"{{json .}}"')
  .then((res) => {
    document.getElementById("size-info").innerHTML = `
    Allocated CPUs: ${res.parseJsonObject().NCPU}
    Allocated Memory: ${res.parseJsonObject().MemTotal}
`;
  });
