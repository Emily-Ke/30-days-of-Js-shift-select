// data provided by tutorial
const initialChecklistData = [
  { text: 'This is an inbox layout', checked: false },
  { text: 'Check one item', checked: false },
  { text: 'Hold down your Shift key', checked: false },
  { text: 'Check a lower item', checked: false },
  { text: 'Everything inbetween should also be checked', checked: false },
  { text: 'Try to do it without any libraries', checked: false },
  { text: 'Just regular JavaScript', checked: false },
  { text: 'Good Luck!', checked: false },
  { text: "Don't forget to tweet your result!", checked: false }
];

// build ui
const checklistItemElements = initialChecklistData.map(
  ({ text, checked }, index) => {
    const listItemElement = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    checkbox.id = `checklist-item-${index}`;

    const label = document.createElement('label');
    label.textContent = text;
    label.htmlFor = `checklist-item-${index}`;

    listItemElement.append(checkbox, label);
    return listItemElement;
  }
);
const checklistElement = document.createElement('ul');
checklistElement.append(...checklistItemElements);

const { body } = document;
body.prepend(checklistElement);

// global variables
let shiftPressed = false;
let indexOfLastChecked = -1;

// functionality
const getIndex = idString => {
  const indexOfLastDash = idString.lastIndexOf('-');
  return idString.substring(indexOfLastDash + 1);
};

const sortNumbers = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

const handleCheckboxChange = e => {
  const currentIndex = getIndex(e.target.id);
  if (shiftPressed) {
    const [min, max] = [indexOfLastChecked, currentIndex].sort(sortNumbers);
    for (let i = min; i <= max; i++) {
      const checkbox = checklistItemElements[i].childNodes[0];
      checkbox.checked = true;
    }
  }
  indexOfLastChecked = currentIndex;
};

// listeners
document.addEventListener('keydown', e => {
  if (e.keyCode !== 16) return;
  shiftPressed = true;
});

document.addEventListener('keyup', e => {
  if (e.keyCode !== 16) return;
  shiftPressed = false;
});

checklistElement.addEventListener('change', handleCheckboxChange);
