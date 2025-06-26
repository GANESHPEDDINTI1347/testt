document.addEventListener('DOMContentLoaded', () => {
    const imageData = [{
            category: 'Nature',
            thumbnail: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750355133/colorful-majestic-waterfall-national-park-forest-autumn_1_uvvcaw.jpg', // Thumbnail for the category itself
            images: [{
                    src: ' https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750355722/gregorie_neck_south_carolina.jpg_zw3kgs.jpg',
                    alt: 'Green Forest'
                },
                {
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750355719/dramatic-tree-1661526783684_krfxal.jpg',
                    alt: 'Mountain Lake'
                },
                {
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750355719/Sweet-Dreams-2022_yhad3v.jpg',
                    alt: 'Sunset Field'
                },
                {
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750355720/1-1_zuoxey.jpg',
                    alt: 'Waterfall'
                }
            ]
        },
        {
            category: 'City',
            thumbnail: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750358891/About_Atlantic_City_9e868286-a031-4770-817d-2b30984c1b11_nsx1yg.jpg',
            images: [{
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750358470/photo-1493134799591-2c9eed26201a_csh9gp.jpg',
                    alt: 'City Skyline'
                },
                {
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750358524/new-york-city-traffic_wucuwg.jpg',
                    alt: 'Busy Street'
                },
                {
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750358563/manhattan-bridge-and-manhattan-skyline-at-night-new-york-city_ni9cs8.jpg',
                    alt: 'Night Bridge'
                },
                {
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750358601/Dangerous-Alley-NYC061501_xrybhy.jpg',
                    alt: 'Urban Alley'
                }
            ]
        },
        {
            category: 'Animals',
            thumbnail: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750359154/Animals-Aglow-Card_zgkyxp.jpg',
            images: [{
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750359117/ACOM-VIV-Rabbit-Bunny-satyabrata-sm-u_kMWN-BWyU-unsplash-2-scaled_zzxs8d.jpg',
                    alt: 'Cute Rabbit'
                },
                {
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750359149/Extinctions_elephants_vtsrof.jpg',
                    alt: 'Elephants'
                },
                {
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750359250/BOTW-featured-image_Green-Parakeet-1024x663_vzqz8e.jpg',
                    alt: 'Parrot'
                },
                {
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750359317/Xena-Eurasian-Eagle-Owl-Stu-Goz-8-JD-Edit_sjwfop.jpg',
                    alt: 'owl'
                }
            ]
        },
        {
            category: 'My photos',
            thumbnail: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750359705/WhatsApp_Image_2025-06-20_at_00.30.02_602fe2dd_dyflrq.jpg',
            images: [{
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750359705/WhatsApp_Image_2025-06-20_at_00.30.02_0328446d_bxzhbr.jpg'
                },
                {
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750359702/WhatsApp_Image_2025-06-20_at_00.30.02_fec58792_sif5nl.jpg'
                },
                {
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750360010/WhatsApp_Image_2025-06-20_at_00.35.11_6ac09866_a20dmq.jpg'
                },
                {
                    src: 'https://res.cloudinary.com/dxqvkyhhc/image/upload/v1750360131/WhatsApp_Image_2025-06-20_at_00.35.11_ff063df6_bt920l.jpg'
                }
            ]
        },
    ];
    const categoryGallery = document.getElementById('category-gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const backBtn = document.querySelector('.back-btn');

    let currentCategoryImages = [];
    let currentImageIndex = 0;

    function renderCategories() {
        categoryGallery.innerHTML = '';
        imageData.forEach(categoryData => {
            const categoryItem = document.createElement('div');
            categoryItem.classList.add('category-item');
            categoryItem.dataset.category = categoryData.category;

            const img = document.createElement('img');
            img.src = categoryData.thumbnail;
            img.alt = `Category: ${categoryData.category}`;

            const title = document.createElement('div');
            title.classList.add('category-title');
            title.textContent = categoryData.category;

            categoryItem.appendChild(img);
            categoryItem.appendChild(title);

            categoryItem.addEventListener('click', () => {
                openCategoryLightbox(categoryData.category);
            });

            categoryGallery.appendChild(categoryItem);
        });
    }

    function openCategoryLightbox(categoryName) {
        // Find the selected category's images
        const selectedCategory = imageData.find(cat => cat.category === categoryName);
        if (!selectedCategory) return; // Should not happen if data is correct

        currentCategoryImages = selectedCategory.images;
        currentImageIndex = 0; // Start with the first image of the category

        updateLightboxImage();
        lightbox.style.display = 'flex'; // Show the lightbox
        categoryGallery.style.display = 'none'; // Hide category gallery
    }

    function updateLightboxImage() {
        if (currentCategoryImages.length === 0) {
            lightboxImg.src = '';
            lightboxImg.alt = '';
            lightboxCaption.textContent = 'No images in this category.';
            return;
        }
        const imgData = currentCategoryImages[currentImageIndex];
        lightboxImg.src = imgData.src;
        lightboxImg.alt = imgData.alt;
        lightboxCaption.textContent = imgData.alt;
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentCategoryImages.length;
        updateLightboxImage();
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentCategoryImages.length) % currentCategoryImages.length;
        updateLightboxImage();
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        categoryGallery.style.display = 'grid';
    }
    closeBtn.addEventListener('click', closeLightbox);
    backBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
    renderCategories();
});