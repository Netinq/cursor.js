class Cursor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.create();
  }

  create() {
    this.elem = document.createElement("div");
    this.elem.style.width = "10px";
    this.elem.style.borderRadius = "50%";
    this.elem.style.backgroundColor = "#fff"
    this.elem.style.position = "fixed";
    this.elem.style.height = "10px";
    this.elem.style.pointerEvents = "none";
    this.elemHeight = 10;
    this.border = document.createElement("div");
    this.border.style.width = "20px";
    this.border.style.borderRadius = "50%";
    this.border.style.border = "2px solid #fff"
    this.border.style.position = "fixed";
    this.border.style.height = "20px";
    this.border.style.pointerEvents = "none";
    document.body.appendChild(this.elem);
    document.body.appendChild(this.border);

    this.elemInitial = this.elem.offsetHeight;
    this.borderInitial = this.border.offsetHeight;
  }

  update(x, y) {
    let elemHeight = this.elemHeight;
    this.elem.style.left = x + "px";
    this.elem.style.top = y + "px";
    this.border.style.left = x - (this.border.offsetHeight / 2 - (elemHeight/2)) + "px";
    this.border.style.top = y - (this.border.offsetHeight / 2 - (elemHeight/2)) + "px";
  }

  bigger() {
    this.elemHeight = this.elem.offsetHeight;
    this.borderHeight = this.border.offsetHeight;
    clearInterval(this.action)
    this.action = setInterval(() => {
      if (this.elemHeight > 5 || this.borderHeight < 60) {
        if (this.elemHeight > 5 ) this.elemHeight--;
        if (this.borderHeight < 60) this.borderHeight++;
        this.elem.style.height = this.elemHeight + "px";
        this.elem.style.width = this.elemHeight + "px";
        this.border.style.height = this.borderHeight + "px";
        this.border.style.width = this.borderHeight + "px";
        this.elem.style.left = x + (5 - (this.elemHeight/2)) + "px";
        this.elem.style.top = y + (5 - this.elemHeight / 2) + "px";
        this.border.style.left = x - (this.border.offsetHeight / 2 - 5) + "px";
        this.border.style.top = y - (this.border.offsetHeight / 2 - 5) + "px";
      } else {
        clearInterval(this.action)
      }
    }, 10);
  }

  biggerStop() {
    this.elemHeight = this.elem.offsetHeight;
    this.borderHeight = this.border.offsetHeight;
    clearInterval(this.action);
    this.action = setInterval(() => {
      if (this.elemHeight < this.elemInitial || this.borderHeight > this.borderInitial) {
        if (this.elemHeight < this.elemInitial) this.elemHeight++;
        if (this.borderHeight > this.borderInitial) this.borderHeight--;
        this.elem.style.height = this.elemHeight + "px";
        this.elem.style.width = this.elemHeight + "px";
        this.border.style.height = this.borderHeight + "px";
        this.border.style.width = this.borderHeight + "px";
        this.elem.style.left = x + (5 - this.elemHeight / 2) + "px";
        this.elem.style.top = y + (5 - this.elemHeight / 2) + "px";
        this.border.style.left = x - (this.border.offsetHeight / 2 - 5) + "px";
        this.border.style.top = y - (this.border.offsetHeight / 2 - 5) + "px";
      } else {
        clearInterval(this.action);
      }
    }, 10);
  }
}

let x = 0;
let y = 0;

document.body.style.cursor = "none";
const cursor = new Cursor(x, y);

document.addEventListener("mousemove", (event) => {
  x = event.clientX;
  y = event.clientY;
  cursor.update(x, y);
});

document.addEventListener("mousedown", (event) => {
  cursor.bigger();
});
document.addEventListener("mouseup", (event) => {
  cursor.biggerStop();
});