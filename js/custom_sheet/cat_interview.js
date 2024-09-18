const cat_interview = {
    "init": init
}

function init(){
    document.getElementById('choice').addEventListener('change', ()=>{
        const val = document.getElementById('choice').selectedOptions[0].value;
        if (isValidUrl(val)) {
            window.location.href = val;
       } else {
           console.error('Invalid URL:', val);
       }
   });
}

function isValidUrl(url) {
    try {
        const parsedUrl = new URL(url);
        // Add your trusted domains here
        const trustedDomains = ['example.com', 'another-trusted-domain.com'];
        return trustedDomains.includes(parsedUrl.hostname);
    } catch (e) {
        return false;
    }
}

export default cat_interview;