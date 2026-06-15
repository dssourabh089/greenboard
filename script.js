/*document.addEventListener("DOMContentLoaded", () => {

    // --- YOUR PERSONAL GOOGLE SHEETS DEPLOYMENT URL COMPONENT ---
    const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzLDvO2i8Yc7sgs7aZiepeJ-R1LB4Z7W8q0Xs0JXLjAYpAsy01uTWuiZr1L1NOoWiTH/exec";

    // Grab form nodes
    const dataForm = document.getElementById('eco-sheets-form');
    const submitButton = document.getElementById('submit-btn');
    const statusSending = document.getElementById('status-sending');
    const statusSuccess = document.getElementById('status-success');

    // Handle asynchronous database submit event
    dataForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop native HTML navigation routine

        // Transition UI elements to working/loading state
        submitButton.disabled = true;
        submitButton.style.opacity = "0.6";
        statusSending.classList.remove('hidden');
        statusSuccess.classList.add('hidden');

        // Capture user input context explicitly
        const payload = {
            name: document.getElementById('form-name').value,
            email: document.getElementById('form-email').value,
            message: document.getElementById('form-message').value
        };
        

        // Forward structural layout metrics payload downstream to Google Web Engine
        fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors', // Bypasses cross-origin sandboxing limits safely
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(() => {
            // Success Routine
            statusSending.classList.add('hidden');
            statusSuccess.classList.remove('hidden');
            dataForm.reset(); // Clear all form inputs
            
            // Re-enable button state
            submitButton.disabled = false;
            submitButton.style.opacity = "1";
        })
        .catch(error => {
            // Exception Error Handle
            console.error('Data sync interface breakdown details:', error);
            statusSending.classList.add('hidden');
            submitButton.disabled = false;
            submitButton.style.opacity = "1";
            alert("Network routing error encountered. Sheet connection refused.");
        });
    });


    // --- Animated Impact Counter Optimization Engine ---
    const numbers = document.querySelectorAll('.stat-number');
    const durationSpeed = 150;

    const runCounterCycle = () => {
        numbers.forEach(numElement => {
            const computeProgression = () => {
                const upperLimit = parseInt(numElement.getAttribute('data-target'));
                const currentVal = parseInt(numElement.innerText);
                const stepIncrement = Math.ceil(upperLimit / durationSpeed);

                if (currentVal < upperLimit) {
                    numElement.innerText = currentVal + stepIncrement;
                    setTimeout(computeProgression, 1);
                } else {
                    numElement.innerText = upperLimit.toLocaleString() + "+";
                }
            };
            computeProgression();
        });
    };

    // Trigger statistics ticking dynamically upon scrolling into position
    const visualObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entryItem => {
            if (entryItem.isIntersecting) {
                runCounterCycle();
                observerInstance.unobserve(entryItem.target);
            }
        });
    }, { threshold: 0.6 });

    const targetStatsBar = document.getElementById('stats');
    if (targetStatsBar) visualObserver.observe(targetStatsBar);
});
*/
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ১. আপনার গুগল শিট কানেকশন (Google Sheets Script)
    // ==========================================
    const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbw7c3eDTXJiDyhugAeq2-tFnej3Y29IeTKiLtSkqvH1vuYLE9VwTjA3YQQQn38V8-JePA/exec";

    const dataForm = document.getElementById('eco-sheets-form');
    const submitButton = document.getElementById('submit-btn');
    const statusSending = document.getElementById('status-sending');
    const statusSuccess = document.getElementById('status-success');

    if (dataForm && submitButton) {
        dataForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            submitButton.disabled = true;
            submitButton.style.opacity = "0.6";
            if (statusSending) statusSending.classList.remove('hidden');
            if (statusSuccess) statusSuccess.classList.add('hidden');

            const payload = {
                name: document.getElementById('form-name').value,
                email: document.getElementById('form-email').value,
                message: document.getElementById('form-message').value
            };

            fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(() => {
                if (statusSending) statusSending.classList.add('hidden');
                if (statusSuccess) statusSuccess.classList.remove('hidden');
                dataForm.reset(); 
                
                submitButton.disabled = false;
                submitButton.style.opacity = "1";
            })
            .catch(error => {
                console.error('Sheet connection error:', error);
                if (statusSending) statusSending.classList.add('hidden');
                submitButton.disabled = false;
                submitButton.style.opacity = "1";
                alert("Network routing error encountered. Sheet connection refused.");
            });
        });
    }


    // ==========================================
    // ২. লাইভ কাউন্টার অ্যানিমেশন (Animated Counters)
    // ==========================================
    const numbers = document.querySelectorAll('.stat-number');
    const durationSpeed = 150;

    const runCounterCycle = () => {
        numbers.forEach(numElement => {
            const computeProgression = () => {
                const upperLimit = parseInt(numElement.getAttribute('data-target'));
                const currentVal = parseInt(numElement.innerText);
                const stepIncrement = Math.ceil(upperLimit / durationSpeed);

                if (currentVal < upperLimit) {
                    numElement.innerText = currentVal + stepIncrement;
                    setTimeout(computeProgression, 1);
                } else {
                    numElement.innerText = upperLimit.toLocaleString() + "+";
                }
            };
            computeProgression();
        });
    };

    const visualObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entryItem => {
            if (entryItem.isIntersecting) {
                runCounterCycle();
                observerInstance.unobserve(entryItem.target);
            }
        });
    }, { threshold: 0.6 });

    const targetStatsBar = document.getElementById('stats');
    if (targetStatsBar) visualObserver.observe(targetStatsBar);


    // ==========================================
    // ৩. ডোনেশন ও UPI QR Code পেমেন্ট সিস্টেম
    // ==========================================
    const donateBtn = document.getElementById('donate-nav-btn');
    const paymentModal = document.getElementById('payment-modal');
    const closeModal = document.querySelector('.close-modal');
    const generateQrBtn = document.getElementById('generate-qr-btn');
    const qrDisplayArea = document.getElementById('qr-display-area');
    const qrCodeContainer = document.getElementById('qrcode');
    const showingAmount = document.getElementById('showing-amount');
    const donateAmountInput = document.getElementById('donate-amount');

    // ডোনেট বাটনে ক্লিক করলে পপআপ খোলা
    if (donateBtn && paymentModal && donateAmountInput) {
        donateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            paymentModal.classList.remove('hidden');
            if (qrDisplayArea) qrDisplayArea.classList.add('hidden'); 
            donateAmountInput.value = ''; 
        });
    }

    // ক্রসের (X) ওপর ক্লিক করলে পপআপ বন্ধ করা
    if (closeModal && paymentModal) {
        closeModal.addEventListener('click', () => {
            paymentModal.classList.add('hidden');
        });
    }

    // পপআপের বাইরে ক্লিক করলে পপআপ বন্ধ করা
    if (paymentModal) {
        window.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                paymentModal.classList.add('hidden');
            }
        });
    }

    // পেমেন্ট অপশনে ক্লিক করলে আপনার UPI আইডি অনুযায়ী QR Code তৈরি
    if (generateQrBtn && donateAmountInput && qrCodeContainer && showingAmount && qrDisplayArea) {
        generateQrBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const amount = donateAmountInput.value;
            
            if (!amount || amount < 10) {
                alert("Please enter a valid amount (Minimum 10)");
                return;
            }

            const upiId = "Q438283571@ybl"; 
            const name = "Green Board Foundation";
            
          //  const upiLink = 'upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR';
          //  const qrApiUrl ='https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiLink)}';

          //  qrCodeContainer.innerHTML = '<img src="${qrApiUrl}" alt="Payment QR Code" style="display:block; max-width:100%; height:auto; margin: 0 auto;">';
          //  showingAmount.innerText = 'Amount: ₹${amount}';
            // সাধারণ ডাবল কোটেশন এবং প্লাস (+) ব্যবহার করে স্ট্রিং তৈরি করা হলো
            var upiLink = "upi://pay?pa=" + upiId + "&pn=" + encodeURIComponent(name) + "&am=" + amount + "&cu=INR";
            var qrApiUrl = "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" + encodeURIComponent(upiLink);

            // ইমেজ ট্যাগ এবং টেক্সট তৈরি করা হলো একদম সহজ উপায়ে
            qrCodeContainer.innerHTML = '<img src="' + qrApiUrl + '" alt="Payment QR Code" style="display:block; max-width:100%; height:auto; margin: 0 auto;">';
            showingAmount.innerText = "Amount: ₹" + amount;
            qrDisplayArea.classList.remove('hidden');
        });
    }
    // --- Cancel বাটনের লজিক ---
    const cancelDonateBtn = document.getElementById('cancel-donate-btn');

    if (cancelDonateBtn && paymentModal) {
        cancelDonateBtn.addEventListener('click', (e) => {
            e.preventDefault(); // পেজ রিফ্রেশ হওয়া বন্ধ করবে
            
            // ১. পপআপ বক্সটি লুকিয়ে ফেলবে
            paymentModal.classList.add('hidden');
            
            // ২. ইনপুট বক্সের অ্যামাউন্ট খালি করে দেবে
            if (donateAmountInput) donateAmountInput.value = '';
            
            // ৩. যদি অলরেডি কোনো QR কোড তৈরি হয়ে থাকে, সেটাও লুকিয়ে ফেলবে
            if (qrDisplayArea) qrDisplayArea.classList.add('hidden');
        });
        // --- পেমেন্ট সাকসেস মেসেজ হ্যান্ডলিং লজিক ---
    const confirmPaymentBtn = document.getElementById('confirm-payment-btn');
    const paymentSuccessMsg = document.getElementById('payment-success-msg');
    const successCloseBtn = document.getElementById('success-close-btn');
    
    // মডালের ভেতরের অন্য এলিমেন্টগুলো যেগুলো লুকাতে হবে
    const modalHeading = paymentModal ? paymentModal.querySelector('h2') : null;
    const modalSubtext = paymentModal ? paymentModal.querySelector('p') : null;
    const amountBox = paymentModal ? paymentModal.querySelector('.amount-box') : null;

    if (confirmPaymentBtn && paymentSuccessMsg) {
        confirmPaymentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // ১. কিউআর কোড এরিয়া এবং ইনপুট ফিল্ডগুলো লুকিয়ে ফেলবে
            if (qrDisplayArea) qrDisplayArea.classList.add('hidden');
            if (generateQrBtn) generateQrBtn.style.display = 'none';
            if (cancelDonateBtn) cancelDonateBtn.style.display = 'none';
            if (modalHeading) modalHeading.style.display = 'none';
            if (modalSubtext) modalSubtext.style.display = 'none';
            if (amountBox) amountBox.style.display = 'none';
            
            // ২. সাকসেস মেসেজটি স্ক্রিনে ফুটিয়ে তুলবে
            paymentSuccessMsg.classList.remove('hidden');
        });
    }

    // সাকসেস মেসেজের "Done" বাটনে ক্লিক করলে পুরো উইন্ডো রিসেট হয়ে বন্ধ হবে
    if (successCloseBtn && paymentModal) {
        successCloseBtn.addEventListener('click', () => {
            // পুরো পপআপ বন্ধ করা
            paymentModal.classList.add('hidden');
            
            // ভেতরের সব ডিজাইন আগের জায়গায় ফিরিয়ে আনা (রিসেট)
            setTimeout(() => {
                if (paymentSuccessMsg) paymentSuccessMsg.classList.add('hidden');
                if (generateQrBtn) generateQrBtn.style.display = 'block';
                if (cancelDonateBtn) cancelDonateBtn.style.display = 'block';
                if (modalHeading) modalHeading.style.display = 'block';
                if (modalSubtext) modalSubtext.style.display = 'block';
                if (amountBox) amountBox.style.display = 'flex';
                if (donateAmountInput) donateAmountInput.value = '';
            }, 400); // বন্ধ হওয়ার পর ব্যাকগ্রাউন্ডে রিসেট হবে
        });
    }
    }
    // ==========================================
    // ৪. About Us ফুটার পপআপ সিস্টেম
    // ==========================================
    const aboutUsLink = document.getElementById('about-us-link');
    const aboutModal = document.getElementById('about-modal');
    const closeAboutModalX = document.querySelector('.close-about-modal');
    const closeAboutBtn = document.getElementById('close-about-btn');



    // লিংকে ক্লিক করলে পপআপ ওপেন হবে
    if (aboutUsLink && aboutModal) {
        aboutUsLink.addEventListener('click', (e) => {
            e.preventDefault(); // পেজ যেন লাফ দিয়ে উপরে না উঠে যায়
            aboutModal.classList.remove('hidden');
        });
    }

    // ক্রসে (X) ক্লিক করলে পপআপ বন্ধ হবে
    if (closeAboutModalX && aboutModal) {
        closeAboutModalX.addEventListener('click', () => {
            aboutModal.classList.add('hidden');
        });
    }

    // নিচের Close বাটনে ক্লিক করলেও পপআপ বন্ধ হবে
    if (closeAboutBtn && aboutModal) {
        closeAboutBtn.addEventListener('click', () => {
            aboutModal.classList.add('hidden');
        });
    }

    // পপআপের বাইরে ফাঁকা জায়গায় ক্লিক করলে পপআপ বন্ধ হবে
    if (aboutModal) {
        window.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.add('hidden');
            }
        });
    }
    // ==========================================
    // ৫. Our Vision and Mission ফুটার পপআপ সিস্টেম
    // ==========================================
    const visionMissionLink = document.getElementById('vision-mission-link');
    const visionModal = document.getElementById('vision-modal');
    const closeVisionModalX = document.querySelector('.close-vision-modal');
    const closeVisionBtn = document.getElementById('close-vision-btn');

    // লিংকে ক্লিক করলে পপআপ ওপেন হবে
    if (visionMissionLink && visionModal) {
        visionMissionLink.addEventListener('click', (e) => {
            e.preventDefault(); // পেজ যেন লাফ দিয়ে উপরে না উঠে যায়
            visionModal.classList.remove('hidden');
        });
    }

    // ক্রসে (X) ক্লিক করলে পপআপ বন্ধ হবে
    if (closeVisionModalX && visionModal) {
        closeVisionModalX.addEventListener('click', () => {
            visionModal.classList.add('hidden');
        });
    }

    // নিচের Close বাটনে ক্লিক করলেও পপআপ বন্ধ হবে
    if (closeVisionBtn && visionModal) {
        closeVisionBtn.addEventListener('click', () => {
            visionModal.classList.add('hidden');
        });
    }

    // পপআপের বাইরে ফাঁকা জায়গায় ক্লিক করলে পপআপ বন্ধ হবে
    if (visionModal) {
        window.addEventListener('click', (e) => {
            if (e.target === visionModal) {
                visionModal.classList.add('hidden');
            }
        });
    }
    // ==========================================
    // ৬. Our Work ফুটার পপআপ সিস্টেম
    // ==========================================
    const ourWorkLink = document.getElementById('our-work-link');
    const workModal = document.getElementById('work-modal');
    const closeWorkModalX = document.querySelector('.close-work-modal');
    const closeWorkBtn = document.getElementById('close-work-btn');

    // লিংকে ক্লিক করলে পপআপ ওপেন হবে
    if (ourWorkLink && workModal) {
        ourWorkLink.addEventListener('click', (e) => {
            e.preventDefault(); // পেজ যেন লাফ দিয়ে উপরে না উঠে যায়
            workModal.classList.remove('hidden');
        });
    }

    // ক্রসে (X) ক্লিক করলে পপআপ বন্ধ হবে
    if (closeWorkModalX && workModal) {
        closeWorkModalX.addEventListener('click', () => {
            workModal.classList.add('hidden');
        });
    }

    // নিচের Close বাটনে ক্লিক করলেও পপআপ বন্ধ হবে
    if (closeWorkBtn && workModal) {
        closeWorkBtn.addEventListener('click', () => {
            workModal.classList.add('hidden');
        });
    }

    // পপআপের বাইরে ফাঁকা জায়গায় ক্লিক করলে পপআপ বন্ধ হবে
    if (workModal) {
        window.addEventListener('click', (e) => {
            if (e.target === workModal) {
                workModal.classList.add('hidden');
            }
        });
    }
    // ==========================================
    // ৭. Online Donations লিঙ্ক ক্লিক ট্রিপার সিস্টেম
    // ==========================================
    const onlineDonationsLink = document.getElementById('online-donations-link');
    const mainDonateBtn = document.getElementById('donate-nav-btn');

    if (onlineDonationsLink && mainDonateBtn) {
        onlineDonationsLink.addEventListener('click', (e) => {
            e.preventDefault(); // পেজ যেন লাফ দিয়ে রিফ্রেশ না হয়
            
            // উপরের মেইন ডোনেট বাটনটিকে স্বয়ংক্রিয়ভাবে ক্লিক (Trigger) করবে
            mainDonateBtn.click();
            
            // স্ক্রিনটি স্মুথভাবে একদম উপরে ডোনেশন পপআপের কাছে নিয়ে যাবে
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
// ==========================================
    // ৮. Contact Us ফুটার পপআপ সিস্টেম
    // ==========================================
    const contactUsLink = document.getElementById('contact-us-link');
    const contactModal = document.getElementById('contact-modal');
    const closeContactModalX = document.querySelector('.close-contact-modal');
    const closeContactBtn = document.getElementById('close-contact-btn');

    // লিংকে ক্লিক করলে পপআপ ওপেন হবে
    if (contactUsLink && contactModal) {
        contactUsLink.addEventListener('click', (e) => {
            e.preventDefault(); // পেজ যেন লাফ দিয়ে উপরে না উঠে যায়
            contactModal.classList.remove('hidden');
        });
    }

    // ক্রসে (X) ক্লিক করলে পপআপ বন্ধ হবে
    if (closeContactModalX && contactModal) {
        closeContactModalX.addEventListener('click', () => {
            contactModal.classList.add('hidden');
        });
    }

    // নিচের Close বাটনে ক্লিক করলেও পপআপ বন্ধ হবে
    if (closeContactBtn && contactModal) {
        closeContactBtn.addEventListener('click', () => {
            contactModal.classList.add('hidden');
        });
    }

    // পপআপের বাইরে ফাঁকা জায়গায় ক্লিক করলে পপআপ বন্ধ হবে
    if (contactModal) {
        window.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.add('hidden');
            }
        });
    }
