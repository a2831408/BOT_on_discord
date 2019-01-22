const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();
var talks = 0;
var guessnumber = false, number1 = -1, number2 = new Array();
var bingo = false;
player1 = new Object();
player2 = new Object();
var numtest = /^\d{4}$/;
const zerotonine = ["0","1","2","3","4","5","6","7","8","9"];
var jyankenlist = [];//with AI
var jyanken2 = {userid:[],user:[]};//with players
function numbergenerate(){
  var zerotonine0 = ["0","1","2","3","4","5","6","7","8","9"];
  num = new Array();
  var  index = -1;
  for(i = 0; i < 4; i++)
  {
    index = Math.floor(Math.random()*zerotonine0.length);
    num[i]= zerotonine0[index];
    zerotonine0.splice(index,1);
  }
  console.log(num);
  return num;
}//1A2B generate number

bot.on("ready" , () => {
  console.log(bot.user.tag + " is ready!!")
});


bot.on("message" , msg => {
    if(msg.content.includes("王淯"))
    {
      talks++;
      msg.channel.send("學霸被叫了" + talks + "次了!!");
    }
    if(msg.content.includes("akari"))
    msg.channel.send("はい～ゆるゆり～はじまるよ～～");
});

bot.on("message", msg =>{
  if(msg.author.id === config.ownerID && msg.content === config.prefix+"reset")
  {
    guessnumber = false;
    bingo = false;
    jyankenlist = [];
    jyanken2 = {user:[],userid:[]}
    msg.channel.send("重設完成!");
  }
});//resetdata

bot.on("message", msg =>{
  if(guessnumber && msg.author === player1 && (!isNaN(parseInt(msg.content))))
  {
    rrr = parseInt(msg.content)
    if(rrr == number1)
    {
      msg.reply("Congratulation!!You got it");
      guessnumber = false;
    }
    else if(rrr > number1 && rrr < 101)
    msg.reply("Smaller");
    else if(rrr < number1 && rrr > 0)
    msg.reply("Larger");
    return;
  }
  if(msg.content==config.prefix+"猜數字"&&(!guessnumber))
  {
    guessnumber = true;
    msg.reply("say a number from 1~100");
    number1 = Math.ceil(Math.random()*100);
    console.log(number1);
    player1 = msg.author;
  }
});//guessnumber

bot.on("message", msg =>{
  if(bingo && msg.author === player2 && (numtest.test(msg.content)))
  {
    rrrr = msg.content.substr(msg.content.search(numtest),4);
    var AAAA = 0, BBBB = 0, islegal = 0;
    for(var k = 0; k < 10; k++)//check whether the input has same number
    {
      if(rrrr.indexOf(zerotonine[k]) !== -1)
      islegal++;
    }
    if(islegal===4)
    {
      for(var i = 0; i < 4; i++)
      {
        if(rrrr.indexOf(number2[i]) === i)
        AAAA++;
        else if(rrrr.indexOf(number2[i]) !== -1)
        BBBB++;
      }
      if(AAAA === 4)
      {
        msg.reply();
        msg.channel.send({embed: {
            description: "Congratulation!!You got it",
            files: [{
              attachment : "images/akari1.JPG",
              name: "akari.JPG"
          }]
        }});
        bingo = false;
      }
      else
      msg.reply(AAAA + "A" + BBBB + "B");
    }
    return;
  }
  if(msg.content==config.prefix+"賓果"&&(!bingo))
  {
    number2 = numbergenerate();
    bingo = true;
    player2 = msg.author;
    msg.reply("輸入四個數字");
  }
});//bingo

