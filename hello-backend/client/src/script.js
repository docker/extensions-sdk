function runScript() {
  const inputText = document.getElementById("input").value;

  window.ddClient.backend
    .execInVMExtension(`./hello.sh ${inputText}`)
    .then((value) => {
      console.log(value);
      document.getElementById("textarea").innerHTML = value.stdout;
    });
}
