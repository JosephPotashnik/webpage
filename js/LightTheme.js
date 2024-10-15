const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) 
    {
        localStorage.setItem('theme', 'light');
    }
    else
    {
        localStorage.removeItem('theme');
    }

    setTheme();
});

function setTheme()
{
    // Load the saved theme (if any) from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) 
    {
        body.classList.add('light-theme');
    }
    else
    {
        //note: 'light-theme' need not be currently active. In such a case, nothing will happen.
        body.classList.remove('light-theme');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme();
});

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible')
    {
        setTheme();
    }
});


