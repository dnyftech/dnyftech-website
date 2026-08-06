async function load(id, file) {
  const html = await fetch(file).then(r => r.text());
  document.getElementById(id).innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async () => {

  await load("header","components/header.html");
  await load("hero","components/hero.html");
  await load("services","components/services.html");
  await load("products","components/products.html");
  await load("about","components/about.html");
  await load("contact","components/contact.html");
  await load("footer","components/footer.html");

});
