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
const checklistItemElements = initialChecklistData.map(({ text, checked }) => {
  const listItemElement = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checked;

  const label = document.createElement('label');
  label.textContent = text;

  listItemElement.append(checkbox, label);
  return listItemElement;
});
const checklistElement = document.createElement('ul');
checklistElement.id = 'checklist';
checklistElement.append(...checklistItemElements);

const { body } = document;
body.prepend(checklistElement);

// global variables
let lastChecked;
const checkboxElements = document.querySelectorAll(
  '#checklist input[type="checkbox"]'
);

// functionality
const handleCheckboxChange = ({ target, shiftKey }) => {
  const { checked } = target;
  if (!checked) {
    lastChecked = null;
  } else {
    let inBetween = false;
    if (lastChecked && shiftKey) {
      checkboxElements.forEach(checkbox => {
        if (checkbox === lastChecked || checkbox === target) {
          inBetween = !inBetween;
        }
        if (inBetween) {
          checkbox.checked = true;
        }
      });
    }
    lastChecked = target;
  }
};

// listeners
checklistElement.addEventListener('click', handleCheckboxChange);
