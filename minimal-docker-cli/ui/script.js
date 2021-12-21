window.ddClient
  .execDockerCmd("system", "df", "--format", "'{{ json . }}'")
  .then((res) => {
    document.getElementById("size-info").innerHTML = `
  <table>
    <tr> <th>Type</th> <th>Active</th> <th>Total</th> <th>Size</th> <th>Reclaimable</th> </tr>
    ${res
      .parseJsonLines()
      .map(
        (cat) =>
          `<tr> <td>${cat.Type}</td> <td>${cat.Active}</td> <td>${cat.TotalCount}</td> <td>${cat.Size}</td> <td>${cat.Reclaimable}</td> </tr>`
      )
      .join("")}
  </table>
`;
  });
