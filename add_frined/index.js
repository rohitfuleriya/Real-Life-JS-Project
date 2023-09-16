var isStatus = document.querySelector("h5");

var addFriend = document.querySelector("#add");
// var removeFriend = document.querySelector('#remove');
var check = 0;
addFriend.addEventListener("click", function () {
  if (check == 0) {
    isStatus.innerHTML = "Angel Priya is added";
    isStatus.style.color = "green";
    check = 1;
  } else {
    isStatus.innerHTML = "Stranger";
    isStatus.style.color = "red";
    check = 0;
  }
});

// removeFriend.addEventListener("click", function() {
//     isStatus.innerHTML = "Stranger";
//     isStatus.style.color = "red";
// });
