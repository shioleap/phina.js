th.describe("asset.Sound", function() {
  th.it('init', function() {
    var sound = phina.asset.Sound();
    sound.loadFromBuffer();
    sound.play();
  });
  th.it('sound', function() {
    var path = '../../assets/sounds/correct.mp3';
    phina.asset.Sound().load(path).then(function(s) {
      s.clone().play();
    });
  });

  th.it('oscillator', function() {
    var sound = phina.asset.Sound();
    sound._oscillator();
    sound.play();
  });

  th.it('fromAudio', function() {
    var path = 'https://mdn.github.io/media-source-buffer/viper.mp3';
    var path = '../../assets/sounds/lo_002.mp3';
    var sound = phina.asset.Sound();

    var audio = new Audio();
    audio.addEventListener('loadstart', function() {
      // var source = sound.context.createMediaElementSource(audio);
      // source.connect(sound.context.destination);
      // source.start(0);
      audio.play();
    });

    audio.src = path;
  })
});

th.describe("asset.AssetLoader", function() {

  th.it('load', function() {
    var loader = phina.asset.AssetLoader();
    var flow = loader.load({
      image: {
        'tomapiko': '../../assets/images/tomapiko.png',
        'tomapiko_min': '../../assets/images/tomapiko_min.png',
      },
      sound: {
        'correct': '../../assets/sounds/correct.mp3',
      },
    });

    flow.then(function() {
      var elm = phina.display.Sprite('tomapiko').addChildTo(this);
      elm.x = 100;
      elm.y = 100;

      var sound = phina.asset.AssetManager.get('sound', 'correct');
      var temp = sound.clone();
      temp.play();

      this.onpointstart = function(app) {
        var temp = sound.clone();
        temp.play();
        elm.x = app.pointer.x;
        elm.y = app.pointer.y;
      };
    }.bind(this));
  });

});