document.addEventListener('DOMContentLoaded', function() {
  const startButtons = document.querySelectorAll('button[id$="-btn"]');
  const scenarioElements = document.querySelectorAll('section[id^="scenario-"]');
  const feedbackElement = document.getElementById('feedback');
  const helpChoiceFeedbackElement = document.getElementById('help-choice-feedback');
  const helpChoiceTextElement = document.getElementById('help-choice-text');
  const nextLevelButton = document.getElementById('next-level-btn');

  let currentScenario = 0;
  let score = 0;

  startButtons.forEach(button => {
    button.addEventListener('click', () => {
      startGame(button.id);
    });
  });

  function startGame(topic) {
    currentScenario = 1;
    score = 0;
    scenarioElements.forEach(scenario => {
      scenario.classList.add('hidden');
    });
    document.getElementById(`scenario-${currentScenario}`).classList.remove('hidden');
    feedbackElement.textContent = '';
    if (topic === 'ptsd-btn') {
      score += 5;
    }
    displayChoices(scenarios[currentScenario - 1].choices);
  }

  function displayChoices(choices) {
    const choicesList = document.querySelector(`#scenario-${currentScenario} ul`);
    choicesList.innerHTML = '';
    choices.forEach(choice => {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = choice.text;
      choiceButton.addEventListener('click', () => {
        handleChoiceClick(choice);
      });
      choicesList.appendChild(choiceButton);
    });
  }

  function handleChoiceClick(choice) {
    if (currentScenario === 1) {
      if (choice.correct) {
        score += choice.points;
        feedbackElement.textContent = `Correct! You earn ${choice.points} points.`;
      } else {
        feedbackElement.textContent = `Incorrect. The correct answer is PTSD. Try again.`;
      }
      currentScenario = 2;
      document.getElementById(`scenario-${currentScenario}`).classList.remove('hidden');
    } else if (currentScenario === 2) {
      if (choice.text === 'Seek Help') {
        helpChoiceFeedbackElement.textContent = '';
        document.getElementById('help-scenario').classList.remove('hidden');
      } else {
        helpChoiceFeedbackElement.textContent = 'Incorrect. Try again.';
      }
      helpChoiceTextElement.textContent = choice.text;
      currentScenario = 3;
    } else if (currentScenario === 3) {
      if (choice.text === 'School Psychologist') {
        feedbackElement.textContent = 'Correct! You earn 10 points.';
      } else {
        feedbackElement.textContent = 'Incorrect. Try again.';
      }
      nextLevelButton.addEventListener('click', moveToNextLevel);
    }
  }

  function moveToNextLevel() {
    currentScenario++;
    if (currentScenario < scenarios.length) {
      feedbackElement.textContent = ''; // Clear previous feedback
      helpChoiceFeedbackElement.textContent = ''; // Clear previous help choice feedback
      document.getElementById(`scenario-${currentScenario}`).classList.remove('hidden');
      displayChoices(scenarios[currentScenario - 1].choices);
    } else {
      // Game over or next steps after completing all scenarios
      // You can implement your logic here, such as showing a game completion message.
    }
  }

  const scenarios = [
    {
      scenario: 'Monday Morning',
      choices: [
        { text: 'PTSD', correct: true, points: 5 },
        { text: 'Depression', correct: false },
        { text: 'Bipolar', correct: false },
      ],
    },
    {
      scenario: "Alice's Dilemma",
      choices: [
        { text: 'Quit School', correct: false },
        { text: 'Seek Help', correct: true },
      ],
    },
    {
      scenario: 'Seeking Help',
      choices: [
        { text: 'Mary (Best Friend)', correct: false },
        { text: 'Parents', correct: false },
        { text: 'School Psychologist', correct: true },
      ],
    },
  ];
});
