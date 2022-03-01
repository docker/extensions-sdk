window.ddClient.extension.vm.service.get("/ls").then((volumes) => {
  document.body.innerHTML += `
    <ul>
      ${volumes.map((v) => `<li>${v}</li>`).join("")}
    </ul>
  `;
});
