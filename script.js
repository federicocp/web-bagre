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
  var pp = $('#pagepiling');
  pp
    .append
    //'<div class="section" id="cover"><h1>Lovely images for a lovely page</h1></div>'
    ();
  for (var i = 0; i < reels; i++) {
    pp.append(
      '<div class="section" id="section"' +
        i +
        '>' +
        '<div id="youtubeEmbed' +
        i +
        '" class="hero_video" data-video-id="' +
        reel[i].vID +
        '">' +
        '</div>'
    );
  }

  //init PP
  var lastSection = -1;
  pp.pagepiling({
    menu: null,
    direction: 'vertical',
    verticalCentered: true,
    sectionsColor: [],
    anchors: [],
    scrollingSpeed: 700,
    easing: 'swing',
    loopBottom: false,
    loopTop: false,
    css3: true,
    navigation: {
      textColor: '#fff',
      bulletsColor: '#fff',
      position: 'right',
      tooltips: ['section1', 'section2', 'section3', 'section4'],
    },
    normalScrollElements: null,
    normalScrollElementTouchThreshold: 5,
    touchSensitivity: 5,
    keyboardScrolling: true,
    sectionSelector: '.section',
    animateAnchor: true,
    sectionsColor: ['#FF6655'],

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

  //CREATE VIDEOS
  var players = [];
  onYouTubeIframeAPIReady = function () {
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
      enablejsapi: 1,
      //start: startSeconds,
      //end: endSeconds
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
            //e.target.seekTo(0);
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
        player.addEventListener('onReady', playFirst);
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
