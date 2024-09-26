document.addEventListener("DOMContentLoaded", function () {
  const sidebarElements = document.querySelectorAll(".element");
  const canvas = document.getElementById("canvas");

  let currentElement = null;

  // Drag Start
  sidebarElements.forEach(element => {
    element.addEventListener("dragstart", function (e) {
      currentElement = e.target.getAttribute("data-type");
      e.dataTransfer.effectAllowed = "move";
    });
  });

  // Allow Drop on Canvas
  canvas.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  // Drop Element on Canvas
  canvas.addEventListener("drop", function (e) {
    e.preventDefault();

    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    let newElement;

    if (currentElement === "text") {
      newElement = document.createElement("div");
      newElement.className = "draggable";
      newElement.contentEditable = "true";
      newElement.innerText = "Edit this text";
    } else if (currentElement === "image") {
      newElement = document.createElement("img");
      newElement.className = "draggable";
      newElement.src = "https://via.placeholder.com/150";
      newElement.style.width = "150px";
      newElement.style.height = "150px";
    } else if (currentElement === "container") {
      newElement = document.createElement("div");
      newElement.className = "draggable";
      newElement.style.width = "300px";
      newElement.style.height = "200px";
      newElement.style.border = "1px solid black";
    }

    if (newElement) {
      newElement.style.left = `${x}px`;
      newElement.style.top = `${y}px`;
      newElement.style.position = "absolute";
      canvas.appendChild(newElement);

      makeElementDraggable(newElement);
    }
  });

  // Function to Make Elements Draggable Inside Canvas
  function makeElementDraggable(element) {
    const resizers = document.createElement("div");
    resizers.innerHTML = `
      <div class="resizer top-left"></div>
      <div class="resizer top-right"></div>
      <div class="resizer bottom-left"></div>
      <div class="resizer bottom-right"></div>
    `;
    element.appendChild(resizers);

    const resizerElements = element.querySelectorAll(".resizer");

    // Resizing logic
    resizerElements.forEach(resizer => {
      resizer.addEventListener("mousedown", function (e) {
        const startX = e.pageX;
        const startY = e.pageY;
        const startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
        const startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);

        function resize(event) {
          element.style.width = startWidth + (event.pageX - startX) + 'px';
          element.style.height = startHeight + (event.pageY - startY) + 'px';
        }

        document.addEventListener("mousemove", resize);

        document.addEventListener("mouseup", function () {
          document.removeEventListener("mousemove", resize);
        }, { once: true });
      });
    });

    // Draggable logic
    element.addEventListener("mousedown", function (e) {
      let shiftX = e.clientX - element.getBoundingClientRect().left;
      let shiftY = e.clientY - element.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
      };
    });

    element.ondragstart = function () {
      return false;
    };
  }
});