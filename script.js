//wait for page to load to add event listener
window.onload=function(){
document.getElementById("signIn").addEventListener("click", signInAttempt);
document.getElementById('register').addEventListener('click', register);
document.getElementById('signOutButton').addEventListener('click', signOut);
document.getElementById('calcFib').addEventListener('click', calcFib);
autoLogin(); 
}


//generate cookie object, creates users as global variable
function generateUserObject(){ 
    let totalCookies = document.cookie.split('username=');
      users = {}; 
    for (let cookie of totalCookies){
        if(!cookie[0]){
            continue;
        }
        cookie = cookie.split(' '); 
        users[cookie[0]] = cookie[1];
    }
}; 
generateUserObject();

function autoLogin(){
    console.log(users);
    if(!Object.keys(users).length){
        return; 
    } else{
       let autoUserEmail = Object.keys(users)[Object.keys(users).length-1];
       loginSuccessFunc()
        document.getElementById('greeting').innerHTML = `Welcome, ${autoUserEmail}`;
    }
}

function signInAttempt(event){
   event.preventDefault();  // prevents page refresh
       
 loginEmail = document.getElementById('loginEmail').value;
let loginPassword = document.getElementById('loginPassword').value;

if (users[loginEmail]===loginPassword){
    console.log('successful login');
    loginSuccessFunc();
} else if (!users[loginEmail]){
    console.error('no user email found');
    return;
} else {
    console.error('incorrect password');
    return;
    } 

document.getElementById('cancelLogin').click();  // activates cancel button 
};


function loginSuccessFunc(){
    //Do something with when login successfully
document.getElementById('greeting').innerHTML = `Welcome, ${loginEmail}`;
document.getElementById("loginButton").style.display = "none"; //hides sign in and register buttons
document.getElementById('registerButton').style.display = 'none';
document.getElementById('signOutButton').style.display = 'block'; //reveals signout and calc fib numbers buttons
document.getElementById('calcFib').style.display = 'block';
}



function register(event){
    event.preventDefault(); //prevents page refresh
let registerEmail = document.getElementById('registerEmail').value;
let registerPassword = document.getElementById('registerPassword').value; 
let registerPasswordConfirmation = document.getElementById('registerPasswordConfirmation').value;
if(registerEmail.match('username')!==null){
   console.warn('invalid email');
   return;
}
if(registerPassword!==registerPasswordConfirmation){
    console.warn('passwords do not match');
    return;
} else if(users[registerEmail]!==undefined){
    console.error('user email already registered!'); // test if user email already registered
    return; 
} else {
   users[registerEmail] = registerPassword; //updates temporary users object
   document.cookie= document.cookie + `username=${registerEmail} ${registerPassword}`; //updates cookie w/ user
   console.log('User email registered successfully');
}
document.getElementById('cancelRegistration').click();
}

function signOut(){
document.getElementById("loginButton").style.display = "block"; //hides sign in and register buttons
document.getElementById('registerButton').style.display = 'block';
document.getElementById('signOutButton').style.display = 'none'; //reveals signout and calc fib numbers buttons
document.getElementById('calcFib').style.display = 'none';
document.getElementById('greeting').innerHTML = `Hello Stranger!`;
}

function calcFib(theHardWay){

    //return fib numbers
    console.time("fib")
        var nums = [0,1];
        var random=0; 
        while(random<10000){
          random = Math.round(Math.random()*100000); 
        }
        
        while(nums[1]<=random){
            nums.push(nums[0]+nums[1]);
            if (nums[2]>random){
                console.log(nums[1]);
                  console.timeEnd("fib"); 
                return;
            } else {
                [nums[0],nums[1]] = [nums[1],nums[2]]; 
                nums.pop();
            }
        }
      
        
    }

    /*
    console.time("calcFib run time the easy way:"); 
   let random = Math.round(Math.random()*4);
    let fibNums = [10946, 17711, 28657, 46368, 75025];
    console.log(fibNums[random]);  
    console.timeEnd('calcFib run time the easy way:');
*/
