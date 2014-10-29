var MainLayer = cc.LayerColor.extend({
	init:function()
	{
		//初始化界面
		 //0:点击开始界面 1:表示等待界面，2:表示在点击界面 3:结果界面 4:Too soon界面
		this.flag = 0;
		this._super();
		this.size = cc.Director.getInstance().getWinSize();
		this.setColor(cc.c4(180,170,160,255));
		this.showToStart();
		
		//可触摸
		this.setTouchEnabled(true);
	},

	/////////////////////////////////////////////////
	//处理触摸事件
	/////////////////////////////////////////////////
	onTouchesEnded:function(touches,event)
	{

	},
	onTouchesBegan:function(touches,event)
	{
		cc.log("onTouchsBegan",this.flag);
		switch(this.flag)
		{
			case 0:this.showWaite();break;
			case 1:this.showToSoon();break;
			case 2:this.showResult();break;
			case 3:this.showWaite();break;
			case 4:this.showWaite();break;
		}

	},
	//显示点击开始界面
	showToStart:function()
	{
		this.sprite = cc.Sprite.create(s_ClickToStart);
		this.sprite.setPosition(this.size.width/2,this.size.height/2);
		this.addChild(this.sprite,1);
		this.flag = 0;
		
	},

	//显示等待界面
	showWaite:function()
	{
		cc.log("showWaite");
		this.removeAllChildren();//清除所有控件
		this.unscheduleAllCallbacks();//清除定时器
		this.sprite = cc.Sprite.create(s_WaiteForGreen);
		this.sprite.setPosition(this.size.width/2,this.size.height/2);
		this.addChild(this.sprite,1);
		this.anim = cc.Sprite.create(s_WaiteForGreenAnim)
		this.anim.setPosition(this.size.width/2,this.size.height/2+200);
		this.addChild(this.anim,1);
		var action = cc.Sequence.create(cc.FadeOut.create(1.0),cc.FadeIn.create(1.0));
		var rep = cc.RepeatForever.create(action);
		this.anim.runAction(rep);
		this.flag = 1;
		//输出1-10的随机数
		randomTime = Math.floor(Math.random()*10+1);
		this.schedule(this.showGreen,randomTime,1,0); //添加定时器
		cc.log("randomTime",randomTime);
	},
	//显示点击的页面
	showGreen:function()
	{
		cc.log("showGreen");
		this.sprite = cc.Sprite.create(s_Click);
		this.sprite.setPosition(this.size.width/2,this.size.height/2);
		this.addChild(this.sprite,1);
		this.flag = 2;
		this.date1 = new Date();//颜色变化后，记录一个时间
	},

	showToSoon:function()
	{
		cc.log("showToSoon");
		this.unscheduleAllCallbacks();
		this.sprite = cc.Sprite.create(s_TooSoon);
		this.sprite.setPosition(this.size.width/2,this.size.height/2);
		this.addChild(this.sprite,1);
		this.flag = 3;
	},
	//显示结果界面
	showResult:function()
	{
		this.unscheduleAllCallbacks();
		this.date2 = new Date();
		time = this.date2.getTime() - this.date1.getTime();
		this.sprite = cc.Sprite.create(s_Result);
		this.sprite.setPosition(this.size.width/2,this.size.height/2);
		this.addChild(this.sprite,1);
		cc.log("showResult",time);
		this.timeLabel = cc.LabelTTF.create(time+"ms","Arial",70);
		this.timeLabel.setColor(255,255,255);
		this.timeLabel.setPosition(this.size.width/2,this.size.height/2)
		this.addChild(this.timeLabel,1);
		this.flag = 4;
	}
});

///////////////////////////////////////////////////
var MainScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new MainLayer();
		layer.init()
		this.addChild(layer);
	}
});