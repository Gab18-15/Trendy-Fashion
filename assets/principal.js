
let audience_btn = document.getElementById('audience_btn');
let show_bx_1 = document.getElementsByClassName('show_bx_1')[0];

audience_btn.addEventListener('click', () => {
   show_bx_1.classList.toggle('show_bx_active');
})


function auto_grow(e) {
   e.style.height = "5px";
   e.style.height = (e.scrollHeight) + "px";
}

const audience_check_off = () => {
   Array.from(document.getElementsByClassName('check_audience_i')).forEach((i) => {
      i.style.color = "#fff";
   })
}

Array.from(document.getElementsByClassName('check_audience')).forEach((i, a) => {
   i.addEventListener('click', () => {
      audience_check_off();
      document.getElementsByClassName('check_audience_i')[a].style.color = "#ac85dc";
      if (a === 0) {
         audience_btn.style.color = "#ac85dc";
         audience_btn.style.borderColor = "#ac85dc";
         audience_btn.innerHTML = 'Everyone <i class="fas fa-angle-down">';
      } else {
         audience_btn.innerHTML = 'Twitter Circle <i class="fas fa-angle-down">';
         audience_btn.style.color = "green";
         audience_btn.style.borderColor = "green";
      }
      show_bx_1.classList.toggle('show_bx_active');
   })
})

let select_reply_btn = document.getElementsByClassName('select_reply_btn')[0];
let who_can_reply_bx = document.getElementsByClassName('who_can_reply_bx')[0];


select_reply_btn.addEventListener('click', () => {
   who_can_reply_bx.classList.toggle('show_bx_active')
})


const who_can_reply_off = () => {
   Array.from(document.getElementsByClassName('check_audience_i')).forEach((i) => {
      i.style.color = "#fff";
   })
}

Array.from(document.getElementsByClassName('who_can_reply')).forEach((i, a) => {
   i.addEventListener('click', () => {
      who_can_reply_off();
      document.getElementsByClassName('who_can_reply_i')[a].style.color = "#ac85dc";
      if (a === 0) {
         select_reply_btn.innerHTML = '<i class="fas fa-globe-asia"></i> Todos pueden responder';
      } else if (a === 1) {
         select_reply_btn.innerHTML = '<i class="fas fa-user-check "></i> Siguiendo';
      } else {
         select_reply_btn.innerHTML = '@ menciones';
      }
      who_can_reply_bx.classList.toggle('show_bx_active');
   })
})

let tweet_text_area = document.getElementById('tweet_text_area');
let tweet_post = document.getElementById('tweet_post');
let text_limit = document.getElementById('text_limit');

tweet_text_area.addEventListener('keyup', () => {
   if (tweet_text_area.value.lenght > 0) {
      tweet_post.style.background = "rgb(28,160,242)";
   } else {
      tweet_post.style.background = "rgb(28,160,242, .5)";
   }

   let a = tweet_text_area.value.lenght;
   let b = parseInt((a/2));
   let c = (100-b);
   text_limit.innerText = c + "%";

   if (c === 0) {
      text_limit.style.color = "red";
   } else {
      text_limit.style.color = "rb(0,0,0,.8)";
   }
})
// Referencias a elementos
const tweetButton = document.getElementById("tweet_post");
const tweetTextArea = document.getElementById("tweet_text_area");
const postMainBox = document.querySelector(".post_main_bx");

// Función para publicar un tweet
tweetButton.addEventListener("click", function () {
  const tweetContent = tweetTextArea.value.trim();

  // Verificar que el tweet no esté vacío
  if (tweetContent) {
    // Crear un nuevo div para el tweet
    const newTweet = document.createElement("div");
    newTweet.classList.add("post_card_bx");
    
    // Contenido HTML del nuevo tweet
    newTweet.innerHTML = `
      <div class="post_profile">
        <img src="imagenes/user.png" alt="" />
      </div>
      <div class="content">
        <div class="user_name_time">
          <h5>
            André Marquez <img src="imagenes/bluetick.png" alt="" />
            <p>@andre_mar</p>
          </h5>
          <h6><i class="fa-regular fa-clock"></i> Just now</h6>
        </div>
        <h3>${tweetContent}</h3>
        <div class="tweet_card_social_data">
          <div class="tweet_social_card">
            <i class="fa-solid fa-comment"></i>
            <span>0</span>
          </div>
          <div class="tweet_social_card">
            <i class="fa-solid fa-repeat"></i>
            <span>0</span>
          </div>
          <div class="tweet_social_card">
            <i class="fa-solid fa-heart"></i>
            <span>0</span>
          </div>
          <div class="tweet_social_card">
            <i class="fa-solid fa-share"></i>
          </div>
        </div>
      </div>
    `;

    // Agregar el nuevo tweet debajo del casillero de crear tweet
    postMainBox.appendChild(newTweet);

    // Limpiar el área de texto después de publicar
    tweetTextArea.value = "";
  } else {
    alert("Please enter some text to tweet!");
  }
});
