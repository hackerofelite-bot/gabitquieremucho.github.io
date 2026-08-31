/* =====================================================
   CORAZONES FLOTANTES
===================================================== */

const heartsContainer =
    document.querySelector(".floating-hearts");


function createHeart() {

    if (!heartsContainer) {
        return;
    }

    const heart =
        document.createElement("span");

    heart.className =
        "floating-heart";

    heart.textContent =
        Math.random() > 0.5
            ? "♥"
            : "♡";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (12 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (7 + Math.random() * 8) + "s";

    heart.style.animationDelay =
        Math.random() * 4 + "s";

    heartsContainer.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 16000);

}


if (heartsContainer) {

    for (let i = 0; i < 12; i++) {

        setTimeout(
            createHeart,
            i * 500
        );

    }

    setInterval(
        createHeart,
        900
    );

}


/* =====================================================
   SOBRE DE LA PORTADA
===================================================== */

const envelope =
    document.querySelector("#envelope");


if (envelope) {

    envelope.addEventListener(
        "click",
        function () {

            envelope.classList.add(
                "envelope-open"
            );

        }
    );

}


/* =====================================================
   CAPTCHA
===================================================== */

const captchaForm =
    document.querySelector("#captchaForm");


if (captchaForm) {

    captchaForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            const answer =
                document
                    .querySelector("#captchaAnswer")
                    .value
                    .trim()
                    .toLowerCase();


            const message =
                document.querySelector(
                    "#captchaMessage"
                );


            const correctAnswers = [

                "barraco",
                "el barraco",
                "en el barraco"

            ];


            if (
                correctAnswers.includes(
                    answer
                )
            ) {

                message.textContent =
                    "Correcto ♥";


                envelope.classList.add(
                    "envelope-open"
                );


                setTimeout(
                    function () {

                        document.body.style.opacity =
                            "0";

                        document.body.style.transition =
                            "opacity .5s";


                        setTimeout(
                            function () {

                                window.location.href =
                                    "home.html";

                            },
                            500
                        );

                    },
                    1000
                );


            } else {

                message.textContent =
                    "Pista: piensa en El Barraco... 💗";

            }

        }
    );

}


/* =====================================================
   MENÚ MÓVIL
===================================================== */

const mobileMenu =
    document.querySelector(
        ".mobile-menu"
    );


if (mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "mobile-menu-open"
            );

        }
    );

}


/* =====================================================
   TRANSICIONES ENTRE PÁGINAS
===================================================== */

const internalLinks =
    document.querySelectorAll(
        'a[href$=".html"]'
    );


internalLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const destination =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !destination ||
                    destination.startsWith("#")
                ) {

                    return;

                }


                event.preventDefault();


                document.body.style.opacity =
                    "0";

                document.body.style.transition =
                    "opacity .35s";


                setTimeout(
                    function () {

                        window.location.href =
                            destination;

                    },
                    350
                );

            }
        );

    }
);


/* =====================================================
   PLANES
===================================================== */

const planButtons =
    document.querySelectorAll(
        ".plan-check"
    );


planButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                button.classList.toggle(
                    "completed"
                );


                if (
                    button.classList.contains(
                        "completed"
                    )
                ) {

                    button.textContent =
                        "♥ Hecho";

                } else {

                    button.textContent =
                        "○ Pendiente";

                }

            }
        );

    }
);


/* =====================================================
   PELÍCULAS
===================================================== */

const movieButtons =
    document.querySelectorAll(
        ".movie-check"
    );


movieButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                button.classList.toggle(
                    "completed"
                );


                if (
                    button.classList.contains(
                        "completed"
                    )
                ) {

                    button.textContent =
                        "♥ Vista";

                } else {

                    button.textContent =
                        "○ Pendiente";

                }

            }
        );

    }
);


/* =====================================================
   ABRE CUANDO
===================================================== */

const modal =
    document.querySelector(
        "#letterModal"
    );


const whenCards =
    document.querySelectorAll(
        ".when-card"
    );


