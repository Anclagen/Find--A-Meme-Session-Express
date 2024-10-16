function createTableRow(meme, isLoggedIn) {
  const tableRow = $("<tr></tr>");
  const imgCol = $("<td></td>");
  imgCol.appendTo(tableRow);
  const img = $("<img>");
  img.attr("src", meme.url);
  img.attr("alt", meme.name);
  img.addClass("meme-image");
  img.attr("width", `${meme.width * 0.2}px`);
  img.attr("height", `${meme.height * 0.2}px`);
  img.appendTo(imgCol);
  const nameCol = $("<td></td>");
  nameCol.text(meme.name);
  nameCol.appendTo(tableRow);
  if (isLoggedIn) {
    const detailsCol = $("<td></td>");
    detailsCol.appendTo(tableRow);
    const link = $("<a></a>");
    link.attr("href", `/meme/${meme.id}`);
    link.text("Details");
    link.appendTo(detailsCol);
  }
  return tableRow;
}

function updateResults(results) {
  const tableBody = $("tbody");
  tableBody.empty();
  results.forEach((meme) => {
    const tableRow = createTableRow(meme);
    tableBody.append(tableRow);
  });
}

$("#searchMemes").on("submit", async (event) => {
  event.preventDefault();
  const query = $("#searchInput").val();
  const raw = await fetch(`memes?query=${query}`, { method: "POST" });
  const results = await raw.json();
  updateResults(results.data, results.isLoggedIn);
});

$("#clearInput").on("click", async () => {
  const raw = await fetch(`memes?query=`, { method: "POST" });
  const results = await raw.json();
  updateResults(results.data, results.isLoggedIn);
});

$("#searchInput").on("input", async () => {
  if (!$("#searchInput").val()) {
    const raw = await fetch(`memes?query=`, { method: "POST" });
    const results = await raw.json();
    updateResults(results.data, results.isLoggedIn);
  }
});
