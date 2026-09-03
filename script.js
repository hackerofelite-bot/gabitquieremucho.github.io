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
   SOBRE + CAPTCHA + CARTA
===================================================== */

/*
   El sobre ya NO contiene la carta.

   El HTML tiene:

   #envelope
        ↓
   #captchaCard
        ↓
   #loveLetter
*/


const envelope =
    document.querySelector("#envelope");


const captchaCard =
    document.querySelector("#captchaCard");


const captchaForm =
    document.querySelector("#captchaForm");


const loveLetter =
    document.querySelector("#loveLetter");


const continueLetter =
    document.querySelector("#continueLetter");


let envelopeOpened = false;


/* =====================================================
   ABRIR SOBRE
===================================================== */

if (envelope) {

    envelope.addEventListener(
        "click",
        function () {

            /*
             * Evitamos que pueda abrirse
             * varias veces.
             */

            if (envelopeOpened) {
                return;
            }


            envelopeOpened = true;


            /*
             * Añadimos la clase que activa
             * la animación del sobre.
             */

            envelope.classList.add(
                "envelope-open"
            );


            /*
             * Ocultamos el texto
             * "Pulsa el sobre..."
             */

            const hint =
                document.querySelector(
                    ".envelope-hint"
                );


            if (hint) {

                hint.style.opacity =
                    "0";

                hint.style.transition =
                    "opacity .4s ease";

            }


            /*
             * Después de abrirse el sobre,
             * mostramos la pregunta.
             */

            if (captchaCard) {

                setTimeout(
                    function () {

                        captchaCard.classList.add(
                            "visible"
                        );

                    },
                    500
                );

            }

        }
    );

}


/* =====================================================
   CAPTCHA
===================================================== */

if (captchaForm) {

    captchaForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const input =
                document.querySelector(
                    "#captchaAnswer"
                );


            const message =
                document.querySelector(
                    "#captchaMessage"
                );


            if (!input || !message) {
                return;
            }


            /*
             * Convertimos la respuesta
             * a minúsculas y eliminamos
             * espacios innecesarios.
             */

            const answer =
                input.value
                    .trim()
                    .toLowerCase();


            /*
             * Respuestas aceptadas.
             */

            const correctAnswers = [

                "barraco",
                "el barraco",
                "en el barraco"

            ];


            /* =================================================
               RESPUESTA CORRECTA
            ================================================== */

            if (
                correctAnswers.includes(
                    answer
                )
            ) {

                message.textContent =
                    "Correcto ♥";


                message.classList.add(
                    "correct"
                );


                /*
                 * Desactivamos el input.
                 */

                input.disabled = true;


                /*
                 * Desactivamos el botón.
                 */

                const button =
                    captchaForm.querySelector(
                        "button"
                    );


                if (button) {

                    button.disabled = true;

                }


                /*
                 * Ocultamos suavemente
                 * la pregunta.
                 */

                setTimeout(
                    function () {

                        if (captchaCard) {

                            captchaCard.classList.add(
                                "hidden"
                            );

                        }

                    },
                    500
                );


                /*
                 * Mostramos la carta.
                 *
                 * La carta es independiente
                 * del sobre.
                 */

                setTimeout(
                    function () {

                        if (loveLetter) {

                            loveLetter.classList.add(
                                "show"
                            );

                        }

                    },
                    900
                );

            }


            /* =================================================
               RESPUESTA INCORRECTA
            ================================================== */

            else {

                message.textContent =
                    "Pista: piensa en El Barraco... 💗";


                message.classList.remove(
                    "correct"
                );


                /*
                 * Animación de error.
                 */

                if (captchaCard) {

                    captchaCard.classList.remove(
                        "captcha-error"
                    );


                    /*
                     * Fuerza al navegador a
                     * reiniciar la animación.
                     */

                    void captchaCard.offsetWidth;


                    captchaCard.classList.add(
                        "captcha-error"
                    );

                }

            }

        }
    );

}


/* =====================================================
   CONTINUAR DESDE LA CARTA
===================================================== */

if (continueLetter) {

    continueLetter.addEventListener(
        "click",
        function () {

            /*
             * Desaparece la carta.
             */

            if (loveLetter) {

                loveLetter.classList.remove(
                    "show"
                );

            }


            /*
             * Transición de salida
             * de toda la página.
             */

            document.body.style.opacity =
                "0";


            document.body.style.transition =
                "opacity .6s ease";


            /*
             * Vamos a home.html.
             */

            setTimeout(
                function () {

                    window.location.href =
                        "home.html";

                },
                600
            );

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

                    if (modalTitle) {

                        modalTitle.textContent =
                            "Cuando " +
                            card.dataset.title;

                    }


                    if (modalMessage) {

                        modalMessage.textContent =
                            card.dataset.message;

                    }


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


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                modal.classList.remove(
                    "active"
                );

            }
        );

    }


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
   TEST — ¿QUÉ AN ERES HOY?
===================================================== */

const quiz = document.querySelector("#quiz");

