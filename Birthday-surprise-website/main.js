document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SAFE CONFETTI
    ===================================================== */

    function safeConfetti(options) {
        try {
            if (typeof confetti === "function") {
                confetti(options);
            }
        } catch (e) {
            console.log("Confetti error:", e);
        }
    }


    /* =====================================================
       PARTICLES
    ===================================================== */

    function createParticles() {

        const container =
            document.getElementById("particles");

        if (!container) return;

        for (let i = 0; i < 60; i++) {

            const particle =
                document.createElement("div");

            particle.classList.add("particle");

            const size =
                Math.random() * 6 + 2;

            particle.style.width =
                size + "px";

            particle.style.height =
                size + "px";

            particle.style.left =
                Math.random() * 100 + "vw";

            particle.style.animationDuration =
                Math.random() * 10 + 8 + "s";

            particle.style.animationDelay =
                Math.random() * 5 + "s";

            container.appendChild(particle);
        }
    }

    createParticles();


    /* =====================================================
       FLOATING HEARTS
    ===================================================== */

    function createHeart() {

        const container =
            document.getElementById("hearts-container");

        if (!container) return;

        const heart =
            document.createElement("div");

        heart.classList.add("heart");

        heart.innerHTML = "❤️";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            Math.random() * 20 + 20 + "px";

        heart.style.animationDuration =
            Math.random() * 8 + 6 + "s";

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 14000);
    }

    setInterval(createHeart, 500);


    /* =====================================================
       OPENING CONFETTI
    ===================================================== */

    const openingDuration = 3000;

    const openingEnd =
        Date.now() + openingDuration;

    (function frame() {

        safeConfetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });

        safeConfetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < openingEnd) {
            requestAnimationFrame(frame);
        }

    })();


    /* =====================================================
       MUSIC PLAYER
    ===================================================== */

    const music =
        document.getElementById("birthdayMusic");

    const musicBtn =
        document.getElementById("musicBtn");

    let musicPlaying = false;

    if (music && musicBtn) {

        musicBtn.addEventListener("click", () => {

            if (!musicPlaying) {

                music.play()
                    .then(() => {

                        musicBtn.innerHTML =
                            "⏸ Pause Music";

                        musicPlaying = true;

                    })
                    .catch((error) => {

                        console.log(
                            "Music could not start:",
                            error
                        );

                    });

            } else {

                music.pause();

                musicBtn.innerHTML =
                    "🎵 Play Music";

                musicPlaying = false;
            }

        });

    }


    /* =====================================================
       BIRTHDAY LETTER
       BROTHER → SISTER
    ===================================================== */

    const birthdayMessage = `

Happy Birthday to my amazing sister! ❤️
Life wouldn’t be the same without you. We may fight, annoy each other and have our silly moments, but you’ll always be one of the most important people in my life. Thank you for all the laughs, memories, support and for simply being you. I hope this year brings you endless happiness, success and everything your heart wishes for. No matter where life takes us, I’ll always be there for you. Love you always, sis! 🫶🎂✨

`;


    const typingText =
        document.getElementById("typingText");

    let typingStarted = false;


    function startTypingEffect() {

        if (!typingText) return;

        if (typingStarted) return;

        typingStarted = true;

        let i = 0;


        function typeWriter() {

            if (i < birthdayMessage.length) {

                typingText.innerHTML +=
                    birthdayMessage.charAt(i);

                i++;

                setTimeout(
                    typeWriter,
                    35
                );

            }

        }

        typeWriter();
    }


    /* =====================================================
       START BUTTON
    ===================================================== */

    const startBtn =
        document.getElementById("startBtn");

    const messageSection =
        document.getElementById("messageSection");


    if (startBtn) {

        startBtn.addEventListener("click", () => {

            safeConfetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
            });


            /*
             * Start music when the user clicks
             * "Open Your Surprise".
             *
             * This works because the click counts
             * as user interaction.
             */

            if (
                music &&
                !musicPlaying
            ) {

                music.play()
                    .then(() => {

                        musicPlaying = true;

                        if (musicBtn) {
                            musicBtn.innerHTML =
                                "⏸ Pause Music";
                        }

                    })
                    .catch(() => {
                        console.log(
                            "Music requires manual play."
                        );
                    });

            }


            if (messageSection) {

                messageSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

            startTypingEffect();

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            if (
                                entry.target.id ===
                                "messageSection"
                            ) {

                                startTypingEffect();

                            }

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    document
        .querySelectorAll(".hidden")
        .forEach((section) => {

            if (
                section.id !==
                "finalCelebration" &&

                section.id !==
                "giftMessage"
            ) {

                observer.observe(section);

            }

        });


    /* =====================================================
       COUNTDOWN TIMER
       
       BIRTHDAY:
       24 SEPTEMBER 2026
       12:00 AM
    ===================================================== */

    const targetDate =
        new Date(
            "2026-09-24T00:00:00"
        );


    function updateCountdown() {

        const now =
            new Date();


        const difference =
            targetDate - now;


        const daysElement =
            document.getElementById("days");

        const hoursElement =
            document.getElementById("hours");

        const minutesElement =
            document.getElementById("minutes");

        const secondsElement =
            document.getElementById("seconds");


        if (
            !daysElement ||
            !hoursElement ||
            !minutesElement ||
            !secondsElement
        ) {
            return;
        }


        /*
         * Birthday has arrived
         */

        if (difference <= 0) {

            daysElement.textContent = "0";
            hoursElement.textContent = "0";
            minutesElement.textContent = "0";
            secondsElement.textContent = "0";


            /*
             * Trigger birthday celebration once
             */

            if (!window.birthdayCelebrationStarted) {

                window.birthdayCelebrationStarted = true;


                safeConfetti({
                    particleCount: 250,
                    spread: 120,
                    origin: {
                        y: 0.6
                    }
                });


                setTimeout(() => {

                    safeConfetti({
                        particleCount: 200,
                        spread: 160,
                        origin: {
                            y: 0.5
                        }
                    });

                }, 1000);

            }

            return;
        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                ) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60 *
                        60
                    )
                ) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (
                    difference %
                    (1000 * 60)
                ) /
                1000
            );


        daysElement.textContent =
            days;

        hoursElement.textContent =
            hours;

        minutesElement.textContent =
            minutes;

        secondsElement.textContent =
            seconds;

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img"
        );


    const lightbox =
        document.getElementById(
            "lightbox"
        );


    const lightboxImg =
        document.getElementById(
            "lightboxImg"
        );


    const closeLightbox =
        document.getElementById(
            "closeLightbox"
        );


    galleryImages.forEach(
        (img) => {

            img.addEventListener(
                "click",
                () => {

                    if (!lightbox || !lightboxImg) {
                        return;
                    }

                    lightbox.style.display =
                        "flex";

                    lightboxImg.src =
                        img.src;

                }
            );

        }
    );


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            () => {

                if (lightbox) {
                    lightbox.style.display =
                        "none";
                }

            }
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            (e) => {

                if (
                    e.target ===
                    lightbox
                ) {

                    lightbox.style.display =
                        "none";

                }

            }
        );

    }


    /* =====================================================
       SISTER QUIZ
    ===================================================== */

    window.checkAnswer =
        function(isCorrect) {

            const result =
                document.getElementById(
                    "quizResult"
                );


            if (!result) return;


            if (isCorrect) {

                result.innerHTML =
                    "😂 Exactly! Your brother is definitely the annoying one! ❤️";


                safeConfetti({
                    particleCount: 120,
                    spread: 80
                });

            } else {

                result.innerHTML =
                    "😅 Wrong answer! Try again!";

            }

        };


    /* =====================================================
       SISTER SPECIAL MESSAGE CARDS
    ===================================================== */

    window.showLoveMessage =
        function(message, image) {

            const box =
                document.getElementById(
                    "loveMessageBox"
                );


            if (!box) return;


            /*
             * If an image is supplied,
             * display it.
             */

            if (image) {

                box.innerHTML = `

                    <img
                        src="${image}"
                        class="love-photo"
                        alt="Memory"
                    >

                    <p>
                        ${message}
                    </p>

                `;

            } else {

                box.innerHTML = `

                    <p>
                        ${message}
                    </p>

                `;

            }


            safeConfetti({
                particleCount: 50,
                spread: 70,
                origin: {
                    y: 0.6
                }
            });

        };


    /* =====================================================
       GIFT SURPRISE
    ===================================================== */

    const giftBox =
        document.getElementById(
            "giftBox"
        );


    const giftMessage =
        document.getElementById(
            "giftMessage"
        );


    const finalCelebration =
        document.getElementById(
            "finalCelebration"
        );


    let giftOpened = false;


    if (giftBox) {

        giftBox.addEventListener(
            "click",
            () => {

                if (giftOpened) return;

                giftOpened = true;


                giftBox.style.display =
                    "none";


                if (giftMessage) {

                    giftMessage.classList.remove(
                        "hidden"
                    );

                    giftMessage.classList.add(
                        "visible"
                    );

                }


                /* =====================================
                   BIG CONFETTI CELEBRATION
                ===================================== */

                const duration =
                    5000;


                const animationEnd =
                    Date.now() +
                    duration;


                const defaults = {

                    startVelocity: 30,

                    spread: 360,

                    ticks: 60

                };


                function randomInRange(
                    min,
                    max
                ) {

                    return (
                        Math.random() *
                        (max - min) +
                        min
                    );

                }


                const fireworks =
                    setInterval(
                        () => {

                            const timeLeft =
                                animationEnd -
                                Date.now();


                            if (
                                timeLeft <= 0
                            ) {

                                clearInterval(
                                    fireworks
                                );

                                return;

                            }


                            const particleCount =
                                50 *
                                (
                                    timeLeft /
                                    duration
                                );


                            safeConfetti({

                                ...defaults,

                                particleCount,

                                origin: {

                                    x:
                                        randomInRange(
                                            0.1,
                                            0.3
                                        ),

                                    y:
                                        Math.random() -
                                        0.2

                                }

                            });


                            safeConfetti({

                                ...defaults,

                                particleCount,

                                origin: {

                                    x:
                                        randomInRange(
                                            0.7,
                                            0.9
                                        ),

                                    y:
                                        Math.random() -
                                        0.2

                                }

                            });


                        },
                        250
                    );


                /* =====================================
                   FINAL CELEBRATION
                ===================================== */

                setTimeout(
                    () => {

                        if (
                            finalCelebration
                        ) {

                            finalCelebration
                                .classList
                                .remove(
                                    "hidden"
                                );


                            finalCelebration
                                .classList
                                .add(
                                    "visible"
                                );

                        }


                        /*
                         * Continuous celebration
                         */

                        setInterval(
                            () => {

                                safeConfetti({

                                    particleCount: 60,

                                    spread: 120,

                                    origin: {
                                        y: 0
                                    }

                                });

                            },
                            2000
                        );


                    },
                    4000
                );

            }
        );

    }


    /* =====================================================
       TIMELINE MEMORY GALLERY
    ===================================================== */

    window.openMemoryGallery =
        function(images) {

            const modal =
                document.getElementById(
                    "memoryModal"
                );


            const gallery =
                document.getElementById(
                    "memoryGallery"
                );


            if (
                !modal ||
                !gallery
            ) {
                return;
            }


            gallery.innerHTML = "";


            images.forEach(
                (imgPath) => {

                    const img =
                        document.createElement(
                            "img"
                        );


                    img.src =
                        imgPath;


                    img.alt =
                        "Sibling Memory";


                    img.addEventListener(
                        "click",
                        () => {

                            /*
                             * Clicking a timeline
                             * image can also open
                             * the main lightbox.
                             */

                            if (
                                lightbox &&
                                lightboxImg
                            ) {

                                lightboxImg.src =
                                    imgPath;

                                lightbox.style.display =
                                    "flex";

                            }

                        }
                    );


                    gallery.appendChild(
                        img
                    );

                }
            );


            modal.style.display =
                "flex";

        };


    /* =====================================================
       CLOSE TIMELINE MEMORY MODAL
    ===================================================== */

    const closeMemoryModal =
        document.getElementById(
            "closeMemoryModal"
        );


    const memoryModal =
        document.getElementById(
            "memoryModal"
        );


    if (closeMemoryModal) {

        closeMemoryModal.addEventListener(
            "click",
            () => {

                if (memoryModal) {

                    memoryModal.style.display =
                        "none";

                }

            }
        );

    }


    if (memoryModal) {

        memoryModal.addEventListener(
            "click",
            (e) => {

                if (
                    e.target ===
                    memoryModal
                ) {

                    memoryModal.style.display =
                        "none";

                }

            }
        );

    }


    /* =====================================================
       ESC KEY
       Close open galleries/lightbox
    ===================================================== */

    document.addEventListener(
        "keydown",
        (e) => {

            if (e.key === "Escape") {

                if (lightbox) {

                    lightbox.style.display =
                        "none";

                }


                if (memoryModal) {

                    memoryModal.style.display =
                        "none";

                }

            }

        }
    );


});