
riot.tag2('app', '<header> <util-header status="normal"></util-header> </header> <div class="wrap-content"> <content></content> <modal-content></modal-content> </div>', 'app,[data-is="app"]{display:block;width:100%;height:100vh} app .wrap-content,[data-is="app"] .wrap-content{position:relative;display:block;width:100%;height:calc(100% - 96px);top:48px;overflow-x:hidden} app .wrap-content content,[data-is="app"] .wrap-content content{display:block;position:absolute;z-index:1;width:100%;height:100%;overflow:scroll;-webkit-overflow-scrolling:touch;overflow-scrolling:touch;top:0;left:0;background:#fff;transition:all .4s;opacity:0} app .wrap-content .not-opacity,[data-is="app"] .wrap-content .not-opacity{opacity:1} app .wrap-content modal-content,[data-is="app"] .wrap-content modal-content{display:block;position:absolute;z-index:2;width:100%;height:100%;overflow:scroll;-webkit-overflow-scrolling:touch;overflow-scrolling:touch;top:0;background:#fff;transition:all .4s;opacity:0;left:100%} app .wrap-content .show,[data-is="app"] .wrap-content .show{opacity:1;left:0}', '', function(opts) {
    var self = this;

    this.contents = {
      test: {
        title: 'title',
        body: 'body',
        label: 'link label',
      },
    };
});

riot.tag2('item-user-profile', '<div class="wrap-item"> <div class="wrap-title f fm flex-between" onclick="{toggle}"> <div class="wrap-label pb4 f fm"><img class="down-icon mr8" src="./img/icon/down.svg"> <p>{opts.content.label}</p> </div> <div class="wrap-add f fm"><img onclick="{toAddProfile.bind(this, opts.content.uid)}" src="./img/icon/add.svg"></div> </div> <div class="wrap-profile pt8"> <p class="mr2">{opts.content.content}</p> </div> </div>', 'item-user-profile,[data-is="item-user-profile"]{display:block} item-user-profile .wrap-item .wrap-title,[data-is="item-user-profile"] .wrap-item .wrap-title{margin:0 auto;width:90%;border-bottom:solid .6px rgba(0,0,0,0.2)} item-user-profile .wrap-item .wrap-title .wrap-label img,[data-is="item-user-profile"] .wrap-item .wrap-title .wrap-label img{width:18px;transform:rotate(0deg);transition:all .2s} item-user-profile .wrap-item .wrap-title .wrap-label img.active,[data-is="item-user-profile"] .wrap-item .wrap-title .wrap-label img.active{transform:rotate(180deg) !important} item-user-profile .wrap-item .wrap-title .wrap-add img,[data-is="item-user-profile"] .wrap-item .wrap-title .wrap-add img{width:18px} item-user-profile .wrap-item .wrap-profile,[data-is="item-user-profile"] .wrap-item .wrap-profile{width:90%;margin:0 auto;display:none}', 'class="mb18"', function(opts) {
    var self = this;

    this.on('mount', function() {

    });

    this.toggle = function() {
      console.log('toggle');

      var $root = $(this.root);
      $root.find('.wrap-profile').slideToggle(200);
      $root.find('.down-icon').toggleClass('active');

    }

    this.toAddProfile = function(uid, e) {
      e.stopPropagation();

      riot.profileContentToEdit = opts.content;

      window.location.href = './#edit-profile';
    }
});

riot.tag2('module-user-account', '<div class="wrap-module py30"> <div class="wrap-img mb20"><img riot-src="{opts.content.photoUrl + \'?width=320&amp;amp;height=320\'}" alt=""></div> <p class="name">{opts.content.name}</p> </div>', 'module-user-account .wrap-module .wrap-img,[data-is="module-user-account"] .wrap-module .wrap-img{width:140px;height:140px} module-user-account .wrap-module .wrap-img img,[data-is="module-user-account"] .wrap-module .wrap-img img{border-radius:50%} module-user-account .wrap-module .name,[data-is="module-user-account"] .wrap-module .name{font-size:16px;font-weight:500;letter-spacing:1px;text-align:center}', 'class="f fc"', function(opts) {
    var self = this;

    this.on('mount', function() {

    });

    self.update()
});

