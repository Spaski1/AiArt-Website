
// Script for top Carousel
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    currentSlide = (index + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function changeSlide(step) {
    showSlide(currentSlide + step);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
});

// Script for Most Popular Creator Pics

function scrollGallery(distance) {
  const container = document.getElementById('mz-gallery');
  if (container) {
    container.scrollBy({
      left: distance,
      behavior: 'smooth'
    });
  } else {
    console.error('Element with ID "mz-gallery" not found.');
  }
}

function scrollR() {
  scrollGallery(500);
}

function scrollL() {
  scrollGallery(-300);
}



document.addEventListener("DOMContentLoaded", function() {
  const gallery = document.getElementById("mz-gallery");

  fetch('../images.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(images => {
          const firstTwentyImages = images.slice(0, 30);

          firstTwentyImages.forEach(image => {
              const figure = document.createElement("figure");

              const img = document.createElement("img");
              img.src = image.imageUrl;
              img.width = 700;
              img.height = 700;

              img.addEventListener("click", function() {
                window.location.href = "../templates/categoryPage.html";
            });

              figure.appendChild(img);

              const figcaption = document.createElement("figcaption");
              figcaption.textContent = image.description;
              figure.appendChild(figcaption);

              gallery.appendChild(figure);
          });
      })
      .catch(error => {
          console.error('Error fetching images:', error);
      });
});

// Script for Rotating Cube

document.addEventListener("DOMContentLoaded", function() {
  const category = "Art & Designs";
  const cubeContainer = document.querySelector('.cube-container');
  const photoCube = cubeContainer.querySelector('.photo-cube');

  fetch('../images.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(images => {

          const categoryImages = images.filter(image => image.category === category);

          for (let i = categoryImages.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [categoryImages[i], categoryImages[j]] = [categoryImages[j], categoryImages[i]];
          }

          const selectedImages = categoryImages.slice(0, 3);

          photoCube.querySelectorAll('img').forEach(img => img.remove());

          if (selectedImages.length >= 3) {
              selectedImages.forEach((image, index) => {
                  const img = document.createElement('img');
                  img.src = image.imageUrl;
                  img.className = ['front', 'left', 'right'][index];
                  photoCube.appendChild(img);
              });
          } else {
              console.error('Not enough images in the specified category.');
          }
      })
      .catch(error => {
          console.error('Error fetching images:', error);
      });
});


document.addEventListener("DOMContentLoaded", function() {
  const category = "Portraits";
  const cubeContainer = document.querySelector('.cubeContainer2');
  const photoCube = cubeContainer.querySelector('.photo-cube');

  fetch('../images.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(images => {

          const categoryImages = images.filter(image => image.category === category);

          for (let i = categoryImages.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [categoryImages[i], categoryImages[j]] = [categoryImages[j], categoryImages[i]];
          }

          const selectedImages = categoryImages.slice(0, 3);

          photoCube.querySelectorAll('img').forEach(img => img.remove());

          if (selectedImages.length >= 3) {
              selectedImages.forEach((image, index) => {
                  const img = document.createElement('img');
                  img.src = image.imageUrl;
                  img.className = ['front', 'left', 'right'][index];
                  photoCube.appendChild(img);
              });
          } else {
              console.error('Not enough images in the specified category.');
          }
      })
      .catch(error => {
          console.error('Error fetching images:', error);
      });
});


document.addEventListener("DOMContentLoaded", function() {
  const category = "Landscapes";
  const cubeContainer = document.querySelector('.cubeContainer3');
  const photoCube = cubeContainer.querySelector('.photo-cube');

  fetch('../images.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(images => {
          const categoryImages = images.filter(image => image.category === category);

          for (let i = categoryImages.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [categoryImages[i], categoryImages[j]] = [categoryImages[j], categoryImages[i]];
          }

          const selectedImages = categoryImages.slice(0, 3);

          photoCube.querySelectorAll('img').forEach(img => img.remove());

          if (selectedImages.length >= 3) {
              selectedImages.forEach((image, index) => {
                  const img = document.createElement('img');
                  img.src = image.imageUrl;
                  img.className = ['front', 'left', 'right'][index];
                  photoCube.appendChild(img);
              });
          } else {
              console.error('Not enough images in the specified category.');
          }
      })
      .catch(error => {
          console.error('Error fetching images:', error);
      });
});


