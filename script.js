let userList = [];
let getUserList;
let nameListDOM = document.querySelector("#nameList");

localStorage.setItem("userList", JSON.stringify(userList));

function Read() {
    nameListDOM.innerHTML = "";
    getUserList = JSON.parse(localStorage.getItem("userList"));

    if (getUserList != null) {
        if (getUserList.length === 0) {
            nameListDOM.innerHTML = "There are no any users!";
        } else {
            for (let i = 0; i < getUserList.length; i++) {
                nameListDOM.innerHTML += `
                <div class="user-item">
                <p>
                    <i class="fas fa-user"></i>
                    <span>User: </span>${getUserList[i]}
                </p>
                <div class="buttons">
                    <button class="primary" onclick="Edit(${i})">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                    <button class="danger" onclick="Delete(${i})">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
                `;

            }
        }
    }
}


function Create(){
    const storage = JSON.parse(localStorage.getItem("userList"));
    let inputText = document.querySelector("#name").value;
    if(inputText == ""){
        alert("Write a Name");
    }else {
        if(storage === null){
            userList.push(inputText);
            localStorage.setItem("userList", JSON.stringify(userList));
        }else {
            userList = JSON.parse(localStorage.getItem("userList"));
            userList.push(inputText);
            localStorage.setItem("userList", JSON.stringify(userList));
        }
    }
}

function Delete(item){
    let deleteUsers = JSON.parse(localStorage.getItem("userList"));
    deleteUsers.splice(item, 1);
    localStorage.setItem("userList", JSON.stringify(deleteUsers));
    Read();
}

function Edit(item){
    let editUsers = JSON.parse(localStorage.getItem("userList"));
    nameListDOM.innerHTML = "";
    for (let i = 0; i < editUsers.length; i++) {
        if(i == item){
            nameListDOM.innerHTML += `
            <div class="user-item">
            <div>
                <p>
                    <i class="fas fa-user"></i>
                    <span>User: </span>${editUsers[i]}
                </p>
                <input type="text" id="newName" placeholder="${editUsers[i]}"/>
            </div>    
                <div class="buttons">
                    <button class="success" onclick="Uptade(${i})">
                        <i class="fas fa-edit"></i>
                        Uptade
                    </button>
                    <button class="warning" onclick="Read()">
                        <i class="fas fa-trash"></i>
                        Cancel
                    </button>
                </div>
            </div>
            ` ;
        }else {
            nameListDOM.innerHTML += `
                <div class="user-item">
                <p>
                    <i class="fas fa-user"></i>
                    <span>User: </span>${getUserList[i]}
                </p>
                <div class="buttons">
                    <button class="primary" onclick="Edit(${i})">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                    <button class="danger" onclick="Delete(${i})">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
                `;
        }
        
    }
}

function Uptade(item) {
    const UptadeUsers = JSON.parse(localStorage.getItem("userList"));
    UptadeUsers[item] = document.getElementById("newName").value;
    if(UptadeUsers[item] == ""){
        alert("Write a New Name");
    }else {
        localStorage.setItem("userList", JSON.stringify(UptadeUsers));
        Read();
    }
}

document.querySelector(".form").addEventListener("submit", (e)=> {
    e.preventDefault();
    Create();
    Read();
    document.querySelector(".form").reset(); 
})

document.addEventListener("DOMContentLoaded", () => { 
    Read();
});



