data = [];
data[4] = {status:0, answer:[], player:"", attempt:0};
data[5] = {status:0, answer:[], player:"", attempt:0};
data[6] = {status:0, answer:[], player:"", attempt:0};
numtest = [];
numtest[4] = /^\d{4}$/;
numtest[5] = /^\d{5}$/;
numtest[6] = /^\d{6}$/;
const zerotonine = ["0","1","2","3","4","5","6","7","8","9"];

function numbertest(numstr, level){
  if(!numtest[level].test(numstr))return false;
  rrrr = numstr.substr(numstr.search(numtest[level]),level);
  var islegal = 0;
  for(var k = 0; k < 10; k++)//check whether the input has same number
  {
    if(rrrr.indexOf(zerotonine[k]) !== -1)
    islegal++;
  }
  if(islegal!=level)return false;
  return true;
}

function numbergenerate(level){
  var zerotonine0 = ["0","1","2","3","4","5","6","7","8","9"];
  num = new Array();
  var  index = -1;
  for(i = 0; i < level; i++)
  {
    index = Math.floor(Math.random()*zerotonine0.length);
    num[i]= zerotonine0[index];
    zerotonine0.splice(index,1);
  }
  console.log(num);
  return num;
}

const Commands = {
  "賓果5": msg => {
    if(data[5].status == 0)
    {
      console.log(msg.author.username);
      data[5].attempt = 0;
      data[5].answer = numbergenerate(5);
      data[5].status = 1;
      msg.reply("輸入五個數字");
      const collector = msg.channel.createMessageCollector(m =>{return m.author.id==msg.author.id})
      collector.on("collect", m=>{
        if(numbertest(m.content, 5)){
          data[5].attempt++;
          var rrrr = m.content.substr(m.content.search(numtest[5]),5);
          var AAAA = 0, BBBB = 0;
          for(var i = 0; i < 5; i++)
          {
            if(rrrr.indexOf(data[5].answer[i]) == i)
            AAAA++;
            else if(rrrr.indexOf(data[5].answer[i]) != -1)
            BBBB++;
          }
          if(AAAA === 5)
          {
            msg.reply("總共猜了"+data[5].attempt+"次");
            m.channel.send({embed: {
                description: "Congratulation!!You got it",
                files: [{
                  attachment : "images/akari1.JPG",
                  name: "akari.JPG"
              }]
            }});
            data[5].status = 0;
            collector.stop();
          }
          else
          msg.reply(AAAA + "A" + BBBB + "B");
        }
        else if(m.content=="sur")
        {
          msg.reply("可憐");
          data[5].status = 0;
          collector.stop();
        }
      });
    }
  },
  "賓果6": msg => {
    if(data[6].status == 0)
    {
      console.log(msg.author.username);
      data[6].attempt = 0;
      data[6].answer = numbergenerate(6);
      data[6].status = 1;
      msg.reply("輸入六個數字");
      const collector = msg.channel.createMessageCollector(m =>{return m.author.id==msg.author.id})
      collector.on("collect", m=>{
        if(numbertest(m.content, 6)){
          data[6].attempt++;
          var rrrr = m.content.substr(m.content.search(numtest[6]),6);
          var AAAA = 0, BBBB = 0;
          for(var i = 0; i < 6; i++)
          {
            if(rrrr.indexOf(data[6].answer[i]) == i)
            AAAA++;
            else if(rrrr.indexOf(data[6].answer[i]) != -1)
            BBBB++;
          }
          if(AAAA === 6)
          {
            msg.reply("總共猜了"+data[6].attempt+"次");
            m.channel.send({embed: {
                description: "Congratulation!!You got it",
                files: [{
                  attachment : "images/akari1.JPG",
                  name: "akari.JPG"
              }]
            }});
            data[6].status = 0;
            collector.stop();
          }
          else
          msg.reply(AAAA + "A" + BBBB + "B");
        }
        else if(m.content=="sur")
        {
          msg.reply("可憐");
          data[6].status = 0;
          collector.stop();
        }
      });
    }
  },
  "賓果": msg => {
    if(data[4].status == 0)
    {
      console.log(msg.author.username);
      data[4].attempt = 0;
      data[4].answer = numbergenerate(4);
      data[4].status = 1;
      msg.reply("輸入四個數字");
      const collector = msg.channel.createMessageCollector(m =>{return m.author.id==msg.author.id})
      collector.on("collect", m=>{
        if(numbertest(m.content, 4)){
          data[4].attempt++;
          var rrrr = m.content.substr(m.content.search(numtest[4]),4);
          var AAAA = 0, BBBB = 0;
          for(var i = 0; i < 4; i++)
          {
            if(rrrr.indexOf(data[4].answer[i]) == i)
            AAAA++;
            else if(rrrr.indexOf(data[4].answer[i]) != -1)
            BBBB++;
          }
          if(AAAA === 4)
          {
            msg.reply("總共猜了"+data[4].attempt+"次");
            m.channel.send({embed: {
                description: "Congratulation!!You got it",
                files: [{
                  attachment : "images/akari1.JPG",
                  name: "akari.JPG"
              }]
            }});
            data[4].status = 0;
            collector.stop();
          }
          else
          msg.reply(AAAA + "A" + BBBB + "B");
        }
        else if(m.content=="sur")
        {
          msg.reply("可憐");
          data[4].status = 0;
          collector.stop();
        }
      });
    }
  },
  "reset": msg =>{

  }
};

module.exports = {
  Commands:Commands
};
