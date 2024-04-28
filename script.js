//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

const imageLoad = (url) => {
  return `<img src='${url}' />`;
};

const all = async () => {
  try {
    const gallery = await Promise.all(images.map((val) => fetch(val.url)));
    gallery.forEach((val) => {
      output.insertAdjacentHTML("beforeend", imageLoad(val.url));
    });

    return gallery;
  } catch (err) {
    return "failed to load images";
  }
};

btn.addEventListener("click", () => {
  images.forEach((val) => {
      output.insertAdjacentHTML("beforeend", imageLoad(val.url));
    });
});