var jsonIndex={
	liNodes:$(".nav li"),
	ddNodes:$(".navDl dd"),
	slideNode:$(".slide"),
	imgNodes:$(".slide li"),
	aNodes:$(".slide-left,.slide-right"),
	btnNode:$(".slide-btn"),
	btnNodes:$(".slide-btn li"),
	className:"btn-blue",
	interval_id:null,
	applyNodes:$(".apply_ul li"),
	className1:"liWidth",
	leftNode:$(".left"),
	leftImgNode:$(".left img"),
	leftSpanNode:$(".left span"),
	rightNode:$(".right"),
	rightBtnNodes:$(".aboutUs_btn a"),
	partnerBtnNodes:$(".partner_btn a"),
	toTopNode:$(".toTop"),
	toggle:function(obj){
		var _this=this;
		if(obj.hasClass(_this.className)){
			return;
		}
		var oldPos=_this.btnNode.find("."+_this.className).index();
		var newPos=obj.index();
		_this.slide(oldPos,newPos);
	},
	slide:function(oldPos,newPos){
		var _this=this;
		_this.btnNodes.eq(newPos).addClass(_this.className).siblings("."+_this.className).removeClass(_this.className);
		_this.imgNodes.eq(newPos).stop(false,true).fadeIn(500);
		_this.imgNodes.eq(oldPos).stop(false,true).fadeOut(500);
	},
	left:function(){
		var _this=this;
		var oldPos=_this.btnNode.find("."+_this.className).index();
		var lastPos=_this.btnNodes.length-1;
		var newPos=oldPos==0?lastPos:oldPos-1;
		_this.slide(oldPos,newPos);
	},
	right:function(){
		var _this=this;
		var oldPos=_this.btnNode.find("."+_this.className).index();
		var lastPos=_this.btnNodes.length-1;
		var newPos=oldPos==lastPos?0:oldPos+1;
		_this.slide(oldPos,newPos);
	},
	appSwitch:function(obj){
		var _this=this;
		var num=obj.index()+1;
		obj.addClass(_this.className1).siblings("."+_this.className1).removeClass(_this.className1);
		obj.addClass("li"+num+"_bg");
		obj.stop(false,true).animate({width:'330px'},500);
		_this.applyNodes.each(function(){
			var num2=$(this).index()+1;
			if(num2!=num){
				$(this).stop();
				$(this).removeClass("li"+num2+"_bg");
				$(this).stop(false,true).animate({width:'0px'},500);
			}
		})
	},
	wipeUp:function(){
		var _this=this;
		_this.leftSpanNode.stop().animate({top:'0px'},500);
		_this.leftImgNode.stop().animate({width:'540px',height:'265px',marginLeft:'-12px',marginTop:'-20px'},500);
	},
	wipeDown:function(){
		var _this=this;
		_this.leftSpanNode.stop().animate({top:'242px'},500);
		_this.leftImgNode.stop().animate({width:'491px',height:'242px',marginLeft:'0px',marginTop:'0px'},500);
	},
	moveLeft:function(){
		var _this=this;
		var rightUlNode=$(".right_ul");
		var rightLiNodes=$(".right_ul li");
		rightUlNode.append(rightLiNodes.first());
	},
	moveRight:function(){
		var _this=this;
		var rightUlNode=$(".right_ul");
		var rightLiNodes=$(".right_ul li");
		rightUlNode.prepend(rightLiNodes.last());
	},
	rollLeft:function(){
		var _this=this;
		var partnerUlNode=$(".partner_ul");
		var partnerLiNodes=$(".partner_ul li");
		partnerLiNodes.first().stop(false,true).animate({marginLeft:'-202px'},200,function(){
			partnerUlNode.append($(this));
			$(this).css('marginLeft','0px');
		})
	},
	rollRight:function(){
		var _this=this;
		var partnerUlNode=$(".partner_ul");
		var partnerLiNodes=$(".partner_ul li");
		partnerLiNodes.last().css('marginLeft','-202px').prependTo(partnerUlNode).stop(false,true).animate({marginLeft:'0px'},200);
	},
	toTop:function(){
		var _this=this;
		$('html,body').animate({scrollTop:0},200,function(){
			_this.toTopNode.fadeOut();
		});
		
	},
	init:function(){
		var _this=this;
		//导航栏
		_this.liNodes.each(function(){
			$(this).mouseenter(function(){
				$(this).find("dl:first").stop().slideDown();
			})
		});
		_this.liNodes.each(function(){
			$(this).mouseleave(function(){
				$(this).find("dl:first").stop().slideUp();
			})
		});
		_this.ddNodes.each(function(){
			$(this).mouseenter(function(){
				$(this).find("dl:first").stop().slideDown();
				$(this).find('.nav_dl').parents('dd').find('a:first').addClass('navdl_cur');
			});
		});
		_this.ddNodes.each(function(){
			$(this).mouseleave(function(){
				$(this).find("dl:first").stop().slideUp();
				$(this).find('.nav_dl').parents('dd').find('a:first').removeClass('navdl_cur');
			});
		});
		//幻灯片
		_this.slideNode.mouseenter(function(){
			_this.aNodes.show();
			clearInterval(_this.interval_id);
		});
		_this.slideNode.mouseleave(function(){
			_this.aNodes.hide();
			_this.interval_id=setInterval(function(){
				_this.right();
			},3000)
		});
		_this.btnNodes.mouseenter(function(){
			_this.toggle($(this));
		});
		_this.aNodes.eq(0).click(function(){
			_this.left();
		});
		_this.aNodes.eq(1).click(function(){
			_this.right();
		});
		_this.interval_id=setInterval(function(){
			_this.right();
		},3000)
		//球
		_this.applyNodes.each(function(){
			$(this).mouseenter(function(){
				_this.appSwitch($(this));
			})
		});
		//左边
		_this.leftNode.mouseenter(function(){
			_this.wipeUp();
		});
		_this.leftNode.mouseleave(function(){
			_this.wipeDown();
		});
		//右边
		_this.rightBtnNodes.eq(0).click(function(){
			_this.moveLeft();
		});
		_this.rightBtnNodes.eq(1).click(function(){
			_this.moveRight();
		});
		//滚动条
		_this.partnerBtnNodes.eq(0).click(function(){
			_this.rollLeft();
		});
		_this.partnerBtnNodes.eq(1).click(function(){
			_this.rollRight();
		});
		//totop
		_this.toTopNode.click(function(){
			_this.toTop();
		})
		var winH=parseInt($(window).height());
		$(window).scroll(function(){
			var scrollH=$(this).scrollTop();
			if(scrollH>=winH)
			{
				_this.toTopNode.fadeIn();
			}
			else
			{
				_this.toTopNode.fadeOut();
			}
		});
		//产品页
		$('.product_main').isotope({
			itemSelector: '.product_main li'
		});
		
		$('.product_tit li').click(function(){
			$(this).addClass('product_cur').siblings('li').removeClass('product_cur');
			var dataValue=$(this).attr('data');
			$('.product_main').isotope({
				itemSelector: '.product_main li',
				filter:dataValue
			});
		});
	}
}
jsonIndex.init();

