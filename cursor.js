/*
*
* CURSOR.JS
* Customize user cursor
*
* [by Quentin SAR]
*
* */

class Cursor {
    constructor(x, y, color = '#FFFFFF') {
        this.x = x;
        this.y = y;
        this.color = color
        this.create();
        this.clearExistingCursor()
        this.addEventsListener()
    }

    clearExistingCursor() {
        document.body.style.cursor = "none";
    }

    create() {
        this.elem = document.createElement("div");
        this.elem.style.width = "10px";
        this.elem.style.borderRadius = "50%";
        this.elem.style.backgroundColor = this.color
        this.elem.style.position = "fixed";
        this.elem.style.height = "10px";
        this.elem.style.pointerEvents = "none";
        this.elemHeight = 10;

        this.border = document.createElement("div");
        this.border.style.width = "20px";
        this.border.style.borderRadius = "50%";
        this.border.style.border = `2px solid ${this.color}`
        this.border.style.position = "fixed";
        this.border.style.height = "20px";
        this.border.style.pointerEvents = "none";
        
        document.body.appendChild(this.elem);
        document.body.appendChild(this.border);

        this.elemInitial = this.elem.offsetHeight;
        this.borderInitial = this.border.offsetHeight;
    }

    updatePosition() {
        let elemHeight = this.elemHeight;
        this.elem.style.left = this.x + "px";
        this.elem.style.top = this.y + "px";
        this.border.style.left = this.x - (this.border.offsetHeight / 2 - (elemHeight/2)) + "px";
        this.border.style.top = this.y - (this.border.offsetHeight / 2 - (elemHeight/2)) + "px";
    }

    extend() {
        this.elemHeight = this.elem.offsetHeight;
        this.borderHeight = this.border.offsetHeight;
        clearInterval(this.action)
        this.action = setInterval(() => {
            if (this.elemHeight > 5 || this.borderHeight < 60) {
                if (this.elemHeight > 5 ) this.elemHeight--;
                if (this.borderHeight < 60) this.borderHeight++;
                this.updateElemStyle()
            } else {
                clearInterval(this.action)
            }
        }, 10);
    }

    stopExtend() {
        this.elemHeight = this.elem.offsetHeight;
        this.borderHeight = this.border.offsetHeight;
        clearInterval(this.action);
        this.action = setInterval(() => {
            if (this.elemHeight < this.elemInitial || this.borderHeight > this.borderInitial) {
                if (this.elemHeight < this.elemInitial) this.elemHeight++;
                if (this.borderHeight > this.borderInitial) this.borderHeight--;
                this.updateElemStyle()
            } else {
                clearInterval(this.action);
            }
        }, 10);
    }

    updateElemStyle() {
        this.elem.style.height = this.elemHeight + "px";
        this.elem.style.width = this.elemHeight + "px";
        this.border.style.height = this.borderHeight + "px";
        this.border.style.width = this.borderHeight + "px";
        this.elem.style.left = this.x + (5 - this.elemHeight / 2) + "px";
        this.elem.style.top = this.y + (5 - this.elemHeight / 2) + "px";
        this.border.style.left = this.x - (this.border.offsetHeight / 2 - 5) + "px";
        this.border.style.top = this.y - (this.border.offsetHeight / 2 - 5) + "px";
    }

    setColor(color) {
        this.color = color
        this.elem.style.backgroundColor = this.color
        this.border.style.border = `2px solid ${this.color}`
    }

    addEventsListener() {
        document.addEventListener("mousemove", (event) => {
            this.x = event.clientX;
            this.y = event.clientY;
            cursor.updatePosition();
        });
        document.addEventListener("mousedown", (event) => cursor.extend());
        document.addEventListener("mousedown", (event) => cursor.extend());
        document.addEventListener("mouseup", (event) => cursor.stopExtend());
    }
}
