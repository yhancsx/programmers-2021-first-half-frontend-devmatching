export default class ItemList {
  constructor(
    target,
    datas,
    shouldHavePrev,
    onClickImage,
    onClickDirectory,
    onClickPrev
  ) {
    this.target = target;
    this.datas = datas;
    this.shouldHavePrev = shouldHavePrev;
    this.onClickImage = onClickImage;
    this.onClickDirectory = onClickDirectory;
    this.onClickPrev = onClickPrev;
    this.render();
  }

  onClickItem(e) {
    const { target } = e;
    if (target.tagName !== "IMG") return;
    e.stopPropagation();

    const { dirId, filePath, name } = e.target.dataset;

    if (dirId) this.onClickDirectory(dirId, name);
    else if (filePath) this.onClickImage(filePath);
    else this.onClickPrev();
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("Nodes");

    const itemList = [];
    if (this.shouldHavePrev) itemList.push(prevItem);

    container.innerHTML = itemList
      .concat(
        this.datas.map(
          ({ id, name, type, filePath }) => `
          <div class="Node">
            ${
              type === "DIRECTORY"
                ? directoryItem(id, name)
                : imageItem(filePath, name)
            }
          </div>`
        )
      )
      .join("");
    container.addEventListener("click", (e) => this.onClickItem(e));
    this.target.appendChild(container);
  }
}

const prevItem = `
<div class="Node">
    <img src="./assets/prev.png" />
</div>
`;
const directoryItem = (id, name) => `
    <img src="./assets/directory.png" data-dir-id=${id} data-name=${name} />
    <div>${name}</div>
`;
const imageItem = (filePath, name) => `
    <img src="./assets/file.png" data-file-path=${filePath}/>
    <div>${name}</div>
`;
