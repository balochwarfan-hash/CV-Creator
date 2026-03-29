document.getElementById('cv-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Capture Form Data
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const skills = document.getElementById('skills').value;
    
    // 2. Handle Profile Picture
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

    // 3. Populate Text Fields
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

    // 4. Populate Skills List
    const skillsList = document.getElementById('display-skills');
    skillsList.innerHTML = ''; 
    skills.split(',').forEach(item => {
        if (item.trim() !== "") {
            const li = document.createElement('li');
            li.innerText = item.trim();
            skillsList.appendChild(li);
        }
    });

    // 5. Show CV Output
    document.getElementById('cv-output').classList.remove('hidden');
    window.scrollTo({ top: document.getElementById('cv-output').offsetTop, behavior: 'smooth' });
});

// 6. Fixed PDF Download (No Blank Page)
document.getElementById('download-pdf').addEventListener('click', function () {
    const element = document.getElementById('print-area');
    
    // Tiny delay to ensure images/text are fully painted by the browser
    setTimeout(() => {
        const opt = {
            margin:       [0.5, 0.5],
            filename:     'My_Professional_CV.pdf',
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { 
                scale: 2, 
                useCORS: true,
                letterRendering: true
            },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    }, 500); 
});
