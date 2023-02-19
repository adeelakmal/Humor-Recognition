// First slider
VerlyRange("range-slider", "#655ecf");

//Initializing the questions
let question = 1;
let questions = [
  "If I am feeling depressed, I can usually cheer myself up with humor.",
  "If someone makes a mistake, I will often tease them about it.",
  "I let people laugh at me or make fun at my expense more than I should.",
  "I don't have to work very hard at making other people laugh I seem to be a naturally humorous person.",
  "Even when I'm by myself, I'm often amused by the absurdities of life.",
  "People are never offended or hurt by my sense of humor.",
  "I will often get carried away in putting myself down if it makes my family or friends laugh.",
  "I rarely make other people laugh by telling funny stories about myself.",
  "If I am feeling upset or unhappy I usually try to think of something funny about the situation to make myself feel better.",
  "When telling jokes or saying funny things, I am usually not very concerned about how other people are taking it.",
  "I often try to make people like or accept me more by saying something funny about my own weaknesses, blunders, or faults.",
  "I laugh and joke a lot with my closest friends.",
  "My humorous outlook on life keeps me from getting overly upset or depressed about things.",
  "I do not like it when people use humor as a way of criticizing or putting someone down.",
  "I don't often say funny things to put myself down.",
  "I usually dont like to tell jokes or amuse people.",
  "If I'm by myself and Im feeling unhappy, I make an effort to think of something funny to cheer myself up.",
  "Sometimes I think of something that is so funny that I can t stop myself from saying it, even if it is not appropriate for the situation.",
  "I often go overboard in putting myself down when I am making jokes or trying to be funny.",
  "I enjoy making people laugh.",
  "If I am feeling sad or upset, I usually lose my sense of humor.",
  "I never participate in laughing at others even if all my friends are doing it.",
  "When I am with friends or family, I often seem to be the one that other people make fun of or joke about.",
  "I don't often joke around with my friends.",
  "It is my experience that thinking about some amusing aspect of a situation is often a very effective way of coping with problems.",
  "If I don t like someone, I often use humor or teasing to put them down.",
  "If I am having problems or feeling unhappy, I often cover it up by joking around, so that even my closest friends don t know how I really feel.",
  "I usually can t think of witty things to say when I'm with other people.",
  "I don't need to be with other people to feel amused   I can usually find things to laugh about even when I'm by myself.",
  "Even if something is really funny to me, I will not laugh or joke about it if someone will be offended.",
  "Letting others laugh at me is my way of keeping my friends and family in good spirits.",
];

let val = document.querySelector(".value");
let slider = document.querySelector("#range-slider");
let forward = document.querySelector("#fwd");
let back = document.querySelector("#bck");
let prompt = document.querySelector("#prompt");
let form = document.querySelector(".form");
let Q = document.querySelectorAll(".question");
let Submit = document.querySelector("#sub");

// This helps in changing the output of the span above the slider dynamically
slider.oninput = function () {
  displayValue();
};

function displayValue() {
  if (Math.round(slider.value) === 1) {
    val.innerHTML = "Never or very rarely true";
  } else if (Math.round(slider.value) === 2) {
    val.innerHTML = "Rarely true";
  } else if (Math.round(slider.value) === 3) {
    val.innerHTML = "Sometimes true";
  } else if (Math.round(slider.value) === 4) {
    val.innerHTML = "Often true";
  } else {
    val.innerHTML = "Very often or always true";
  }
}
function detectChange() {
  /*
  Purpose: This functions disables the forward and backwards button depending on which question we are on
  Return: None
  */
  if (question == 1) {
    back.disabled = true;
  } else {
    back.disabled = false;
  }
  if (question == questions.length + 1) {
    forward.disabled = true;
    Submit.disabled = false;
  } else {
    forward.disabled = false;
  }
}

function createElem(Qnumber) {
  /*Purpose: This function creates an element to be placed in the card and adds it in the HTML accordingly.
             The main things it creates are the question, slider, span above the slider
    Returns: None */
  var question = document.createElement("div");
  question.className = "question display";
  form.insertBefore(question, form.children[form.childElementCount - 1]);
  var main = document.createElement("h3");
  main.innerHTML = questions[Qnumber - 2];
  question.appendChild(main);

  var label = document.createElement("label");
  label.className = "slidecontainer first";
  question.appendChild(label);

  var span = document.createElement("span");
  span.className = "value";
  span.innerHTML = "Never or very rarely true";
  label.appendChild(span);

  var slider = document.createElement("input");

  slider.id = "range-slider" + String(Qnumber - 1);
  slider.name = "slider" + String(Qnumber - 1);
  slider.className = "slider";
  slider.type = "range";
  slider.min = 1;
  slider.max = 5;
  slider.value = 1;
  slider.step = 0.05;

  label.appendChild(slider);
  VerlyRange("range-slider" + String(Qnumber - 1), "#655ecf"); //Helps in making the slider dangly!
}

// Listens for clicks on the forward button
forward.addEventListener("click", (event) => {
  Q = document.querySelectorAll(".question");
  event.preventDefault();
  if (question < questions.length + 1) {
    Q[question - 1].className = "question";
    question += 1;
    if (Q.length < question) {
      createElem(question);
    } else {
      Q[question - 1].className += " display";
    }

    slider = document.querySelectorAll(".slider");
    slider = slider[question - 1];
    slider.oninput = function () {
      displayValue();
    };

    val = document.querySelectorAll(".value");
    val = val[question - 1];

    console.log(question);
    detectChange();
  }
});

// Listens for clicks on the back button
back.addEventListener("click", (event) => {
  Q = document.querySelectorAll(".question");
  event.preventDefault();
  if (question > 1) {
    Q[question - 1].className = "question";
    question -= 1;
    Q[question - 1].className += " display";
    console.log(question);

    slider = document.querySelectorAll(".slider");
    slider = slider[question - 1];
    slider.oninput = function () {
      displayValue();
    };

    val = document.querySelectorAll(".value");
    val = val[question - 1];

    detectChange();
  }
});

document.onload = () => {
  console.log("load");
};
