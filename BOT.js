const Discord = require("discord.js");
const config = require("./config.json");
const ytdl = require("ytdl-core");
const bot = new Discord.Client();
var talks = 0;
var guess = {dm:{}};//guessnumber data
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
    if(msg.content.includes("王淯")&&(!msg.content.includes("鄭丞傑")))
    {
      talks++;
      msg.channel.send("學霸被叫了" + talks + "次了!!");
    }
    if(msg.content == "akari")
    {
      msg.channel.send("は～い！ ゆるゆり、はっじまっるよ～！！");
    }
    if(msg.content == "explosion")
    {
      if (msg.member.voiceChannel) {
        msg.member.voiceChannel.join()
          .then(connection => {
            const explo = connection.playFile("D:\\node.js\\discord.js\\voice\\explosion.mp3");
            msg.channel.send("黒より黒く闇より暗き漆黒に我が深紅の混淆を望みたもう。");
            setTimeout(()=>{msg.channel.send("覚醒のとき来たれり。");},8000);
            setTimeout(()=>{msg.channel.send("無謬の境界に落ちし理。");},10000);
            setTimeout(()=>{msg.channel.send("無行の歪みとなりて現出せよ！");},13000);
            setTimeout(()=>{msg.channel.send("踊れ踊れ踊れ、");},15000);
            setTimeout(()=>{msg.channel.send("我が力の奔流に望むは崩壊なり。");},18000);
            setTimeout(()=>{msg.channel.send("並ぶ者なき崩壊なり。");},22000);
            setTimeout(()=>{msg.channel.send("万象等しく灰塵に帰し、深淵より来たれ！");},24000);
            setTimeout(()=>{msg.channel.send("これが人類最大の威力の攻撃手段、これこそが究極の攻撃魔法、");},28000);
            setTimeout(()=>{msg.channel.send("エクスプロージョン！");},35000);
          })
          .catch(console.log);
      }
    }
});

bot.on("message", msg =>{
  if(msg.author.id === config.ownerID && msg.content === config.prefix+"reset")
  {
    guess = {dm:{}};
    bingo = false;
    jyankenlist = [];
    jyanken2 = {user:[],userid:[]}
    msg.channel.send("重設完成!");
  }
});//resetdata

