data = [];

function GenerateDeck(){
  var originDeck = [];
  for(i = 0; i<52; i++)
  {
    originDeck[i] = {num:Math.floor(i/4)+1, str:[]};
    switch(i%4){
      case 0:
        originDeck[i].str.push(":clubs:");
        originDeck[i].str.push("梅花");
        break;
      case 1:
        originDeck[i].str.push(":spades:");
        originDeck[i].str.push("黑桃");
        break;
      case 2:
        originDeck[i].str.push(":hearts:");
        originDeck[i].str.push("紅心");
        break;
      case 3:
        originDeck[i].str.push(":diamonds:");
        originDeck[i].str.push("方塊");
        break;
    }
    switch(Math.floor(i/4)){
      case 0:
      originDeck[i].str[0]+=(":regional_indicator_a:");
      originDeck[i].str[1]+=("A");
      break;
      case 1:
      originDeck[i].str[0]+=(":two:");
      originDeck[i].str[1]+=("2");
      break;
      case 2:
      originDeck[i].str[0]+=(":three:");
      originDeck[i].str[1]+=("3");
      break;
      case 3:
      originDeck[i].str[0]+=(":four:");
      originDeck[i].str[1]+=("4");
      break;
      case 4:
      originDeck[i].str[0]+=(":five:");
      originDeck[i].str[1]+=("5");
      break;
      case 5:
      originDeck[i].str[0]+=(":six:");
      originDeck[i].str[1]+=("6");
      break;
      case 6:
      originDeck[i].str[0]+=(":seven:");
      originDeck[i].str[1]+=("7");
      break;
      case 7:
      originDeck[i].str[0]+=(":eight:");
      originDeck[i].str[1]+=("8");
      break;
      case 8:
      originDeck[i].str[0]+=(":nine:");
      originDeck[i].str[1]+=("9");
      break;
      case 9:
      originDeck[i].str[0]+=(":keycap_ten:");
      originDeck[i].str[1]+=("10");
      break;
      case 10:
      originDeck[i].num = 10;
      originDeck[i].str[0]+=(":regional_indicator_j:");
      originDeck[i].str[1]+=("J");
      break;
      case 11:
      originDeck[i].num = 10;
      originDeck[i].str[0]+=(":regional_indicator_q:");
      originDeck[i].str[1]+=("Q");
      break;
      case 12:
      originDeck[i].num = 10;
      originDeck[i].str[0]+=(":regional_indicator_k:");
      originDeck[i].str[1]+=("K");
      break;
    }
  }
  var Deck = [];
  for(i = 0; i<52; i++)
  {
    index = Math.floor(Math.random()*originDeck.length);
    Deck.push(originDeck[index]);
    originDeck.splice(index,1);
    if(i<12)
      console.log(Deck[i].str[1]);
  }

  return Deck;
}

function GetPoints(Deck){
  var Anumber = 0;
  var Points = 0;
  for(i = 0; i<Deck.length; i++)
  {
    if(Deck[i].num==1)Anumber++;
    Points += Deck[i].num;
    if(Points>21)return -1;
  }
  while(Points<=11&&Anumber>0)
  {
    Points+=10;
    Anumber--;
  }
  return Points;
}

/*
function DisplayDeck(msg,Deck){
  for(i = 0; i<Deck.length; i++)
    msg.channel.send(Deck[i].str[0]+Deck[i].str[1]);
}
*/

const Commands = {
  "BlackJack": (msg) => {
    if(data[msg.author.id] == undefined)
      data[msg.author.id] = {Deck:[], status:0, PlayerDeck:[], ComDeck:[]};
    if(data[msg.author.id].status == 0)
    {
      console.log(msg.author.username);
      data[msg.author.id].status = 1;
      data[msg.author.id].PlayerDeck = [];
      data[msg.author.id].ComDeck = [];
      data[msg.author.id].Deck = GenerateDeck();
      data[msg.author.id].PlayerDeck.push(data[msg.author.id].Deck.shift());
      data[msg.author.id].ComDeck.push(data[msg.author.id].Deck.shift());
      data[msg.author.id].PlayerDeck.push(data[msg.author.id].Deck.shift());
      data[msg.author.id].ComDeck.push(data[msg.author.id].Deck.shift());
      msg.reply("遊戲開始！");
      msg.channel.send("莊家的牌：");
      msg.channel.send(data[msg.author.id].ComDeck[0].str[0]+data[msg.author.id].ComDeck[0].str[1]);
      msg.channel.send("你的牌：");
      for(i = 0; i<data[msg.author.id].PlayerDeck.length; i++)
        msg.channel.send(data[msg.author.id].PlayerDeck[i].str[0]+data[msg.author.id].PlayerDeck[i].str[1]);
      if((data[msg.author.id].PlayerDeck[0].num==1&&data[msg.author.id].PlayerDeck[1].num>=10)||
      (data[msg.author.id].PlayerDeck[1].num==1&&data[msg.author.id].PlayerDeck[0].num>=10))
      {
        msg.channel.send("BlackJack!! You Win!!");
        data[msg.author.id].status = 0;
      }
    }
  },
  "BJadd": (msg) =>{
    if(data[msg.author.id] == undefined)
      return msg.reply("請先加入遊戲");
    if(data[msg.author.id].status == 0)
      return msg.reply("請先加入遊戲");
    if(data[msg.author.id].status == 1)
    {
      data[msg.author.id].PlayerDeck.push(data[msg.author.id].Deck.shift());
      msg.channel.send(data[msg.author.id].PlayerDeck[data[msg.author.id].PlayerDeck.length-1].str[0]+data[msg.author.id].PlayerDeck[data[msg.author.id].PlayerDeck.length-1].str[1]);
      if(GetPoints(data[msg.author.id].PlayerDeck)==-1)
      {
        msg.reply("你輸囉 下去88");
        data[msg.author.id].status = 0;
      }
    }
  },
  "BJnoadd": (msg) =>{
    msg.channel.send("莊家的牌：");
    for(i = 0; i<data[msg.author.id].ComDeck.length; i++)
      msg.channel.send(data[msg.author.id].ComDeck[i].str[0]+data[msg.author.id].ComDeck[i].str[1]);
    while(GetPoints(data[msg.author.id].ComDeck) <= GetPoints(data[msg.author.id].PlayerDeck)&&
    GetPoints(data[msg.author.id].ComDeck)!=-1)
    {
      data[msg.author.id].ComDeck.push(data[msg.author.id].Deck.shift());
      msg.channel.send(data[msg.author.id].ComDeck[data[msg.author.id].ComDeck.length-1].str[0]+data[msg.author.id].ComDeck[data[msg.author.id].ComDeck.length-1].str[1]);
    }
    if(GetPoints(data[msg.author.id].ComDeck)==-1)
    {
      msg.reply("你贏囉");
      data[msg.author.id].status = 0;
    }
    else
    {
      msg.reply("你輸囉 下去88");
      data[msg.author.id].status = 0;
    }
  },
  "sur": (msg) =>{
    msg.reply("可憐 洗洗睡88");
    data[msg.author.id].status = 0;
  },
  "deck": (msg) =>{
    msg.reply("你的牌長這樣：");
    for(i = 0; i<data[msg.author.id].PlayerDeck.length; i++)
      msg.channel.send(data[msg.author.id].PlayerDeck[i].str[0]+data[msg.author.id].PlayerDeck[i].str[1]);
  }
};

module.exports = {
  Commands:Commands
};