bot.on("message", msg => {
  if(msg.content==config.prefix+"猜拳AI"&&(!jyankenlist.includes(msg.author.id)))
  {
    jyankenlist.push(msg.author.id);
    msg.author.send("輸入你出的拳(剪刀、石頭、布)");
    return;
  }
  if(jyankenlist.includes(msg.author.id)&&msg.channel.type=="dm")
  {
    var jyanken = ["剪刀", "石頭", "布"];
    var rand = Math.floor(Math.random()*3);
    while(rand--)
    jyanken.push(jyanken.shift());
    if(msg.content===jyanken[0])
    {
      msg.author.send(jyanken[0]+"\r\n再猜一次吧!!(再出一次拳)");
      console.log(msg.author.username + " 平手 " + jyanken[0]);
    }
    else if(msg.content===jyanken[1])
    {
      msg.author.send(jyanken[0]+"\r\n太強了!學霸!!");
      jyankenlist.splice(jyankenlist.indexOf(msg.author.id),1);
      console.log(msg.author.username + " 贏 " + jyanken[0]);
    }
    else if(msg.content===jyanken[2])
    {
      msg.author.send(jyanken[0]+"\r\nQQ加油下次會贏的");
      jyankenlist.splice(jyankenlist.indexOf(msg.author.id),1);
      console.log(msg.author.username + " 輸 " + jyanken[0]);
    }
  }
});//jyanken with AI

bot.on("message", msg => {
  //-----------報名遊戲--------------
  if(msg.content==config.prefix+"猜拳" &&  jyanken2.user.length === 0)
  {
    jyanken2.user.push(msg.author);
    jyanken2.userid.push(msg.author.id);
    jyanken2.user[0].jyan = 0;
    return;
  }
  if(msg.content==config.prefix+"猜拳" && (!jyanken2.user.includes(msg.author)) && jyanken2.user.length === 1)
  {
    jyanken2.user.push(msg.author);
    jyanken2.userid.push(msg.author.id);
    jyanken2.user[1].jyan = 0;
    jyanken2.user[0].send("你的對手是" + jyanken2.user[1].username + "!!\r\n輸入你出的拳(剪刀、石頭、布)");
    jyanken2.user[1].send("你的對手是" + jyanken2.user[0].username + "!!\r\n輸入你出的拳(剪刀、石頭、布)");
  }
  //-----------遊戲--------------
  if(jyanken2.userid.includes(msg.author.id)&&msg.channel.type=="dm"&&jyanken2.user.length == 2)
  {
    var k = jyanken2.userid.indexOf(msg.author.id);
    //-----------讀取出拳--------------
    if(jyanken2.user[k].jyan == 0)
    {
      if(msg.content =="剪刀")
      {
        jyanken2.user[k].jyan = 1;
        jyanken2.user[k].jyanw = "剪刀";
      }
      else if(msg.content =="石頭")
      {
        jyanken2.user[k].jyan = 2;
        jyanken2.user[k].jyanw = "石頭";
      }
      else if(msg.content =="布")
      {
        jyanken2.user[k].jyan = 3;
        jyanken2.user[k].jyanw = "布";
      }
    }
    //-----------比較輸贏--------------
    if(jyanken2.user[0].jyan != 0 &&jyanken2.user[1].jyan != 0)
    {
      var cprnum = (jyanken2.user[0].jyan - jyanken2.user[1].jyan + 3) % 3;
      if(cprnum == 0)
      {
        jyanken2.user[0].send("對方出" + jyanken2.user[1].jyanw + "\r\n平手!!再猜一次吧(再出一次拳)");
        jyanken2.user[1].send("對方出" + jyanken2.user[0].jyanw + "\r\n平手!!再猜一次吧(再出一次拳)");
        jyanken2.user[0].jyan = 0;
        jyanken2.user[1].jyan = 0;
        return;
      }
      if(cprnum == 1)
      {
        jyanken2.user[0].send("對方出" + jyanken2.user[1].jyanw + "\r\n贏了~~恭喜!!");
        jyanken2.user[1].send("對方出" + jyanken2.user[0].jyanw + "\r\n輸了QQ 下次會贏的");
      }
      else if(cprnum == 2)
      {
        jyanken2.user[1].send("對方出" + jyanken2.user[0].jyanw + "\r\n贏了~~恭喜!!");
        jyanken2.user[0].send("對方出" + jyanken2.user[1].jyanw + "\r\n輸了QQ 下次會贏的");
      }
      jyanken2 = {userid:[],user:[]};
    }
  }
});//jyanken with players

