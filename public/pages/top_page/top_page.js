// (function () {
//   console.log("init");
//   var next_button = document.getElementById("next_page_button");
//   var back_button = document.getElementById("back_page_button");
//   clickListener(next_button);
//   clickListener(back_button);

//   function clickListener(button) {
//     console.log("add listen");
//     button.addEventListener("click", turnCard);
//   }
// })();

function turnCard() {
  console.log("flip");
  var card = document.getElementById("base_area");
  card.classList.toggle("flipped");
}
