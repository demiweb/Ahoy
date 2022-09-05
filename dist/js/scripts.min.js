var allLazyLoad = [...document.querySelectorAll('.lazyload')];

function allLozadImg() {
    allLazyLoad.forEach((el) => {
        var observer = lozad(el); // passing a `NodeList` (e.g. `document.querySelectorAll()`) is also valid
        observer.observe();
        el.addEventListener('load', () => {
            el.classList.add('is-loaded')
        })
        // if (el.loaded()) {
        //     el.classList.add('is-loaded');
        // }
    })
}

allLozadImg();

//add counting number to show delay speed
var counterContainer = [...document.querySelectorAll('.counting-delay')];

function addCoutingDelay() {
    if (counterContainer.length) {
        counterContainer.forEach((cont) => {
            var anims = [...cont.children];
            console.log(anims);
            anims.forEach((btn, k) => {
                btn.classList.add('anim');
                btn.dataset.animDelay = k * 100;
            })
        })
    }
}

addCoutingDelay();


// scroll animations
var anim = document.querySelectorAll('.anim')

function scrollAnimations() {
    if (anim.length) {
        var observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                var el = entry.target
                if (entry.isIntersecting) {
                    if (el.classList.contains('anim-js')) {

                    } else {
                        el.style.animationDelay = el.dataset.animDelay + 'ms';
                        el.style.animationDuration = el.dataset.animDuration + 'ms';
                        el.style.animationName = el.dataset.anim;
                    }


                    el.classList.add('done');
                    observer.unobserve(entry.target);
                }

            })
        }, {threshold: .5});
        if (window.innerWidth > 991) {
            anim.forEach(animate => {
                observer.observe(animate)
            })
        } else {

            anim.forEach(animate => {

                observer.observe(animate)


            })
        }
    }
}


scrollAnimations();


function progressBarScroll(btn, numb, perc) {
    document.querySelector(`.progress--${numb} .line p`).style.width = perc + "%";
}

let pageSections = [...document.querySelectorAll('.page-section')];

function getSectionScrolled() {
    if (pageSections.length) {
        pageSections.forEach((btn, k) => {
            let number = btn.dataset.sec;
            let scrollet = btn.getBoundingClientRect().top;
            let heigh = btn.offsetHeight;
            let visible = heigh - scrollet;
            let percentage = (visible / heigh) * 100;
            btn.dataset.part = percentage;
            if (percentage >= 0) {

            } else {
                percentage = 0;
            }

            // console.log(scrollet + ' -- scroll to top == ' + number);
            progressBarScroll(btn, number, percentage);
        })
    }
}

// Get all sections that have an ID defined
const sections = document.querySelectorAll(".page-section");

// Add an event listener listening for scroll

function navHighlighter() {

    // Get current scroll position
    let scrollY = window.pageYOffset;

    // Now we loop through sections to get height, top and ID values for each
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - (sectionHeight / 2.5);
        sectionId = current.dataset.sec;

        if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
        ) {
            console.log(sectionId);
            document.querySelector(".progress--1 .text p small").innerHTML = `0${sectionId}`;
        }
    });
}

let progressBtns = [...document.querySelectorAll('.progress')];

function goToSectionProg() {
    if (progressBtns.length) {
        progressBtns.forEach((btn) => {
            let numb = btn.dataset.prog;
            let el = document.querySelector(`section[data-sec="${numb}"]`);
            btn.addEventListener('click', () => {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(el).offset().top
                }, 500);
            })
        })
    }
}
goToSectionProg();

let bgGlobal = document.querySelector('.background-global');

function getFullHeightOfPage() {
    if (bgGlobal) {
        let fullHeight = document.body.offsetHeight;
        bgGlobal.style.height = fullHeight + 'px';
    }
}
getFullHeightOfPage();
function progressBarScrollFull() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
        height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
        scrolled = (winScroll / height) * 100;
    document.querySelector(".full-progress p").style.width = scrolled + "%";
}
window.onscroll = function () {
    getSectionScrolled();
    navHighlighter();
    progressBarScrollFull()
};
window.onresize = function () {
    getFullHeightOfPage();
};
progressBarScrollFull()
getSectionScrolled();