var killer = {
  userid: [], user: [], joinstart: false, klnum: 0, plnum: 0, clnum: 0, gamestart: false, night: false, channel: {},
  klo: -1, plo: -1, klr: false, plr: false, notv: 0, alnum: 0,
  renewid: function(){
    this.userid = [];
    for(var i = 0; i < this.user.length; i++)
    this.userid.push(this.user[i].id);
  },
  //分配職業
  generateplayer: function(){
    switch (this.userid.length) {
      case  6:this.klnum = 1;this.clnum = 5;               break;
      case  7:this.klnum = 1;this.clnum = 5;this.plnum = 1;break;
      case  8:this.klnum = 1;this.clnum = 6;this.plnum = 1;break;
      case  9:this.klnum = 2;this.clnum = 5;this.plnum = 2;break;
      case 10:this.klnum = 2;this.clnum = 6;this.plnum = 2;break;
      case 11:this.klnum = 2;this.clnum = 7;this.plnum = 2;break;
      case 12:this.klnum = 3;this.clnum = 6;this.plnum = 3;break;
      case 13:this.klnum = 3;this.clnum = 7;this.plnum = 3;break;
      case 14:this.klnum = 3;this.clnum = 8;this.plnum = 3;break;
      case 15:this.klnum = 3;this.clnum = 9;this.plnum = 3;break;
      case 16:this.klnum = 4;this.clnum = 8;this.plnum = 4;break;
    }
    for (i = 0; i < this.klnum ; i++)
    {
      this.user[i].role = 1;
      this.user[i].rolen = "殺手";
    }
    for (i = klnum; i < this.klnum + this.plnum ; i++)
    {
      this.user[i].role = 2;
      this.user[i].rolen = "警察";
    }
    for (i = klnum + this.clnum; i < this.user.length; i++)
    {
      this.user[i].role = 0;
      this.user[i].rolen = "平民";
    }
  },
  //加入玩家
  add: function(player){
    this.user.push(player);
    this.userid.push(player.id);
  },
  //重設遊戲
  reset: function(){
    this.user = [];
    this.userid = [];
    this.joinstart = false;
    this.klnum = 0;
    this.plnum = 0;
    this.clnum = 0;
    this.gamestart = false;
  }
};

