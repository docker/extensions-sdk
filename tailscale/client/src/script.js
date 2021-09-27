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

var jsonStatus = "";

function updatetStatus() {
  window.ddClient
    .backend("tailscale")
    .execInContainer("tailscale_service", `/app/tailscale status -json`)
    .then((value) => {
      console.log(value.stdout);
      jsonStatus = JSON.parse(value.stdout);
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("status").innerText = "Logged out";
    });
}

var containers = "";

function listContainers() {
  window.ddClient
    .listContainers()
    .then((value) => {
      containers = value;
      createTable();
    })
    .catch((err) => {
      console.log(err);
    });
}

function createTable() {
  var body = document.body,
    tbl = document.createElement("table");
  tbl.style.width = "100%";

  const headers = ["Container", "Published ports", "Magic DNS", "Tailscale IP"];

  var headerRow = tbl.insertRow();
  for (var i = 0; i < headers.length; i++) {
    var td = headerRow.insertCell();
    td.innerText = headers[i];
  }

  for (var i = 0; i < containers.length; i++) {
    var tr = tbl.insertRow();

    var td = tr.insertCell();
    td.innerText = containers[i].Names[0].substring(1);

    td = tr.insertCell();
    for (var j = 0; j < containers[i].Ports.length; j++) {
      td.innerText = containers[i].Ports[j].PublicPort + ",";
    }

    var td = tr.insertCell();
    for (var j = 0; j < containers[i].Ports.length; j++) {
      var url =
        "http://" +
        jsonStatus.Self.DNSName.slice(0, -1) +
        ":" +
        containers[i].Ports[j].PublicPort;

      td.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
    }

    var td = tr.insertCell();
    td.innerText = jsonStatus.Self.TailscaleIPs[0]; //ipv4
    td.innerText = td.innerText + "\n" + jsonStatus.Self.TailscaleIPs[1]; //ipv6
  }
  body.appendChild(tbl);
}
