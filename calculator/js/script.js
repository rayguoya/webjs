var screenNode=document.querySelector("#screen");
var beforeNum=null;
var afterNum=null;
var clearScreen=false;//运算清屏
var clearScreenResult=false;//等号清屏，还原初始状态。
var beforeSign=null;
var afterSign=null;
//输入值
function inputKey(keyVal){
	//console.log(typeof keyVal,keyVal);
	//console.log(typeof screenNode.value,screenNode.value);
	
	
	if(clearScreen || clearScreenResult){
		screenNode.value="0";
		clearScreen=false;
		if(clearScreenResult){//等号之后的清屏
			beforeNum=null;
			afterNum=null;
			beforeSign=null;
			afterSign=null;
		}
		clearScreenResult=false;
	}
	var screenVal=screenNode.value;
	if((screenVal=="0")&&(keyVal!=".")){
		screenNode.value=keyVal;
	}
	else if(((screenVal.indexOf(".")==-1)&&(keyVal=="."))||(keyVal!=".")){
		
		screenNode.value+=keyVal;
	}
}
//del
function del(){
	var screenVal=screenNode.value;
	if(screenVal.length==1){
		screenNode.value="0";
	}
	else{
		screenNode.value=screenVal.slice(0,-1);
	}
}
//平方根
function sqr(){
	var screenVal=screenNode.value;
	screenNode.value=Math.sqrt(screenVal);
	beforeNum=screenNode.value;
}
//运算
function operatingFun(operate){
	if(clearScreen){//连续点击符号时进行的清屏
		beforeSign=operate;
		return;
	}
	if(clearScreenResult){//点击等号之后进行的清屏
		beforeNum=null;
		afterNum=null;
		beforeSign=null;
		afterSign=null;
		clearScreenResult=false;
	}
	clearScreen=true;
	
	if(beforeNum==null && afterNum==null){
		beforeNum=screenNode.value;
		beforeSign=operate;
	}
	else{
		afterNum=screenNode.value;
		afterSign=operate;
	}
	
	if(afterNum!=null){
		resultx();
	}
}
function resultx(){
	switch(beforeSign){
		case "+":screenNode.value=Number(beforeNum)+Number(afterNum);
		break;
		case "-":screenNode.value=Number(beforeNum)-Number(afterNum);
		break;
		case "*":screenNode.value=Number(beforeNum)*Number(afterNum);
		break;
		case "/":screenNode.value=Number(beforeNum)/Number(afterNum);
		break;
		case "%":screenNode.value=Number(beforeNum)%Number(afterNum);
		break;
		default:
		screenNode.value="Err";
	}
	beforeNum=screenNode.value;
	beforeSign=afterSign;
	afterNum=null;
	afterSign=null;
}

//等于
function result(){
	if(beforeSign==null){
		return;
	}
	if(afterNum==null){
		afterNum=screenNode.value;
	}
	clearScreenResult=true;//点击等号之后的清屏判定
	switch(beforeSign){
		case "+":screenNode.value=Number(beforeNum)+Number(afterNum);
		break;
		case "-":screenNode.value=Number(beforeNum)-Number(afterNum);
		break;
		case "*":screenNode.value=Number(beforeNum)*Number(afterNum);
		break;
		case "/":screenNode.value=Number(beforeNum)/Number(afterNum);
		break;
		case "%":screenNode.value=Number(beforeNum)%Number(afterNum);
		break;
		default:
		screenNode.value="Err";
	}
	beforeNum=screenNode.value;
}

//清空
function clearFun(){
	afterNum=null;
	beforeNum=null;
	afterSign=null;
	beforeSign=null;
	clearScreen=false;
	clearScreenResult=false;
	screenNode.value="0";
}

