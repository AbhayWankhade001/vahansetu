const accordionItemHeaders = document.querySelectorAll(".accordion-button");

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    const accordionItem = accordionItemHeader.closest(".accordion-item");
    const accordionItemContent = accordionItem.querySelector(".accordion-item-content");

    accordionItemHeaders.forEach((header) => {
      const item = header.closest(".accordion-item");
      if (item !== accordionItem) {
        item.classList.remove("active");
        item.querySelector(".accordion-item-content").style.maxHeight = 0;
        item.querySelector(".accordion-arrow").classList.remove("rotate-180");
      }
    });

    accordionItem.classList.toggle("active");
    if (accordionItem.classList.contains("active")) {
      accordionItemContent.style.maxHeight = accordionItemContent.scrollHeight + "px";
      accordionItemHeader.querySelector(".accordion-arrow").classList.add("rotate-180");
    } else {
      accordionItemContent.style.maxHeight = 0;
      accordionItemHeader.querySelector(".accordion-arrow").classList.remove("rotate-180");
    }
  });
});



document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const formDataObject = {};
  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }

  console.log('Form Data:', formDataObject);
});

document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const formDataObject = {};
  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }

  console.log('Form Data:', formDataObject);

  fetch('http://localhost:8000/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formDataObject)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Response from API:', data);
    // You can handle the API response here
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle errors here
  });
});


function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  sidebar.classList.toggle('-translate-x-full');
  sidebar.classList.toggle('active'); // Add or remove 'active' class

  if (sidebar.classList.contains('-translate-x-full')) {
      overlay.style.opacity = '0'; // Adjust the desired overlay opacity when sidebar is open
  } else {
      overlay.style.opacity = '1'; // Reset overlay opacity when sidebar is closed
  }
}

document.addEventListener('mouseup', (event) => {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const sidebarButton = document.getElementById('sidebarToggle');

  // Check if the click is outside the sidebar and overlay
  if (!sidebar.contains(event.target) && !overlay.contains(event.target)) {
      if (!sidebarButton.contains(event.target)) {
        sidebar.classList.add('-translate-x-full');
          overlay.style.opacity = '0';
          overlay.style.pointerEvents = 'none';
      }
  }
});
