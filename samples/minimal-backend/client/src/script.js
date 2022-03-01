function runScript() {
  const inputText = document.getElementById("input").value;

  window.ddClient.extension.vm.cli
    .exec('./hello.sh', [inputText])
    .then((value) => {
      console.log(value);
      document.getElementById("textarea").innerHTML = value.stdout;
    });
}
