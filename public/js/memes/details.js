const handler = async function () {
  const id = this.dataset.id;
  const response = await fetch(`meme/${id}`, { method: "POST" });
  if (response.ok) {
    window.location.href = `/meme/${id}`;
  } else {
    const data = response.json();
    alert(data.message);
  }
};

$(".details-btn").on("click", handler);