//sliders
let clientsSlides = [...document.querySelectorAll('.our-clients__slider')];

function clientsSlider() {
    if (!clientsSlides.length) {

    } else {
        clientsSlides.forEach((sld) => {
            let sldCont = sld.querySelector('.our-clients__slides-cont');
            let sldScrl = sld.querySelector('.bar-cont');

            const swiper2 = new Swiper(sldCont, {
                // Optional parameters
                loop: false,

                slidesPerView: 1,
                speed: 600,
                direction: "horizontal",
                spaceBetween: 0,
                scrollbar: {
                    el: sldScrl,
                    hide: false,
                    draggable: true,
                },
                breakpoints: {
                    767: {
                        forceToAxis: false,
                        direction: 'vertical',
                    }
                }
                // autoplay: {
                //     delay: 4000,
                //     pauseOnMouseEnter: true,
                // },


            });
        })
    }
}

clientsSlider();

//sliders

// change text class li

let liText = [...document.querySelectorAll('.service__text ul li')];

function changeActiveLi() {
    if (liText.length) {
        let activeI = 0;
        let length = liText.length - 1;

        setInterval(() => {
            if (document.querySelector('.service__text ul li.active')) {
                document.querySelector('.service__text ul li.active').classList.remove('active');

                liText[activeI].classList.add('active');
            } else {
                liText[activeI].classList.add('active');
            }
            activeI += 1;
            if(activeI > length) {
                activeI = 0;
            }
        }, 1100)
    }
}

changeActiveLi();

// change text class li


let btnVideoPlay = document.getElementById('play-btn');

function checkWhatVideoType() {
    if (btnVideoPlay) {
        if (btnVideoPlay.classList.contains('vimeo')) {

            var player2 = new Vimeo.Player(document.querySelector('#vimeo-player'));
            btnVideoPlay.addEventListener('click', () => {
                if (btnVideoPlay.classList.contains('pause')) {
                    player2.pause();
                    btnVideoPlay.classList.remove('pause');
                    document.querySelector('.video-box').classList.remove('hide-poster');
                } else {
                    player2.play();
                    btnVideoPlay.classList.add('pause');
                    document.querySelector('.video-box').classList.add('hide-poster');
                }
            });
        }
        else {
            var tag = document.createElement("script");
            tag.src = "//www.youtube.com/player_api";
            var firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            var player;

// this function gets called when API is ready to use
            function onYouTubePlayerAPIReady() {
                // create the global player from the specific iframe (#video)
                player = new YT.Player("video-player", {
                    events: {
                        // call this function when player is ready to use
                        onReady: onPlayerReady
                    }
                });
            }

            function onPlayerReady(event) {
                // bind events
                var playButton = document.getElementById("play-btn");
                playButton.addEventListener("click", function () {

                    if (playButton.classList.contains('pause')) {
                        player.pauseVideo();
                        playButton.classList.remove('pause');
                        document.querySelector('.video-box').classList.remove('hide-poster');
                    } else {
                        player.playVideo();
                        playButton.classList.add('pause');
                        document.querySelector('.video-box').classList.add('hide-poster');
                    }
                });



            }

            onYouTubePlayerAPIReady();
        }
    }

}

checkWhatVideoType();
// Inject YouTube API script




var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom - 40 <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
let scrollItem = document.querySelector('.contacts-footer');
function ifHaveScrollItem() {
    if (scrollItem) {
        $(window).scroll(function (e) {
            $el = $('.footer');
            $el.toggleClass('scroll', $(this).scrollTop() > 32);

        });
        window.addEventListener('scroll', function (event) {
            if (isInViewport(scrollItem)) {
                document.querySelector('.footer').classList.add('hide');
            } else {
                document.querySelector('.footer').classList.remove('hide');

            }
        }, false);
    }
}
ifHaveScrollItem();







