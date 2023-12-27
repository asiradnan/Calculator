const td=document.getElementsByTagName('td')
const display=document.getElementById('display');
let on=false;
let ans=false;
let last='';
for (let i=0;i<td.length;i++){
  if (td[i].id=='' || td[i].id=='R'){ td[i].addEventListener('click',displayadd);}
}
function C(){
  display.innerHTML=display.innerHTML.slice(0,display.innerHTML.length-1);
}
function toggle(){
  AC();
  on=!on;
  if (!on) {
    document.getElementById('on-off').innerHTML = 'Turn On';
    document.getElementById('on-off').style.color= '#53a8b6';
    document.getElementById('AC').style.color= '#53a8b6';
  }
  else {
    document.getElementById('on-off').innerHTML = 'Turn Off';
    document.getElementById('on-off').style.color= '#ffff';
    document.getElementById('AC').style.color= '#ffff';
    
  }
}
function displayadd(){
  if (on==false ) return;
  if (ans==true) {
    AC();
    ans=false;
  }
  if (this.innerHTML=='Rem')display.innerHTML+='r';
  else display.innerHTML+=this.innerHTML;
}
function addans(){
  if (display.innerHTML.length==0) ans=false;
  display.innerHTML+=last;
}
function AC(){
  if (on==false) return;
  display.innerHTML = '';
}
function result(){
  if (on==false || ans ) return;
  let s=display.innerHTML;
  if (s.length==0) {return;}
  else if (s[0]=='*' || s[0]=='/' || s[0]=='%' || s[0]=='r') {
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
    if (s[i]=='+' || s[i]=='-' || s[i]=='*' || s[i]=='/' || s[i]=='^' || s[i]=='%' || s[i]=='r'){
      if (s[i]=='%'){
        if (num2.length==0) {
          num1=parseFloat(num1);
          num1/=100;
        }
        else{
          num2=parseFloat(num2);
          num2/=100;
          num1=calc(num1,num2,op);
        }
        num1=num1.toString();
        num2='';
        op='';
        if (i==s.length-1) {
          display.innerHTML=s+ "<br>" + num1;
          last=num1;
          return;
        }
        continue;
      }
      if (i==s.length-1)  {
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
      if (i==s.length-1) {
        ans=true;
        if (op=='') {
          display.innerHTML=s+ "<br>" + num1;
          last=num1;
          return;
        }
        num1=calc(num1,num2,op);
        num1=num1.toString();
        if (num1.includes('e')) {
          let [x, y] = num1.split('e');
          x = x.slice(0, 8- (y.length + 1));
          display.innerHTML= s+ "<br>" + x + 'e' + y;
        }
        else {
            if (num1.length>10) display.innerHTML= s+ "<br>" + parseFloat(num1).toPrecision(10);
            else display.innerHTML= s + "<br>" + num1;
            last=num1;
        }
      }
    }
  }
}

function calc(num1,num2,op){
  if (on==false) return;
  num1=parseFloat(num1);
  num2=parseFloat(num2);
  if (op=='+') return num1+num2;
  else if (op=='-') return num1-num2;
  else if (op=='*') return num1*num2;
  else if (op=='/')return num1/num2;
  else if (op=='^') return num1**num2;
  else {
    num1=parseInt(num1);
    num2=parseInt(num2);
    return num1%num2;
  }
}