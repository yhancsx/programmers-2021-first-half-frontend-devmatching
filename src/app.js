import Breadcrumb from "./Breadcrumb.js";
import getPhotos from "./apis.js";
import ItemList from "./Item.js";
import Modal from "./Modal.js";

const loadingComponent = document
  .querySelector("#loading")
  .content.firstElementChild.cloneNode(true);

export default class App {
  constructor(target) {
    this.paths = [["root", "0"]];
    this.target = target;

    this.datas = [];
    this.loading = false;
    this.openModal = false;
    this.getData();

    this.target.addEventListener("click", () => this.closeModal());
  }

  closeModal() {
    this.openModal = false;
    this.render();
  }
  onClickDirectory(id, name) {
    this.paths.push([name, id]);
    this.getData();
  }
  onClickPrev() {
    this.paths.pop();
    this.getData();
  }
  onClickImage(filePath) {
    this.openModal = true;
    this.filePath = filePath;
    this.render();
  }
  onClickBreadcrumb(selectedName) {
    const index = this.paths.findIndex(([name, _]) => name === selectedName);
    if (index === -1) return;
    if (index === this.paths.length - 1) return;

    this.paths = this.paths.slice(0, index + 1);
    this.getData();
  }
  async getData() {
    this.loading = true;
    this.render();

    const dirId = this.paths[this.paths.length - 1][1];
    this.datas = await getPhotos(dirId);
    this.loading = false;
    this.render();
  }
  render() {
    this.target.innerHTML = "";
    if (this.loading) {
      this.target.appendChild(loadingComponent);
      return;
    }
    new Breadcrumb(this.target, this.paths, (name) =>
      this.onClickBreadcrumb(name)
    );
    new ItemList(
      this.target,
      this.datas,
      this.paths.length > 1,
      (filePath) => this.onClickImage(filePath),
      (id, name) => this.onClickDirectory(id, name),
      () => this.onClickPrev()
    );
    if (this.openModal) new Modal(this.target, this.filePath);
  }
}
