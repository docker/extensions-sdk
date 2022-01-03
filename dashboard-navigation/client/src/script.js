function navigateToRoute() {
  const route = document.getElementById("route").value;
  console.log(`Navigating to route ${route}`);
  window.ddClient.navigateToRoute(`${route}`);
}

function navigateToImage() {
  const input = document.getElementById("image").value;
  const s = input.split("-");
  const id = s[0];
  const tag = s[1];

  console.log(`Navigating to image with id ${id} and tag ${tag}`);
  window.ddClient.navigateToImage(`${id}`, `${tag}`);
}

function navigateToImages() {
  console.log(`Navigating to images`);
  window.ddClient.navigateToImages();
}

function navigateToContainer() {
  const container = document.getElementById("container").value;
  console.log(`Navigating to container ${container}`);
  window.ddClient.navigateToContainer(`${container}`);
}

function navigateToContainers() {
  console.log(`Navigating to containers`);
  window.ddClient.navigateToContainers();
}

function navigateToContainerLogs() {
  const container = document.getElementById("container").value;
  console.log(`Navigating to container logs ${container}`);
  window.ddClient.navigateToContainerLogs(`${container}`);
}

function navigateToContainerInspect() {
  const container = document.getElementById("container").value;
  console.log(`Navigating to container inspect ${container}`);
  window.ddClient.navigateToContainerInspect(`${container}`);
}

function navigateToContainerStats() {
  const container = document.getElementById("container").value;
  console.log(`Navigating to container stats ${container}`);
  window.ddClient.navigateToContainerStats(`${container}`);
}

function navigateToVolume() {
  const volume = document.getElementById("volume").value;
  console.log(`Navigating to volume ${volume}`);
  window.ddClient.navigateToVolume(`${volume}`);
}

function navigateToVolumes() {
  console.log(`Navigating to volumes`);
  window.ddClient.navigateToVolumes();
}

function navigateToDevEnvironments() {
  console.log(`Navigating to Dev Environments`);
  window.ddClient.navigateToDevEnvironments();
}