// ==========================================
    // ৯. Our Board of Directors ফুটার পপআপ সিস্টেম
    // ==========================================
    const boardDirectorsLink = document.getElementById('board-directors-link');
    const directorsModal = document.getElementById('directors-modal');
    const closeDirectorsModalX = document.querySelector('.close-directors-modal');
    const closeDirectorsBtn = document.getElementById('close-directors-btn');

    // লিংকে ক্লিক করলে পপআপ ওপেন হবে
    if (boardDirectorsLink && directorsModal) {
        boardDirectorsLink.addEventListener('click', (e) => {
            e.preventDefault(); // পেজ যেন লাফ দিয়ে উপরে না উঠে যায়
            directorsModal.classList.remove('hidden');
        });
    }

    // ক্রসে (X) ক্লিক করলে পপআপ বন্ধ হবে
    if (closeDirectorsModalX && directorsModal) {
        closeDirectorsModalX.addEventListener('click', () => {
            directorsModal.classList.add('hidden');
        });
    }

    // নিচের Close বাটনে ক্লিক করলেও পপআপ বন্ধ হবে
    if (closeDirectorsBtn && directorsModal) {
        closeDirectorsBtn.addEventListener('click', () => {
            directorsModal.classList.add('hidden');
        });
    }

    // পপআপের বাইরে ফাঁকা জায়গায় ক্লিক করলে পপআপ বন্ধ হবে
    if (directorsModal) {
        window.addEventListener('click', (e) => {
            if (e.target === directorsModal) {
                directorsModal.classList.add('hidden');
            }
        });
    }
    // ==========================================
    // ১০. ফেইড-ইন ফটো স্লাইডশো সিস্টেম (Updated)
    // ==========================================
    const slideshowSlides = document.querySelectorAll('.slide');
    const slideshowPrevBtn = document.getElementById('prev-slide');
    const slideshowNextBtn = document.getElementById('next-slide');
    const slideshowDotsContainer = document.getElementById('slider-dots');

    let slideshowIndex = 0;
    let slideshowTimer;

    // স্লাইডের সংখ্যা অনুযায়ী নিচে ডট তৈরি করা
    if (slideshowDotsContainer && slideshowSlides.length > 0) {
        slideshowSlides.forEach((_, i) => {
            const dotButton = document.createElement('div');
            dotButton.classList.add('dot');
            if (i === 0) dotButton.classList.add('active');
            dotButton.setAttribute('data-slidenum', i);
            slideshowDotsContainer.appendChild(dotButton);
        });
    }

    const slideshowDots = document.querySelectorAll('.dot');

    // একটিভ স্লাইড দেখানোর মেইন মেকানিজম
    const showTargetSlide = (targetIndex) => {
        slideshowSlides.forEach((slide, idx) => {
            if (idx === targetIndex) {
                slide.classList.add('active-slide');
            } else {
                slide.classList.remove('active-slide');
            }
        });

        // নিচের ডট হাইলাইট আপডেট করা
        slideshowDots.forEach((dot, idx) => {
            if (idx === targetIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const triggerNextSlide = () => {
        slideshowIndex = (slideshowIndex + 1) % slideshowSlides.length;
        showTargetSlide(slideshowIndex);
    };

    const triggerPrevSlide = () => {
        slideshowIndex = (slideshowIndex - 1 + slideshowSlides.length) % slideshowSlides.length;
        showTargetSlide(slideshowIndex);
    };

    // অটোমেটিক স্লাইড টাইমার রিসেট ফাংশন (৩ সেকেন্ড পর পর পরিবর্তন হবে)
    const runSlideshowTimer = () => {
        clearInterval(slideshowTimer);
        slideshowTimer = setInterval(triggerNextSlide, 3000);
    };

    // ইভেন্ট লিসেনার যুক্ত করা
    if (slideshowNextBtn) {
        slideshowNextBtn.addEventListener('click', () => {
            triggerNextSlide();
            runSlideshowTimer();
        });
    }

    if (slideshowPrevBtn) {
        slideshowPrevBtn.addEventListener('click', () => {
            triggerPrevSlide();
            runSlideshowTimer();
        });
    }

    slideshowDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            slideshowIndex = parseInt(e.target.getAttribute('data-slidenum'));
            showTargetSlide(slideshowIndex);
            runSlideshowTimer();
        });
    });

    // স্লাইডশোটি প্রথম রান করার জন্য ইনিশিয়ালাইজ করা
    if (slideshowSlides.length > 0) {
        showTargetSlide(0); // ১ম ছবিটিকে একটিভ করবে
        runSlideshowTimer(); // টাইমার চালু করবে
    }
});