bot.on("message", msg =>{
  if((!isNaN(parseInt(msg.content))))
  {
    rrr = parseInt(msg.content);
    if(msg.guild)
    {
      if(!guess.hasOwnProperty(msg.guild.id))
      guess[msg.guild.id] = {};
      if(guess[msg.guild.id].hasOwnProperty(msg.author.id))
      {
        if(rrr < 101 && rrr > 0)
        {
          if(rrr == guess[msg.guild.id][msg.author.id])
          {
            delete guess[msg.guild.id][msg.author.id];
            return msg.reply("Congratulation!!You got it");
          }
          return rrr > guess[msg.guild.id][msg.author.id] ? msg.reply("Smaller"):msg.reply("Larger");
        }
      }
    }
    if(msg.channel.type==="dm" && guess.dm.hasOwnProperty(msg.author.id))
    {
      if(rrr < 101 && rrr > 0)
      {
        if(rrr == guess.dm[msg.author.id])
        {
          delete guess.dm[msg.author.id];
          return msg.channel.send("Congratulation!!You got it");
        }
        return rrr > guess.dm[msg.author.id] ? msg.channel.send("Smaller"):msg.channel.send("Larger");
      }
    }
  }
  if(msg.content==config.prefix+"猜數字")
  {
    if(msg.guild)
    {
      if(!guess.hasOwnProperty(msg.guild.id))
      guess[msg.guild.id] = {};
      if(guess[msg.guild.id].hasOwnProperty(msg.author.id))
      return msg.reply("You have already joined the game.");
      guess[msg.guild.id][msg.author.id] = Math.ceil(Math.random()*100);
      console.log(msg.guild.name +" "+ msg.author.username + " " + guess[msg.guild.id][msg.author.id]);
      return msg.reply("say a number from 1~100");
    }
    if(msg.channel.type==="dm")
    {
      if(guess.dm.hasOwnProperty(msg.author.id))
      return msg.channel.send("You have already joined the game.");
      guess.dm[msg.author.id] = Math.ceil(Math.random()*100);
      console.log(msg.author.username + " dm " + guess.dm[msg.author.id]);
      return msg.channel.send("say a number from 1~100");
    }
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
    this.klr = false;
    this.plr = false;
    this.klo = -1;
    this.plo = -1;
  }
};

bot.on("message", msg => {
  //申請遊戲
  if (msg.content == config.prefix + "Mafia" && msg.channel.type == "text" && (!killer.joinstart))
  {
    msg.channel.send("<遊戲>殺手 已受理 請開始報名");
    killer.joinstart = true;
    killer.channel = msg.channel;
  }
  //受理報名
  if (msg.content == config.prefix + "join" && killer.joinstart && msg.channel==killer.channel)
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
  if (msg.content == config.prefix + "RD" && msg.channel==killer.channel && killer.joinstart)
  {
    if(killer.user.length < 6)
    {
      msg.reply("你都玩人這麼少的殺手嗎 再找一些人來玩吧");
      return;
    }
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
    killer.joinstart = false;
    killer.klo = -1;
    killer.plo = -1;
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
            //殺手取消投票
            if(content.slice(0,1)=="C" && killer.user[index].vote != -1)
            {
              killer.user[index].kvote--;
              if(killer.user[index].vote == killer.plo)
              {
                for(var i = 0; i < killer.userid.length; i++)
                {
                  if(killer.user[i].pvote > killer.user[killer.plo].pvote)
                  killer.plo = i;
                }
              }
              killer.user[index].vote = -1;
              msg.author.send("已取消投票!!");
            }
            //殺手投票阿
            if(!isNaN(parseInt(content)) && killer.night & !killer.klr)
            {
              var num = parseInt(content) - 1;
              if(num < killer.userid.length && num >= 0)
              {
                if(killer.user[index].vote == -1)
                {
                  msg.author.send("已經投票了喔!!\r\n如果要取消投票請打" + config.prefix + "C");
                  return;
                }
                if(!killer.user[num].alive)
                {
                  msg.author.send(killer.user[num].username + "已經死了喔!!");
                  return;
                }
                if(killer.user[num].role == 1)
                {
                  msg.author.send(killer.user[num].username + "是殺手喔!!");
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
            //警察取消投票
            if(content.slice(0,1)=="C" && killer.user[index].vote != -1)
            {
              killer.user[killer.user[index].vote].pvote--;
              if(killer.user[index].vote == killer.plo)
              {
                for(var i = 0; i < killer.userid.length; i++)
                {
                  if(killer.user[i].pvote > killer.user[killer.plo].pvote)
                  killer.plo = i;
                }
              }
              killer.user[index].vote = -1;
              msg.author.send("已取消投票!!");
            }
            //警察投票阿
            if(!isNaN(parseInt(content))  && killer.night & !killer.plr)
            {
              var num = parseInt(content) - 1;
              if(num < killer.userid.length && num >= 0)
              {
                if(killer.user[index].vote == -1)
                {
                  msg.author.send("已經投票了喔!!\r\n如果要取消投票請打" + config.prefix + "C");
                  return;
                }
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
      killer.notv = killer.alnum;
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
      if(msg.content.slice(0, config.prefix.length) == config.prefix && msg.channel==killer.channel)
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

bot.on("message", msg => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!msg.guild) return;

  if (msg.content === "lalalala") {
    // Only try to join the sender's voice channel if they are in one themselves
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          msg.reply("I have successfully connected to the channel!");
          const dispatcher = connection.playStream(ytdl("https://www.youtube.com/watch?v=GMH7-TTDP4Q&t=7472s"));
        })
        .catch(console.log);
    } else {
      msg.reply("You need to join a voice channel first!");
    }
  }
});

const queue = {};

const commands ={
  "play": (msg) =>{
    if(queue[msg.guild.id] === undefined)
    return msg.channel.send("請先加入歌曲!!");
    if(!msg.guild.voiceConnection)
    return commands.join(msg).then(() => commands.play(msg));
    if(queue[msg.guild.id].playing)
    return msg.channel.send("正在播放中!!");
    queue[msg.guild.id].playing = true;
    const tchl = msg.channel;
    //
    (function play(song){
      if(song === undefined)
      {
        queue[msg.guild.id].playing = false;
        return msg.channel.send("請加入歌曲!!");
      }
      dispatcher = msg.guild.voiceConnection.playStream(ytdl(song.url, { filter:"audioonly" }), {volume: 0.4});
      var collector = msg.channel.createCollector(m => m.content.slice(0, config.prefix.length) == config.prefix);
      collector.on("collect", m => {
        comd = m.content.slice(config.prefix.length);
        if(comd == "pause")
        tchl.send("the music is pause.").then(() =>{ dispatcher.pause();});
        else if(comd =="resume")
        tchl.send("the music is resume.").then(() =>{ dispatcher.resume();});
        else if(comd == "vol+")
        {
          if(dispatcher.volume >= 1)tchl.send("it is the highest volume.");
          dispatcher.setVolume(Math.round((0.2 + dispatcher.volume)*10)/10);
        }
        else if(comd == "vol-")
        {
          if(dispatcher.volume <= 0.2)tchl.send("it is the lowest volume.");
          else dispatcher.setVolume(Math.round((dispatcher.volume-0.2)*10)/10);
        }
        else if(comd == "skip" && (m.author == song.user||m.author.id == config.ownerID))
        {
          dispatcher.end();
          play(queue[msg.guild.id].songs.shift());
        }
        else if(comd == "status")
        msg.channel.send("現正播放\: " + song.title +"\r\n點播者\: " + song.user.username);
      });
      dispatcher.on("end",() => {
        collector.stop();
        play(queue[msg.guild.id].songs.shift());
      });
      dispatcher.on("error",err => {
        tchl.send("error:"+err);
        collector.stop();
        play(queue[msg.guild.id].songs.shift());
      });
    })(queue[msg.guild.id].songs.shift())
  },
  "join": (msg) =>{
    return new Promise((resolve, reject) => {
      const channel = msg.member.voiceChannel;
      if(!channel||channel.type !== "voice")return msg.channel.send("無法加入語音頻道!!請先確認自己在語音頻道內!!");
      channel.join().then(connection => resolve(connection)).catch(err => reject(err));
    });
  },
  "add": (msg) =>{
    url = msg.content.slice(config.prefix + 2).trim();
    if(url == "" || url == undefined)return msg.channel.send("需要輸入yuoutube網址");
    ytdl.getInfo(url, (err, info) => {
			if(err) return msg.channel.sendMessage("錯誤youtube連結" + err);
      if(queue[msg.guild.id] == undefined)queue[msg.guild.id]={songs: [], playing:false};
      queue[msg.guild.id].songs.push({title: info.title, user:msg.author, url: url});
		});
  },
  "queue": (msg) =>{
    if(queue[msg.guild.id] == undefined)return msg.channel.send("沒有歌曲喔QQ");
    if(queue[msg.guild.id].songs[0]==undefined)return msg.channel.send("沒有歌曲喔QQ");
    for(var i=0; i<10; i++)
    {
      if(queue[msg.guild.id].songs[i]==undefined)return;
      msg.channel.send((i+1) + ". " + queue[msg.guild.id].songs[i].title + "  點播者\: " + queue[msg.guild.id].songs[i].user.username+"\r\n");
    }
    if(queue[msg.guild.id].songs[i]!=undefined)return msg.channel.send("...");
    return;
  }
};

bot.on("message", msg => {
  if(msg.content.slice(0, config.prefix.length) == config.prefix && commands.hasOwnProperty(msg.content.slice(config.prefix.length).split(" ")[0]))
  commands[msg.content.slice(config.prefix.length).split(" ")[0]](msg);
});



bot.login(config.token);
