export default class Breadcrumb {
  constructor(target, paths, onClickBreadcrumb) {
    this.target = target;
    this.paths = paths;
    this.onClickBreadcrumb = onClickBreadcrumb;
    this.render();
  }

  onClick(e) {
    const { textContent: name } = e.target;
    this.onClickBreadcrumb(name);
  }

  render() {
    const container = document.createElement("nav");
    container.classList.add("Breadcrumb");

    const breadcrumb = this.paths
      .map(
        ([pathName, pathId]) => `<div data-pathId=${pathId}>${pathName}</div>`
      )
      .join("");

    container.innerHTML = breadcrumb;

    container.addEventListener("click", (e) => this.onClick(e));
    this.target.appendChild(container);
  }
}
