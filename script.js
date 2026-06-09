function toggleMore() {
  var moreText = document.getElementById("more");
  var btn = document.getElementById("btn");
  var dots = document.getElementById("dots")

   if (moreText.style.display === "none") {
    moreText.style.display = "inline";
    dots.style.display ="none"
    btn.innerHTML = "Read Less";
  } else {
    moreText.style.display = "none";
    dots.style.display = "inline"
    btn.innerHTML = "Read More";
  }
}
function more_img() {
  var imgs = document.getElementById("more-img");
  var btn = document.getElementById("btn-img");

  imgs.classList.toggle("show");

  if (imgs.classList.contains("show")) {
    btn.innerHTML = "View Less";
  } else {
    btn.innerHTML = "View More";
  }
}