riot.tag2('module-user-list', '<div class="wrap-module py12 f fm flex-between"> <div class="wrap-img f fm"><img class="mr16" riot-src="{opts.content.photoUrl + \'?width=320&amp;amp;height=320\'}"> <p>{opts.content.name}</p> </div> <div class="wrap-icon f fm"><img src="./img/icon/next.svg"></div> </div>', 'module-user-list,[data-is="module-user-list"]{display:block;width:100%;border-bottom:solid .6px rgba(0,0,0,0.2)} module-user-list .wrap-module,[data-is="module-user-list"] .wrap-module{width:90%;margin:0 auto} module-user-list .wrap-module .wrap-img img,[data-is="module-user-list"] .wrap-module .wrap-img img{width:48px;border-radius:50%} module-user-list .wrap-module .wrap-icon,[data-is="module-user-list"] .wrap-module .wrap-icon{width:22px}', 'onclick="{toAccount}"', function(opts) {
    var self = this;

    this.on('mount', function(){

    });

    this.toAccount = function(){
      window.location.href = `./#users/${opts.content.uid}`;
    }
});

riot.tag2('module-user-profiles', '<div class="wrap-module"> <item-user-profile each="{item in userProfileContents}" content="{item}"></item-user-profile> </div>', '', '', function(opts) {
    var self = this;

    this.initUpdate = true;
    this.on('update', function(){
      if(this.opts.content && this.initUpdate){
        console.log('module update');
        var toUid = this.opts.content.uid;
        this.userProfileContents = [
          {
            categoryId: 'hobby',
            label: '趣味',
            to: toUid,
            content: 'こんな趣味',
          },
          {
            categoryId: 'hobby',
            label: '趣味',
            to: toUid,
            content: 'こんな趣味',
          },
        ];
        this.initUpdate = false;
      }
    });

});

riot.tag2('page-about', '<div class="warp-page"> <h2>About</h2> </div>', 'page-about .warp-page,[data-is="page-about"] .warp-page{display:block;width:100%;height:100%;background:#FF00FF}', '', function(opts) {
    this.on('mount', function(){

    });
});

riot.tag2('page-edit-profile', '<div class="wrap-page"> <textarea class="px4 py4" placeholder="Content..." onkeyup="{checkLetPost}" id="profileInput"></textarea> </div>', 'page-edit-profile .wrap-page,[data-is="page-edit-profile"] .wrap-page{display:block;width:100%} page-edit-profile .wrap-page textarea,[data-is="page-edit-profile"] .wrap-page textarea{width:100%;height:400px;padding:8px;outline:none}', '', function(opts) {
    var self = this;

    this.on('mount', function(){

      $('modal-content').addClass('show');
      $('modal-content').scrollTop(0);

      riot.enableFadeIn = false;

      $(document).on("custom:close", function() {
        $('modal-content').removeClass('show');
        self.unmount(true);
      });

      var textarea = document.getElementById('profileInput');
      textarea.focus();

      var button = document.getElementById('profileSaveButton');
      this.checkLetPost = function(e) {
        var value = e.target.value;
        if(value == ''){
          button.classList.remove('cta-active');
        }else{
          button.classList.add('cta-active');
        }
      }

      self.update();

      riot.enableReloadContent = false;

    });
});

riot.tag2('page-login', '<div class="wrap-page f fh"> <div class="wrap-box"> <p class="logo mb40">Truffle-Proto</p> <p class="sign_in_up mb24">Sign up / in With</p> <div class="f fc"> <div class="wrap-fb-button f fm px10 py6"><img src="./img/icon/fb.svg"> <p onclick="{login}">Facebook</p> </div> </div> </div> </div>', 'page-login .wrap-page,[data-is="page-login"] .wrap-page{width:100%;height:100%;background:#ffffff} page-login .wrap-page .logo,[data-is="page-login"] .wrap-page .logo{color:#2a2a2a;text-align:center;letter-spacing:1.4px;font-weight:800;font-size:36px} page-login .wrap-page .sign_in_up,[data-is="page-login"] .wrap-page .sign_in_up{color:#999;text-align:center;font-weight:300} page-login .wrap-page .wrap-fb-button,[data-is="page-login"] .wrap-page .wrap-fb-button{width:140px;background:#2a2a2a;border-radius:3px} page-login .wrap-page .wrap-fb-button img,[data-is="page-login"] .wrap-page .wrap-fb-button img{width:24px} page-login .wrap-page .wrap-fb-button p,[data-is="page-login"] .wrap-page .wrap-fb-button p{color:#FFF;width:100%;text-align:center;letter-spacing:1.4px;font-weight:300}', '', function(opts) {
    var self = this;

    this.on('mount', function(){

    });

    this.login = loginWithFacebook;
});

riot.tag2('page-test', '<div class="wrap-page"></div> <h2>test</h2>', 'page-test .wrap-page,[data-is="page-test"] .wrap-page{display:block;width:100%;height:100%;background:#00FFFF}', '', function(opts) {
    var self = this;

    this.on('mount', function(){
      $('modal-content').addClass('show');
      $('modal-content').scrollTop(0);

      riot.enableFadeIn = false;

      $(document).on("custom:close", function() {
        $('modal-content').removeClass('show');
        self.unmount(true);
      });
    });
});

