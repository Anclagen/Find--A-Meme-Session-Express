function createTableRow(meme, isLoggedIn = false, hasVisited = false) {
  const tableRow = $("<tr></tr>");
  if (hasVisited) {
    tableRow.addClass("visited");
  }
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
    const btn = $("<button></button>");
    btn.addClass("p-1 px-2 btn btn-info text-white shadow details-btn");
    btn.attr("data-id", meme.id);
    btn.html(`Details <i class="bi bi-arrow-right-circle-fill"></i>`);
    btn.appendTo(detailsCol);
  }
  return tableRow;
}

function updateResults(results, isLoggedIn, visited) {
  const tableBody = $("tbody");
  tableBody.empty();
  results.forEach((meme) => {
    const hasVisited = visited.includes(meme.id);
    const tableRow = createTableRow(meme, isLoggedIn, hasVisited);
    tableBody.append(tableRow);
  });
}

$("#searchMemes").on("submit", async (event) => {
  event.preventDefault();
  const query = $("#searchInput").val();
  const raw = await fetch(`memes?query=${query}`, { method: "POST" });
  const results = await raw.json();
  updateResults(results.data, results.isLoggedIn, results.visited);
  $(".details-btn").on("click", handler);
});

$("#clearInput").on("click", async () => {
  const raw = await fetch(`memes?query=`, { method: "POST" });
  const results = await raw.json();
  updateResults(results.data, results.isLoggedIn, results.visited);
  $(".details-btn").on("click", handler);
});

$("#searchInput").on("input", async () => {
  if (!$("#searchInput").val()) {
    const raw = await fetch(`memes?query=`, { method: "POST" });
    const results = await raw.json();
    updateResults(results.data, results.isLoggedIn, results.visited);
    $(".details-btn").on("click", handler);
  }
});
