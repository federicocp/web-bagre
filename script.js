$(document).ready(function () {
  //init hamburguer
  var $menu = $('#menu'),
    $menulink = $('.menu-link');

  $menulink.click(function () {
    $menulink.toggleClass('open');
    $menu.toggleClass('open');
    return false;
  });

  // Add YouTube API script
  var tag = document.createElement('script');
  tag.src = 'https://youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  //create DOM
  var reels = reel.length;
  var fp = $('#fullpage');
  for (var i = 0; i < reels; i++) {
    /*
    fp.append(
      '<div class="section" id="section' +
        i +
        '">' +
        '<div id="youtubeEmbed' +
        i +
        '" class="hero_video" data-video-id="' +
        reel[i].vID +
        '">' +
        '</div>'
    );
    */
    fp.append('<div class="section">Seccion '+i+'</div>')
  }

  // INIT FULLPAGE.JS

  fp.fullpage({
    // Navigation
    //menu: '#menu',
    //lockAnchors: false,
    //anchors: ['firstPage', 'secondPage'],
    navigation: false,
    navigationPosition: 'right',
    //navigationTooltips: ['firstSlide', 'secondSlide'],
    showActiveTooltip: false,
    slidesNavigation: false,
    slidesNavPosition: 'bottom',

    sectionsColor : ['#ccc', '#fff'],

    // Scrolling
    css3: true,
    scrollingSpeed: 700,
    autoScrolling: true,
    fitToSection: true,
    fitToSectionDelay: 600,
    scrollBar: false,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    loopBottom: false,
    loopTop: false,
    loopHorizontal: true,
    continuousVertical: false,
    continuousHorizontal: false,
    scrollHorizontally: false,
    interlockedSlides: false,
    dragAndMove: false,
    offsetSections: false,
    resetSliders: false,
    fadingEffect: false,
    normalScrollElements: '#element1, .element2',
    scrollOverflow: true,
    scrollOverflowMacStyle: false,
    scrollOverflowReset: false,
    touchSensitivity: 15,
    bigSectionsDestination: null,

    // Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,

    // Design
    controlArrows: false,
    controlArrowsHTML: [
      '<div class="fp-arrow"></div>',
      '<div class="fp-arrow"></div>',
    ],
    verticalCentered: true,
    sectionsColor: ['#ccc', '#aaa','#fcd', '#h12',],
    //paddingTop: '3em',
    //paddingBottom: '10px',
    //fixedElements: '#header, .footer',
    responsiveWidth: 0,
    responsiveHeight: 0,
    responsiveSlides: false,
    parallax: false,
    parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate' },
    dropEffect: false,
    dropEffectOptions: { speed: 2300, color: '#F82F4D', zIndex: 9999 },
    waterEffect: false,
    waterEffectOptions: { animateContent: true, animateOnMouseMove: true },
    cards: false,
    cardsOptions: { perspective: 100, fadeContent: true, fadeBackground: true },

    // Custom selectors
    sectionSelector: '.section',
    slideSelector: '.slide',

    lazyLoading: true,
    observer: true,
    credits: {
      enabled: false,
      label: ' ',
      position: 'right',
    },

    // Events
    beforeLeave: function (origin, destination, direction, trigger) {},
    onLeave: function (origin, destination, direction, trigger) {},
    afterLoad: function (origin, destination, direction, trigger) {},
    afterRender: function () {},
    afterResize: function (width, height) {},
    afterReBuild: function () {},
    afterResponsive: function (isResponsive) {},
    afterSlideLoad: function (
      section,
      origin,
      destination,
      direction,
      trigger
    ) {},
    onSlideLeave: function (
      section,
      origin,
      destination,
      direction,
      trigger
    ) {},
    onScrollOverflow: function (section, slide, position, direction) {},
  });

  //init PP
  /*
  var lastSection = -1;
  pp.pagepiling({
    //events
    onLeave: function (index, nextIndex, direction) {
      console.log(index + '/' + nextIndex);
      //players[index - 1].pauseVideo();
      players[index - 1].mute();
      players[nextIndex - 1].playVideo();
      players[nextIndex - 1].unMute();
      lastSection = index - 1;
    },
    afterLoad: function (anchorLink, index) {
      //console.log("afterLoad: "+lastSection+" - "+index);
      if (lastSection > -1) {
        players[lastSection].pauseVideo();
      }
    },
    afterRender: function () {},
  });
  */

  //CREATE VIDEOS
  var players = [];
  _onYouTubeIframeAPIReady = function () {
    var playerVars = {
      autoplay: 0, // Auto-play the video on load
      autohide: 1, // Hide video controls when playing
      disablekb: 1,
      controls: 0, // Hide pause/play buttons in player
      showinfo: 0, // Hide the video title
      modestbranding: 1, // Hide the Youtube Logo
      loop: 1, // Run the video in a loop
      fs: 0, // Hide the full screen button
      rel: 0,
      enablejsapi: 0,
      start: 300,
      end: 350
    };

    for (var i = 0; i < reels; i++) {
      pv = playerVars;
      if (i == 0) {
        pv.autoplay = 1;
      }
      player = new YT.Player('youtubeEmbed' + i, {
        videoId: reel[i].vID, // YouTube Video ID
        playerVars: playerVars,
        events: {
          onReady: function (e) {
            //e.target.pauseVideo();
            e.target.seekTo(300);
            e.target.mute()
          },
          onStateChange: function (e) {
            if (e.data === YT.PlayerState.PLAYING) {
              //document.getElementById("youtubeEmbed").classList.add("loaded");
            }

            if (e.data === YT.PlayerState.ENDED) {
              // Loop from starting point
              e.target.seekTo(0);
            }
          },
        },
      });
      if (i == 0) {
        //player.addEventListener('onReady', playFirst);
      }
      players.push(player);
    }
  };
});

function playFirst(e) {
  //console.log("playing first: "+$(e.target))
  e.target.playVideo();
  e.target.unMute();
  e.target.removeEventListener('onReady', playFirst);
}
