document.getElementById('cv-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Capture Form Inputs
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const skills = document.getElementById('skills').value;
    
    // 2. Simple Form Validation
    if (!email.includes('@')) {
        alert("Please enter a valid email address.");
        return;
    }

    // 3. Handle Profile Picture Upload (FileReader API)
    const fileInput = document.getElementById('profilePic');
    const displayPic = document.getElementById('display-pic');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            displayPic.src = event.target.result;
            displayPic.classList.remove('hidden');
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        displayPic.classList.add('hidden');
    }

    // 4. Map Data to CV Preview
    document.getElementById('display-name').innerText = fullName;
    document.getElementById('display-objective').innerText = document.getElementById('objective').value;
    document.getElementById('display-email').innerText = email;
    document.getElementById('display-contact').innerText = document.getElementById('contact').value;
    document.getElementById('display-address').innerText = document.getElementById('address').value;
    
    document.getElementById('display-father').innerText = document.getElementById('fatherName').value || "N/A";
    document.getElementById('display-subject').innerText = document.getElementById('subject').value;
    document.getElementById('display-spec').innerText = document.getElementById('specialization').value;
    document.getElementById('display-qual').innerText = document.getElementById('qualification').value;
    document.getElementById('display-class').innerText = document.getElementById('classSemester').value;
    document.getElementById('display-inst').innerText = document.getElementById('institution').value;

    // 5. Handle Skills List (Convert comma-separated to <li>)
    const skillsList = document.getElementById('display-skills');
    skillsList.innerHTML = ''; // Clear previous entries
    skills.split(',').forEach(item => {
        if (item.trim() !== "") {
            const li = document.createElement('li');
            li.innerText = item.trim();
            skillsList.appendChild(li);
        }
    });

    // 6. Reveal Output Section and Scroll
    document.getElementById('cv-output').classList.remove('hidden');
    window.scrollTo({
        top: document.getElementById('cv-output').offsetTop,
        behavior: 'smooth'
    });
});

// 7. PDF Download Functionality
document.getElementById('download-pdf').addEventListener('click', function () {
    const element = document.getElementById('print-area');
    const opt = {
        margin:       0.2,
        filename:     'Professional_CV.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Run the html2pdf library
    html2pdf().set(opt).from(element).save();
});