bot.on("message", msg => {
  //申請遊戲
  if (msg.content == config.prefix + "Mafia" )
  {
    msg.channel.send("<遊戲>殺手 已受理 請開始報名");
    killer.joinstart = true;
  }
  //受理報名
  if (msg.content == config.prefix + "join" && killer.joinstart)
  {
    var newplayer = msg.author;
    if(killer.userid.includes(newplayer.id))
    {
      msg.reply("你報名過了");
      return;
    }
    if(killer.user.length > 16)
    {
      msg.reply("人數太多了喔QQ");
      return;
    }
    killer.add(newplayer);
    console.log(newplayer.username+" joined.");
  }
  //調配人數
  if (msg.content == config.prefix + "RD")
  {
    if(killer.user.length < 6)
    {
      msg.reply("你都玩人這麼少的殺手嗎 再找一些人來玩吧");
      return;
    }
    killer.channel = msg.channel;
    //隨機打亂 https://www.w3schools.com/js/js_array_sort.asp
    killer.user.sort(function(a, b){return 0.5 - Math.random()});
    killer.renewid();
    killer.night = true;
    killer.klr = false;
    killer.plr = false;
    for (var i = 0; i < killer.user.length; i++)
    {
      killer.user[i].alive = true;    //存活
      killer.user[i].check = false;   //檢查過
      killer.user[i].vote = -1;       //投給誰?
      killer.user[i].kvote = 0;       //被幾個人投票殺
      killer.user[i].pvote = 0;       //被幾個人投檢查
    }
    for (var i = 0; i < killer.klnum; i++)
    {
      killer.user[i].send("你");
      for(var j = 0; j < killer.klnum; j++)
      {
        if(i !== j)
        killer.user[i].send(", " + killer.user[j].username);
      }
      killer.user[i].send("是殺手喔!!\r\n開頭輸入"+config.prefix+"K來傳送訊息給其他殺手");
      killer.user[i].send("輸入"+config.prefix+"+玩家編號來決定要殺誰");
    }
    for (var i = killer.klnum; i < killer.klnum + killer.plnum; i++)
    {
      killer.user[i].send("你");
      for(var j = killer.klnum; j < killer.klnum + killer.plnum; j++)
      {
        if(i !== j)
        killer.user[i].send(", " + killer.user[j].username);
      }
      killer.user[i].send("是警察喔!!\r\n開頭輸入"+config.prefix+"P來傳送訊息給其他警察");
      killer.user[i].send("輸入"+config.prefix+"+玩家編號來決定要查驗誰");
    }
    for (var i = killer.klnum + killer.plnum; i < killer.userid.length; i++)
    {
      killer.user[i].send("你是平民喔!!");
    }
    killer.user.sort(function(a, b){return 0.5 - Math.random()});
    killer.renewid();
    killer.gamestart = true;
    killer.klr = 0;
    killer.plr = 0;
    killer.alnum = killer.user.length;
    msg.channel.send("遊戲開始 玩家代號如下:");
    for(var i = 0; i <= killer.user.length; i++)
    {
      msg.channel.send("[" + (i+1) + "] " + killer.user[i].username + "\r\n");
    }
    msg.channel.send("夜晚來臨");
    //這邊可以加個權限限制說話?
  }
  //遊戲開始
  if (killer.gamestart && killer.userid.includes(msg.author.id))
  {
    var index = indexOf(msg.author.id);
    if(killer.user[index].role === 1 && killer.user[index].alive)
    {
      if(msg.channel = "dm")
      {
        //傳送訊息給其他殺手
        if(msg.content.slice(0, config.prefix.length) == config.prefix)
        {
            var content = msg.content.slice(config.prefix.length);
            if(content.slice(0,1)=="K")
            {
              for(var i = 0; i < killer.user.length; i++)
              {
                if(killer.user[i].role == 1&& killer.user[i].alive)
                {
                  killer.user[i].send(killer.user[index].username + " 說:\r\n");
                  if(i !== index)
                  killer.user[i].send(msg.content.slice(1).trim());
                }
              }
              return;
            }
            //殺手投票阿
            if(!isNaN(parseInt(content)) && killer.user[index].vote == -1 && killer.night & !killer.klr)
            {
              var num = parseInt(content) - 1;
              if(num < killer.userid.length && num >= 0)
              {
                if(!killer.user[num].alive)
                {
                  msg.reply(killer.user[num].username + "已經死了喔!!");
                  return;
                }
                if(killer.user[num].role == 1)
                {
                  msg.reply(killer.user[num].username + "是殺手喔!!");
                  return;
                }
                killer.user[index].vote = num ;
                killer.user[num].kvote++;
                if(killer.klo == -1)
                {
                  killer.klo = num;
                }
                else if(killer.user[num].kvote > killer.user[killer.klo].kvote)
                {
                  killer.klo = num;
                }
              }
            }
            if(killer.user[killer.klo].kvote > killer.klnum / 2)
            {
              killer.klr = true;
              killer.user[killer.klo].alive = false;
              for(var i = 0; i < killer.userid.length; i++)
              {
                if(killer.user[i].role == 1)
                {
                  killer.user[i].send("已決定殺掉" + (killer.klo+1) + "號玩家!!");
                }
              }
              killer.alnum--;
              if(killer.user[killer.klo].role == 0)
              {
                killer.clnum--;
              }
              else
              {
                killer.plnum--;
              }
            }
        }
      }
    }
    if(killer.userid.indexOf(msg.author.id) < killer.klnum + killer.plnum)
    {
      if(msg.channel = "dm")
      {
        //傳送訊息給其他警察
        if(msg.content.slice(0, config.prefix.length) == config.prefix)
        {
            var content = msg.content.slice(config.prefix.length);
            if(content.slice(0,1) == "P")
            {
              for(var i = 0; i < killer.user.length; i++)
              {
                if(killer.user[i].role == 2&& killer.user[i].alive)
                {
                  killer.user[i].send(killer.user[index].username + " 說:\r\n");
                  if(i !== index)
                  killer.user[i].send(msg.content.slice(config.prefix.length + 1).trim());
                }
              }
              return;
            }
            //警察投票阿
            if(!isNaN(parseInt(content)) && killer.user[index].vote == -1 && killer.night & !killer.plr)
            {
              var num = parseInt(content) - 1;
              if(num < killer.userid.length && num >= 0)
              {
                if(killer.user[num].check)
                {
                  msg.reply(killer.user[num].username + "已經檢查過了喔!!");
                  return;
                }
                if(!killer.user[num].alive)
                {
                  msg.reply(killer.user[num].username + "已經死了喔!!");
                  return;
                }
                if(killer.user[num].role == 2)
                {
                  msg.reply(killer.user[num].username + "是警察喔!!");
                  return;
                }
                killer.user[index].vote = num ;
                killer.user[num].pvote++;
                if(killer.plo == -1)
                {
                  killer.plo = num;
                }
                else if(killer.user[num].pvote > killer.user[killer.plo].pvote)
                {
                  killer.plo = num;
                }
              }
            }
            if(killer.user[killer.plo].pvote > killer.plnum / 2)
            {
              killer.plr = true;
              killer.user[killer.plo].check = true;
              for(var i = 0; i < killer.userid.length; i++)
              {
                if(killer.user[i].role == 2)
                {
                  killer.user[i].send("已決定檢查" + (killer.plo+1) + "號玩家!!");
                  killer.user[i].send("檢查結果:"+ (killer.plo+1) + "號玩家身分為 " + killer.user[killer.plo].rolen);
                }
              }
            }
        }
      }
    }
    if(killer.klr && killer.plr)//夜晚到白天
    {
      killer.channel.send("白天到來\r\n昨天晚上有人死亡了 死亡的玩家為 " + (killer.klo+1) + "號玩家 " + killer.user[killer.klo].username);
      killer.channel.send("他的身分是 " + killer.user[killer.klo].rolen);
      if(killer.klnum >= killer.alnum||killer.clnum == 0||killer.plnum == 0)
      {
        killer.reset();
        killer.channel.send("遊戲結束! 殺手獲勝");
        return;
      }
      killer.night = false;
      killer.klr = false;
      killer.plr = false;
      killer.klo = -1;
      killer.plo = -1;
      killer.notv = killer.user.length;
      for(var i = 0; i < killer.userid.length; i++)
      {
        killer.user[i].vote = -1;
        killer.user[i].kvote = 0;
        killer.user[i].pvote = 0;
      }
      return;
    }
    if(!killer.night)
    {
      if(msg.content.slice(0, config.prefix.length) == config.prefix)
      {
        var content = msg.content.slice(config.prefix.length);
        if(!isNaN(parseInt(content)) && killer.user[index].vote == -1)
        {
          var num = parseInt(content) - 1;
          if(num < killer.userid.length && num >= 0)
          {
            if(!killer.user[num].alive)
            {
              msg.reply(killer.user[num].username + "已經死了喔!!");
              return;
            }
            killer.user[index].vote = num ;
            killer.user[num].kvote++;
            killer.notv--;
            if(killer.klo == -1)
            {
              killer.klo = num;
            }
            else if(killer.user[num].kvote > killer.user[killer.klo].kvote)
            {
              killer.klo = num;
            }
          }
        }
        if(killer.user[killer.klo].kvote > killer.alnum/2)
        {
          //殺人切換到晚上
          killer.channel.send("根據投票結果要殺掉的玩家為 " + (killer.klo+1) + "號玩家 " + killer.user[killer.klo].username);
          killer.channel.send("他的身分是 " + killer.user[killer.klo].rolen);
          killer.alnum--;
          killer.night = true;
          killer.klr = false;
          killer.klo = -1;
          for(var i = 0; i < killer.userid.length; i++)
          {
            killer.user[i].vote = -1;
            killer.user[i].kvote = 0;
          }
          killer.channel.send("夜晚來臨");
        }
        if(killer.user[killer.klo].kvote + killer.notv <= killer.alnum/2)
        {
          //不殺切換到晚上
          killer.channel.send("根據投票結果決定不殺掉任何玩家!!");
          killer.night = true;
          killer.klr = false;
          killer.klo = -1;
          for(var i = 0; i < killer.userid.length; i++)
          {
            killer.user[i].vote = -1;
            killer.user[i].kvote = 0;
          }
          killer.channel.send("夜晚來臨");
        }
        if(killer.klnum == 0)//結束遊戲
        {
          killer.reset();
          killer.channel.send("遊戲結束! 警察平民獲勝");
          return;
        }
      }
    }
  }
});


bot.login(config.token);