riot.tag2('page-top', '<div class="wrap-page"> <h2>top</h2> </div>', 'page-top .wrap-page,[data-is="page-top"] .wrap-page{display:block;width:100%;height:100%;background:#FFFF00}', '', function(opts) {
    var self = this;

    this.on('mount', function(){

    });
});

riot.tag2('page-user-account', '<div class="wrap-page"> <module-user-account content="{user}"></module-user-account> <module-user-profiles content="{user}"></module-user-profiles> </div>', 'page-user-account .wrap-page,[data-is="page-user-account"] .wrap-page{display:block;width:100%}', '', function(opts) {
    var self = this;

    this.on('mount', function(){
      $('modal-content').addClass('show');
      $('modal-content').scrollTop(0);

      riot.enableFadeIn = false;

      if(location.hash != '#mypage'){
        $(document).on("custom:close", function() {
          $('modal-content').removeClass('show');
          self.unmount(true);

          riot.enableReloadContent = false;
        });
      }
    });

    var getUser = async (userId) => {
      var userDoc = await service.db.collection("users").doc(userId).get();
      var user = userDoc.data();

      self.user = user;
      self.update();
    }

    var userId = opts.content;

    getUser(userId);
});

riot.tag2('page-user-list', '<div class="wrap-page"> <module-user-list each="{item in listContents}" content="{item}"></module-user-list> </div>', 'page-user-list .wrap-page,[data-is="page-user-list"] .wrap-page{width:100%;height:100%}', '', function(opts) {
    var self = this;

    this.on('mount', function(){

    });

    var loadListContents = async () => {
      var contents = await service.db.collection("users")
        .get().then(function(querySelectors){
          var users = [];
          querySelectors.forEach(function(doc) {
            users.push(doc.data());
          });
          return users;
        });

      self.listContents = contents;
      self.update();
    }

    loadListContents();
});

riot.tag2('temp', '', '', '', function(opts) {
    this.on('mount', function(){

    });
});

riot.tag2('util-header', '<div class="wrap-util"> <div class="container f fm flex-between" if="{status == \'normal\'}"> </div> <div class="container f fm flex-between" if="{status == \'back\'}"><a class="wrap-img f fh" onclick="{toBack}"><img riot-src="{backSrc}"></a></div> <div class="container f fm flex-between" if="{status == \'add_profile\'}"><a class="wrap-img f fh" onclick="{toBack}"><img riot-src="{backSrc}"></a><a class="mr10 f fh"> <p class="cta" onclick="{saveProfile}" id="profileSaveButton">Save</p></a></div> <div class="wrap-text"> <p>{opts.label}</p> </div> </div>', 'util-header,[data-is="util-header"]{position:fixed;z-index:101;top:0;left:0;width:100%;height:48px;border-bottom:solid .6px rgba(0,0,0,0.2);background:#fff} util-header .wrap-util,[data-is="util-header"] .wrap-util{position:relative;width:100%;height:100%} util-header .wrap-util .container,[data-is="util-header"] .wrap-util .container{padding:0 4px;height:100%} util-header .wrap-util .container .wrap-img,[data-is="util-header"] .wrap-util .container .wrap-img{width:32px;height:32px;border-radius:50%;overflow:hidden} util-header .wrap-util .container .wrap-img img,[data-is="util-header"] .wrap-util .container .wrap-img img{height:100%;object-fit:cover} util-header .wrap-util .container .cta,[data-is="util-header"] .wrap-util .container .cta{color:#999;font-weight:bold;pointer-events:none} util-header .wrap-util .container .cta-active,[data-is="util-header"] .wrap-util .container .cta-active{color:#03A9F4;pointer-events:auto} util-header .wrap-util .wrap-text,[data-is="util-header"] .wrap-util .wrap-text{position:absolute;top:14px;left:0;width:100%;pointer-events:none} util-header .wrap-util .wrap-text p,[data-is="util-header"] .wrap-util .wrap-text p{width:100%;color:#2a2a2a;text-align:center}', '', function(opts) {
    var self = this;

    this.status = opts.status;

    console.log(this.status);
    this.on('mount', function(){
      if('user' in session){

        this.backSrc = './img/icon/back.svg';
        this.toBack = function() {
          window.history.back();
        }

        this.saveProfile = function() {
          console.log('save profile');
          var value = document.getElementById('profileInput').value;
          var profile = riot.profileContentToEdit;
          var profileObj = {
            categoryId: profile.categoryId,
            label: profile.label,
            from: session.user.uid,
            to: profile.to,
            content: value,
          };
          service.db.collection("profiles").set(profileObj);
        }

      }
    });

});