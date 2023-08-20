const menuBtn = document.querySelector(".btn-menu");
const menuMobile = document.querySelector(".menu-list");

menuBtn.addEventListener("click", () => {
  menuMobile.classList.toggle("menu-open");
});

// const heroBtn = document.querySelector('.hero-btn');

// heroBtn.addEventListener(('click'), ()=>{
// menuBtn.classList.toggle('men')
// });

const form = document.forms["form"];
const formArr = Array.from(form);
const validFormArr = [];
const button = form.elements["button"];

formArr.forEach((el) => {
  if (el.hasAttribute("data-reg")) {
    el.setAttribute("is-valid", "0");
    validFormArr.push(el);
  }
});

form.addEventListener("input", inputHandler);
form.addEventListener("submit", formCheck);

function inputHandler({ target }) {
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute("data-reg");
  const reg = new RegExp(inputReg);
  if (reg.test(inputValue)) {
    el.setAttribute("is-valid", "1");
    el.style.border = "2px solid rgb(0, 196, 0)";
  } else {
    el.setAttribute("is-valid", "0");
    el.style.border = "2px solid rgb(255, 0, 0)";
  }
}

function formCheck(e) {
  e.preventDefault();
  const allValid = [];
  validFormArr.forEach((el) => {
    allValid.push(el.getAttribute("is-valid"));
  });
  const isAllValid = allValid.reduce((acc, current) => {
    return acc && current;
  });
  if (!Boolean(Number(isAllValid))) {
    alert("Заполните поля правильно!");
    return;
  }
  formSubmit();
}

async function formSubmit() {
  const data = serializeForm(form);
  const response = await sendData(data);
  if (response.ok) {
    let result = await response.json();
    alert(result.message);
    formReset();
  } else {
    alert("Код ошибки: " + response.status);
  }
}

function serializeForm(formNode) {
  return new FormData(form);
}

async function sendData(data) {
  return await fetch("send_mail.php", {
    method: "POST",
    body: data,
  });
}

function formReset() {
  form.reset();
  validFormArr.forEach((el) => {
    el.setAttribute("is-valid", 0);
    el.style.border = "none";
  });
}


$(document).ready(function () {
  var currentSlide;
  var slidesCount;
  var sliderCounter = document.createElement("div");
  sliderCounter.classList.add("slider__counter");

  var updateSliderCounter = function (slick, currentIndex) {
    currentSlide = slick.slickCurrentSlide() + 1;
    slidesCount = slick.slideCount;
    $(sliderCounter).text(currentSlide + "/" + slidesCount);
  };

  $(".slider").on("init", function (event, slick) {
    $(".slider").append(sliderCounter);
    updateSliderCounter(slick);
  });

  $(".slider").on("afterChange", function (event, slick, currentSlide) {
    updateSliderCounter(slick, currentSlide);
  });

  $(".slider").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    centerMode: true,
    centerPadding: "50px",
    // autoplay: true,
    // autoplaySpeed: 1500,
  });
  $(".slick-prev").text("❯");
  $(".slick-next").text("❯");
});
