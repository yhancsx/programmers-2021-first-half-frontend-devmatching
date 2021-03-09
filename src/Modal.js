const CAT_IMAGE_PATH = "./assets/cat.jpeg";

export default class Modal {
  constructor(target, filePath) {
    this.target = target;
    this.filePath = filePath;
    this.render();
  }
  render() {
    const container = document.createElement("div");
    container.classList = "Modal ImageViewr";

    container.innerHTML = `
        <div class="content">
            <img src="${CAT_IMAGE_PATH /*this.filePath*/}">
        </div>
        `;
    this.target.appendChild(container);
  }
}
