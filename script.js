//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener("click", () => {
    downloadAndDisplayImages(images);
});

function downloadAndDisplayImages(images) {
    const promises = images.map(image => {
        return new Promise((resolve, reject) => {
            fetch(image.url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load image's URL: ${image.url}`);
                    }
                    return response.blob();
                })
                .then(blob => {
                    const imgElement = document.createElement("img");
                    imgElement.src = URL.createObjectURL(blob);
                    imgElement.onload = () => {
                        URL.revokeObjectURL(imgElement.src);
                        output.appendChild(imgElement);
                        resolve();
                    };
                    imgElement.onerror = () => {
                        reject(new Error(`Failed to load image's URL: ${image.url}`));
                    };
                })
                .catch(error => {
                    reject(error);
                });
        });
    });

    Promise.all(promises)
        .then(() => {
            console.log("All images downloaded successfully.");
        })
        .catch(error => {
            console.error(error);
        });
}