if (modal) {

    const modalTitle =
        document.querySelector(
            "#modalTitle"
        );


    const modalMessage =
        document.querySelector(
            "#modalMessage"
        );


    whenCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    modalTitle.textContent =
                        "Cuando " +
                        card.dataset.title;


                    modalMessage.textContent =
                        card.dataset.message;


                    modal.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    const closeButton =
        document.querySelector(
            "#modalClose"
        );


    closeButton.addEventListener(
        "click",
        function () {

            modal.classList.remove(
                "active"
            );

        }
    );


    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                modal.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =====================================================
   TEST
===================================================== */

const quiz =
    document.querySelector(
        "#quiz"
    );


if (quiz) {

    quiz.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            let score = 0;

            let answered = 0;


            for (
                let i = 1;
                i <= 6;
                i++
            ) {

                const selected =
                    quiz.querySelector(
                        `input[name="q${i}"]:checked`
                    );


                if (selected) {

                    answered++;

                    score +=
                        Number(
                            selected.value
                        );

                }

            }


            const result =
                document.querySelector(
                    "#quizResult"
                );


            result.hidden = false;


            if (answered < 6) {

                result.innerHTML = `

                    <h2>
                        Faltan respuestas 💗
                    </h2>

                    <p>
                        Contesta todas las preguntas
                        para descubrir tu resultado.
                    </p>

                `;

                return;

            }


            let resultData;


            if (score <= 1) {

                resultData = {

                    title:
                        "“Tenemos que repasar nuestra historia” 😂",

                    text:
                        "La nota no importa. Siempre podemos volver a vivir nuestros recuerdos."

                };

            } else if (score <= 3) {

                resultData = {

                    title:
                        "“Estamos calentando” 💕",

                    text:
                        "Hay algunas cosas que todavía podemos descubrir el uno del otro."

                };

            } else if (score <= 5) {

                resultData = {

                    title:
                        "“Experta en nosotros” 💗",

                    text:
                        "Conoces nuestros pequeños detalles y eso me encanta."

                };

            } else {

                resultData = {

                    title:
                        "“Demasiado experta” 💞",

                    text:
                        "Sabes demasiado sobre nosotros. Y me encanta que sea así."

                };

            }


            result.innerHTML = `

                <h2>
                    ${resultData.title}
                </h2>

                <p>
                    ${resultData.text}
                </p>

            `;


            result.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }
    );

}


/* =====================================================
   PREGUNTA FINAL
===================================================== */

const noButton =
    document.querySelector(
        "#noButton"
    );


const yesButton =
    document.querySelector(
        "#yesButton"
    );


if (
    noButton &&
    yesButton
) {

    let yesScale = 1;


    noButton.addEventListener(
        "click",
        function () {

            yesScale += 0.45;


            yesButton.style.transform =
                `scale(${yesScale})`;


            noButton.style.transform =

                `translate(
                    ${(Math.random() - 0.5) * 190}px,
                    ${(Math.random() - 0.5) * 110}px
                )`;


            const finalText =
                document.querySelector(
                    "#finalText"
                );


            if (yesScale >= 3.2) {

                finalText.textContent =
                    "Creo que ya sabes cuál es la respuesta correcta... 😌💗";


                noButton.style.opacity =
                    "0";


                noButton.style.pointerEvents =
                    "none";

            } else {

                finalText.textContent =
                    "Esa respuesta parece que no funciona. Prueba la otra 👀";

            }

        }
    );


    yesButton.addEventListener(
        "click",
        function () {

            const finalText =
                document.querySelector(
                    "#finalText"
                );


            finalText.innerHTML =

                `

                Sabía que dirías que sí. ♥
                <br><br>
                Te quiero muchísimo, An.

                `;


            noButton.style.display =
                "none";


            /*
                LLUVIA DE CORAZONES
            */

            for (
                let i = 0;
                i < 35;
                i++
            ) {

                setTimeout(
                    function () {

                        createHeart();

                    },
                    i * 70
                );

            }

        }
    );

}
