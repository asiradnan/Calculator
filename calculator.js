const td=document.getElementsByTagName('td')
const display=document.getElementById('display');
let ans=false;
for (let i=0;i<td.length;i++){
  if (td[i].id!="AC" && td[i].id!="res"){ td[i].addEventListener('click',displayadd);}
}

function displayadd(){
  if (ans==true) {
    AC();
    ans=false;
  }
  display.innerHTML+=this.innerHTML;
}

function AC(){
  display.innerHTML = '';
}
function result(){
  let s=display.innerHTML;
  if (s.length==0) {return;}
  else if (s[0]=='*' || s[0]=='/' || s[0]=='%') {
    display.innerHTML="Error";
    return;
  }
  let num1='',num2='',op='';
  if (s[0] == '+' || s[0] == '-') {
    op=s[0];
    num1='0';
    
  }
  
  else num1=s[0];
  for (let i=1;i<s.length;i++){
    if (s[i]=='+' || s[i]=='-' || s[i]=='*' || s[i]=='/' || s[i]=='^' || s[i]=='%'){
      if (i==s.length-1) {
        display.innerHTML="Error";
        return;
      }
      if (op.length==1){
        if (num2.length==0) {
          display.innerHTML="Error";
          return;
        }
        else {
          num1=calc(num1,num2,op);
          num1=num1.toString();
          num2='';
          op=s[i];
        }
      }
      else op=s[i];
    }
    else{
      if (op.length==1) num2+=s[i];
      else num1+=s[i];
      display.innerHTML=num1;
      if (i==s.length-1) {
        ans=true;
        num1=calc(num1,num2,op);
        num1=num1.toString();
        if (num1.includes('e')) {
          let [x, y] = num1.split('e');
          x = x.slice(0, 16 - (y.length + 1));
          display.innerHTML= x + 'e' + y;
        }
        else {
            if (num1.length>16) display.innerHTML=num1.toPrecision(16);
            else display.innerHTML=num1;
        }
      }
    }
  }
}

function calc(num1,num2,op){
  num1=parseFloat(num1);
  num2=parseFloat(num2);
  if (op=='+') return num1+num2;
  else if (op=='-') return num1-num2;
  else if (op=='*') return num1*num2;
  else if (op=='/')return num1/num2;
  else return num1**num2;
}