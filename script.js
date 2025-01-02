// Smooth scroll for anchor links (if needed later)
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

document.querySelector('.dropbtn').addEventListener('click', () => {
    const dropdown = document.querySelector('.dropdown-content');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
    if (!e.target.matches('.dropbtn')) {
        document.querySelectorAll('.dropdown-content').forEach((dropdown) => {
            dropdown.style.display = 'none';
        });
    }
});
