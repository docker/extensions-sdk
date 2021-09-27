function connectTailscale() {
  let token = document.getElementById("text").value;
  console.log(`connecting with token ${token}`);
  const res = window.ddClient
    .backend("tailscale")
    .execInContainer(
      "tailscale_service",
      `/app/tailscale up --authkey ${token}`
    )
    .then(() => updatetStatus());
}

function disconnectTailscale() {
  console.log(`disconnecting`);
  window.ddClient
    .backend("tailscale")
    .execInContainer("tailscale_service", `/app/tailscale down`)
    .then(() => updatetStatus());
}

function logoutTailscale() {
  console.log(`disconnecting`);
  window.ddClient
    .backend("tailscale")
    .execInContainer("tailscale_service", `/app/tailscale logout`)
    .then(() => updatetStatus());
}

function updatetStatus() {
  window.ddClient
    .backend("tailscale")
    .execInContainer("tailscale_service", `/app/tailscale status`)
    .then((value) => {
      document.getElementById("status").innerText = value.stdout;
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("status").innerText = "Logged out";
    });
}
