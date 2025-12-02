// Tip calculator logic
const billInput = document.getElementById('bill-input');
const tipButtons = Array.from(document.querySelectorAll('.tip-btn'));
const customTip = document.getElementById('custom-tip');
const peopleInput = document.getElementById('people-input');
const peopleError = document.getElementById('people-error');
const tipAmountEl = document.getElementById('tip-amount');
const totalAmountEl = document.getElementById('total-amount');
const resetBtn = document.getElementById('reset-btn');

let selectedTip = 0;

function formatMoney(value) {
  return `$${Number(value).toFixed(2)}`;
}

function validatePeople() {
  const people = Number(peopleInput.value);
  if (!people || people <= 0) {
    peopleError.classList.remove('hidden');
    peopleInput.classList.add('border', 'border-red-500');
    return false;
  }
  peopleError.classList.add('hidden');
  peopleInput.classList.remove('border', 'border-red-500');
  return true;
}

function compute() {
  const bill = parseFloat(billInput.value) || 0;
  const people = parseInt(peopleInput.value) || 0;

  if (!validatePeople()) {
    tipAmountEl.textContent = '$0.00';
    totalAmountEl.textContent = '$0.00';
    return;
  }

  const tipPercent = selectedTip || (parseFloat(customTip.value) || 0);

  const tipTotal = bill * (tipPercent / 100);
  const tipPerPerson = tipTotal / people;
  const totalPerPerson = (bill / people) + tipPerPerson;

  tipAmountEl.textContent = formatMoney(isFinite(tipPerPerson) ? tipPerPerson : 0);
  totalAmountEl.textContent = formatMoney(isFinite(totalPerPerson) ? totalPerPerson : 0);
}

function clearSelection() {
  tipButtons.forEach(btn => {
    btn.classList.remove('bg-[#21d4b8]', 'text-teal-900');
    btn.classList.add('bg-teal-900', 'text-white');
  });
}

tipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    clearSelection();
    btn.classList.remove('bg-teal-900', 'text-white');
    btn.classList.add('bg-[#21d4b8]', 'text-teal-900');
    selectedTip = Number(btn.getAttribute('data-percent')) || 0;
    customTip.value = '';
    compute();
  });
});

customTip.addEventListener('input', () => {
  clearSelection();
  selectedTip = 0;
  compute();
});

[billInput, peopleInput].forEach(el => {
  el.addEventListener('input', compute);
});

resetBtn.addEventListener('click', () => {
  billInput.value = '';
  customTip.value = '';
  peopleInput.value = 1;
  selectedTip = 0;
  clearSelection();
  tipAmountEl.textContent = '$0.00';
  totalAmountEl.textContent = '$0.00';
  validatePeople();
});

// initial compute to set defaults
compute();
