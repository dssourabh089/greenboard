document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ১. গুগল শিট কানেকশন (Google Sheets Data Integration)
    // ==========================================
    const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbyqMcT-iz9l84HpZLyJpSiGH6ULlx8vcs31hyjpkREbSPWFogj75n2VcHLllNBTEANu/exec";

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
                console.error('Sheet sync error:', error);
                if (statusSending) statusSending.classList.add('hidden');
                submitButton.disabled = false;
                submitButton.style.opacity = "1";
                alert("Network error. Sheet connection refused.");
            });
        });
    }


    // ==========================================
    // ২. লাইভ কাউন্টার অ্যানিমেশন (Animated Stat Numbers)
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
    // ৩. ফেইড-ইন ফটো স্লাইডশো সিস্টেম (Gallery Slideshow)
    // ==========================================
    const slideshowSlides = document.querySelectorAll('.slide');
    const slideshowPrevBtn = document.getElementById('prev-slide');
    const slideshowNextBtn = document.getElementById('next-slide');
    const slideshowDotsContainer = document.getElementById('slider-dots');

    let slideshowIndex = 0;
    let slideshowTimer;

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

    const showTargetSlide = (targetIndex) => {
        slideshowSlides.forEach((slide, idx) => {
            if (idx === targetIndex) {
                slide.classList.add('active-slide');
            } else {
                slide.classList.remove('active-slide');
            }
        });

        slideshowDots.forEach((dot, idx) => {
            if (idx === targetIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const triggerNextSlide = () => {
        if (slideshowSlides.length > 0) {
            slideshowIndex = (slideshowIndex + 1) % slideshowSlides.length;
            showTargetSlide(slideshowIndex);
        }
    };

    const triggerPrevSlide = () => {
        if (slideshowSlides.length > 0) {
            slideshowIndex = (slideshowIndex - 1 + slideshowSlides.length) % slideshowSlides.length;
            showTargetSlide(slideshowIndex);
        }
    };

    const runSlideshowTimer = () => {
        clearInterval(slideshowTimer);
        if (slideshowSlides.length > 0) {
            slideshowTimer = setInterval(triggerNextSlide, 3000);
        }
    };

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

    if (slideshowSlides.length > 0) {
        showTargetSlide(0);
        runSlideshowTimer();
    }


    // ==========================================
    // ৪. ডোনেশন, QR Code ও ক্যানসেল পেমেন্ট সিস্টেম
    // ==========================================
    const donateBtn = document.getElementById('donate-nav-btn');
    const paymentModal = document.getElementById('payment-modal');
    const closeModal = document.querySelector('.close-modal');
    const generateQrBtn = document.getElementById('generate-qr-btn');
    const cancelDonateBtn = document.getElementById('cancel-donate-btn');
    const qrDisplayArea = document.getElementById('qr-display-area');
    const qrCodeContainer = document.getElementById('qrcode');
    const showingAmount = document.getElementById('showing-amount');
    const donateAmountInput = document.getElementById('donate-amount');
    
    const confirmPaymentBtn = document.getElementById('confirm-payment-btn');
    const paymentSuccessMsg = document.getElementById('payment-success-msg');
    const successCloseBtn = document.getElementById('success-close-btn');

    const modalHeading = paymentModal ? paymentModal.querySelector('h2') : null;
    const modalSubtext = paymentModal ? paymentModal.querySelector('p') : null;
    const amountBox = paymentModal ? paymentModal.querySelector('.amount-box') : null;

    // মডাল খোলার ফাংশন
    if (donateBtn && paymentModal) {
        donateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            paymentModal.classList.remove('hidden');
            if (qrDisplayArea) qrDisplayArea.classList.add('hidden'); 
            if (paymentSuccessMsg) paymentSuccessMsg.classList.add('hidden');
            if (generateQrBtn) generateQrBtn.style.display = 'block';
            if (cancelDonateBtn) cancelDonateBtn.style.display = 'block'; 
            if (modalHeading) modalHeading.style.display = 'block';
            if (modalSubtext) modalSubtext.style.display = 'block';
            if (amountBox) amountBox.style.display = 'flex';
            if (donateAmountInput) donateAmountInput.value = ''; 
        });
    }

    // QR কোড জেনারেট করা
    if (generateQrBtn && donateAmountInput) {
        generateQrBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const amount = donateAmountInput.value;
            
            if (!amount || amount < 10) {
                alert("Please enter a valid amount (Minimum 10)");
                return;
            }

            const upiId = "Q438283571@ybl"; 
            const name = "EcoVanguard NGO";
            
            var upiLink = "upi://pay?pa=" + upiId + "&pn=" + encodeURIComponent(name) + "&am=" + amount + "&cu=INR";
            var qrApiUrl = "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" + encodeURIComponent(upiLink);

            if (qrCodeContainer && showingAmount && qrDisplayArea) {
                qrCodeContainer.innerHTML = '<img src="' + qrApiUrl + '" alt="Payment QR Code" style="display:block; max-width:100%; height:auto; margin: 0 auto;">';
                showingAmount.innerText = "Amount: ₹" + amount;
                qrDisplayArea.classList.remove('hidden');
                generateQrBtn.style.display = 'none'; // জেনারেট বাটন হাইড হবে, ক্যানসেল বাটন থাকবে
            }
        });
    }

    // ক্যানসেল বাটন প্রেস করা
    if (cancelDonateBtn && paymentModal) {
        cancelDonateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            paymentModal.classList.add('hidden');
        });
    }

    // ক্রসে ক্লিক করে মডাল বন্ধ করা
    if (closeModal && paymentModal) {
        closeModal.addEventListener('click', () => {
            paymentModal.classList.add('hidden');
        });
    }

    // বাইরে ক্লিক করে মডাল বন্ধ করা
    window.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.classList.add('hidden');
        }
    });

    // পেমেন্ট সাকসেস কনফার্মেশন বাটন লজিক
    if (confirmPaymentBtn && paymentSuccessMsg) {
        confirmPaymentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (qrDisplayArea) qrDisplayArea.classList.add('hidden');
            if (generateQrBtn) generateQrBtn.style.display = 'none';
            if (cancelDonateBtn) cancelDonateBtn.style.display = 'none'; 
            if (modalHeading) modalHeading.style.display = 'none';
            if (modalSubtext) modalSubtext.style.display = 'none';
            if (amountBox) amountBox.style.display = 'none';
            
            paymentSuccessMsg.classList.remove('hidden');
        });
    }

    // সাকসেস মেসেজ শেষ করে "Done" করা
    if (successCloseBtn && paymentModal) {
        successCloseBtn.addEventListener('click', () => {
            paymentModal.classList.add('hidden');
        });
    }


    // ==========================================
    // ৫. ফুটার লিংক পপআপ সিস্টেমসমূহ (Footer Modals Links)
    // ==========================================
    const footerLinkConfigs = [
        { linkId: 'about-us-link', modalId: 'about-modal', closeClass: '.close-about-modal', closeBtnId: 'close-about-btn' },
        { linkId: 'vision-mission-link', modalId: 'vision-modal', closeClass: '.close-vision-modal', closeBtnId: 'close-vision-btn' },
        { linkId: 'our-work-link', modalId: 'work-modal', closeClass: '.close-work-modal', closeBtnId: 'close-work-btn' },
        { linkId: 'contact-us-link', modalId: 'contact-modal', closeClass: '.close-contact-modal', closeBtnId: 'close-contact-btn' },
        { linkId: 'board-directors-link', modalId: 'directors-modal', closeClass: '.close-directors-modal', closeBtnId: 'close-directors-btn' }
    ];

    footerLinkConfigs.forEach(config => {
        const linkEl = document.getElementById(config.linkId);
        const modalEl = document.getElementById(config.modalId);
        const closeX = document.querySelector(config.closeClass);
        const closeBtn = document.getElementById(config.closeBtnId);

        if (linkEl && modalEl) {
            linkEl.addEventListener('click', (e) => {
                e.preventDefault();
                modalEl.classList.remove('hidden');
            });
        }
        if (closeX && modalEl) {
            closeX.addEventListener('click', () => modalEl.classList.add('hidden'));
        }
        if (closeBtn && modalEl) {
            closeBtn.addEventListener('click', () => modalEl.classList.add('hidden'));
        }
        if (modalEl) {
            window.addEventListener('click', (e) => {
                if (e.target === modalEl) modalEl.classList.add('hidden');
            });
        }
    });

    // ফুটারে Online Donations ক্লিক ট্রিপার সিসটেম
    const onlineDonationsLink = document.getElementById('online-donations-link');
    if (onlineDonationsLink && donateBtn) {
        onlineDonationsLink.addEventListener('click', (e) => {
            e.preventDefault();
            donateBtn.click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
