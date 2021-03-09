const BASE_URL =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export default function getPhotos(id = "0") {
  const url = BASE_URL + (id === "0" ? "" : `/${id}`);
  return fetch(url).then((response) => response.json());
}
