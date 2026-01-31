const mouseFlower = document.querySelector(".mouse-follower");

let x = 0;
let y = 0;

mouseFlower.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  console.log(clientX, clientY);

  x = clientX;
  y = clientY;

  //   mouseFlower.style.top = clientY + "px";
  //   mouseFlower.style.left = clientX + "px";
});

function faa() {
  mouseFlower.style.transform = `translate(${x}px,${y}px)`;
}

faa();