if (quiz) {

    quiz.addEventListener("submit", function (event) {

        event.preventDefault();

        const result = document.querySelector("#quizResult");

        if (!result) return;


        /*
         * Comprobamos que las 6 preguntas
         * hayan sido contestadas.
         */

        let answered = 0;

        for (let i = 1; i <= 6; i++) {

            const selected =
                quiz.querySelector(
                    `input[name="q${i}"]:checked`
                );

            if (selected) {
                answered++;
            }
        }


        /*
         * Si falta alguna pregunta,
         * no mostramos el resultado.
         */

        if (answered < 6) {

            result.hidden = false;

            result.innerHTML = `
                <div class="result-heart">♥</div>

                <h2>
                    Te has dejado alguna por ahí 👀
                </h2>

                <p>
                    Contesta las seis preguntas
                    para descubrir qué An eres hoy.
                </p>
            `;

            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }


        /*
         * Contadores para los cuatro tipos de An.
         */

        const scores = {
            energica: 0,
            cariñosa: 0,
            caliente: 0,
            pensativa: 0
        };


        /*
         * Sumamos un punto al perfil
         * correspondiente a cada respuesta.
         */

        for (let i = 1; i <= 6; i++) {

            const selected =
                quiz.querySelector(
                    `input[name="q${i}"]:checked`
                );

            if (selected) {

                scores[selected.value]++;

            }
        }


        /*
         * Encontramos el perfil con más puntos.
         */

        let winner = "energica";
        let highestScore = scores.energica;

        Object.keys(scores).forEach(function (type) {

            if (scores[type] > highestScore) {

                highestScore = scores[type];
                winner = type;

            }

        });


        /*
         * Resultados.
         */

        const results = {

            energica: {

                title: "An enérgica ⚡",

                subtitle:
                    "Hoy tienes demasiada energía para quedarte quieta.",

                text:
                    "Necesitas hacer cosas, moverte, descubrir algo y disfrutar el momento. Eres esa An que aparece llena de energía y convierte cualquier situación en entretenida.",

                message:
                    "Ven aquí, mi energía vital. Me encanta cuando propones todo el rato cosas para pasarnoslo genial ♥"

            },


            cariñosa: {

                title: "An cariñosa 🫶",

                subtitle:
                    "Hoy lo único que quieres es cariño.",

                text:
                    "Estás en uno de esos días en los que un abrazo, estar juntos y sentirte querida pueden arreglar prácticamente cualquier cosa. Hoy necesitas a tu persona favorita (yo jsjsjs) cerca.",

                message:
                    "Ven, mi chica. Hoy voy darte todos los mimos que quieras ♥"

            },


            caliente: {

                title: "An caliente 🔥",

                subtitle:
                    "En que piensas eh an... 👀",

                text:
                    "Hoy estás especialmente cariñosa, toquetenando y con ganas de estar muy, muy cerca de mí. A lo mejor es hora de ir a la habitación y apagar la luz...",

                message:
                    "Creo que ya sé por qué has respondido así..."

            },


            pensativa: {

                title: "An pensativa 🌙",

                subtitle:
                    "Hoy estás en tu mundo.",

                text:
                    "Estás tranquila, pensando en tus cosas y dejando que tu cabeza vaya por donde quiera. Quizá te apetezca música, reels, estar tumbada o simplemente perderte un rato en tus pensamientos.",

                message:
                    "Aunque estés en tu mundo, espero poder formar parte de él ♥"

            }

        };


        const selectedResult = results[winner];


        /*
         * Mostramos el resultado.
         */

        result.hidden = false;

        result.innerHTML = `

            <div class="result-heart">
                ♥
            </div>

            <span class="small-title">
                TU RESULTADO
            </span>

            <h2>
                ${selectedResult.title}
            </h2>

            <h3>
                ${selectedResult.subtitle}
            </h3>

            <p>
                ${selectedResult.text}
            </p>

            <div class="result-message">
                ${selectedResult.message}
            </div>

            <div class="result-score">
                ${highestScore} de 6 respuestas coinciden
                con esta versión de An.
            </div>

            <button
                type="button"
                class="button primary"
                id="retryQuiz"
            >
                Hacerlo otra vez ♥
            </button>

        `;


        /*
         * Botón para repetir el test.
         */

        const retryButton =
            document.querySelector("#retryQuiz");

        if (retryButton) {

            retryButton.addEventListener("click", function () {

                quiz.reset();

                result.hidden = true;

                result.innerHTML = "";

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            });

        }


        /*
         * Bajamos suavemente hasta el resultado.
         */

        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        /*
         * Corazones extra al aparecer el resultado.
         */

        for (let i = 0; i < 15; i++) {

            setTimeout(function () {

                if (typeof createHeart === "function") {
                    createHeart();
                }

            }, i * 100);

        }

    });

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

                if (finalText) {

                    finalText.textContent =
                        "Creo que ya sabes cuál es la respuesta correcta... 😌💗";

                }


                noButton.style.opacity =
                    "0";


                noButton.style.pointerEvents =
                    "none";

            }

            else {

                if (finalText) {

                    finalText.textContent =
                        "Esa respuesta parece que no funciona. Prueba la otra 👀";

                }

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


            if (finalText) {

                finalText.innerHTML =

                    `

                    Sabía que dirías que sí. ♥
                    <br><br>
                    Te quiero muchísimo, An.

                    `;

            }


            noButton.style.display =
                "none";


            /*
             * LLUVIA DE CORAZONES
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
