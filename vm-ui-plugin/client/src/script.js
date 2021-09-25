window.ddClient
  .backend("volume-sample")
  .get("/ls")
  .then((volumes) => {
    document.body.innerHTML += `
    <ul>
      ${volumes.map((v) => `<li>${v}</li>`).join("")}
    </ul>
  `;
  });
