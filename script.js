const form = document.getElementById('surveyForm');
const submitButton = document.getElementById('submitButton');
const countrySelect = document.getElementById('country');

const countries = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan',
  'Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi',
  'Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo','Costa Rica','Côte d’Ivoire','Croatia','Cuba','Cyprus','Czechia',
  'Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia',
  'Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary',
  'Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan',
  'Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar',
  'Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar',
  'Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria',
  'Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Türkiye','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe','Other / Territory'
];

countries.forEach(country => {
  const option = document.createElement('option');
  option.value = country;
  option.textContent = country;
  countrySelect.appendChild(option);
});

const fields = {
  title: value => value ? '' : 'Please select your title/position.',
  firstName: value => value.trim().length >= 2 ? '' : 'Please enter your first name.',
  lastName: value => value.trim().length >= 2 ? '' : 'Please enter your last name.',
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Please enter a valid email address.',
  organization: value => value.trim() ? '' : 'Please enter your company or organization.',
  country: value => value ? '' : 'Please select your country or territory.',
  department: value => value.trim() ? '' : 'Please enter your department or division.',
  industrySector: value => value ? '' : 'Please select your industry sector.'
};

function setFieldError(id, message) {
  const input = document.getElementById(id);
  const wrapper = input?.closest('.field-control');
  const error = document.getElementById(`${id}Error`);
  if (!input || !error) return;

  wrapper?.classList.toggle('is-invalid', Boolean(message));
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  error.textContent = message;
}

function validateField(id) {
  const input = document.getElementById(id);
  const message = fields[id](input.value);
  setFieldError(id, message);
  return !message;
}

function validateConsent() {
  const consent = document.getElementById('consent');
  const body = consent.closest('.consent-body');
  const error = document.getElementById('consentError');
  const message = consent.checked ? '' : 'Please provide consent before registering.';
  body.classList.toggle('is-invalid', Boolean(message));
  consent.setAttribute('aria-invalid', message ? 'true' : 'false');
  error.textContent = message;
  return !message;
}

Object.keys(fields).forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener(input.tagName === 'SELECT' ? 'change' : 'input', () => validateField(id));
});

document.getElementById('consent').addEventListener('change', validateConsent);

form.addEventListener('submit', async event => {
  event.preventDefault();

  const fieldsValid = Object.keys(fields).map(validateField).every(Boolean);
  const consentValid = validateConsent();

  if (!fieldsValid || !consentValid) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    firstInvalid?.focus?.();
    return;
  }

  const payload = {
    title: form.title.value,
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
    organization: form.organization.value.trim(),
    country: form.country.value,
    department: form.department.value.trim(),
    industrySector: form.industrySector.value,
    referrerName: form.referrerName.value.trim(),
    referrerDepartment: form.referrerDepartment.value.trim(),
    consent: form.consent.checked
  };

  const originalHTML = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.textContent = 'SUBMITTING…';

  try {
    // Thay đường dẫn dưới đây bằng HTTP POST URL lấy từ Power Automate Trigger
    const flowUrl = 'https://default4ef784396d6c4ea0ab1449b9284ab4.c9.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/04/workflows/207270644180420eab6e945d5e86ca8a/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=q4jknuXuwlWBl6ICOCGSBOncPdzNCGhDkXrblPsrPgI';

    const response = await fetch(flowUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Submission failed with status: ' + response.status);
    }

    console.log('QS Employer Contact Registration payload:', payload);
    window.location.href = 'success.html';
  } catch (error) {
    console.error(error);
    submitButton.disabled = false;
    submitButton.innerHTML = originalHTML;
  }
});
