// ============================================================
// QS EMPLOYER REPUTATION SURVEY
// Vinh University - Registration Form
// ============================================================

const form = document.getElementById('surveyForm');
const submitButton = document.getElementById('submitButton');
const countrySelect = document.getElementById('country');


// ============================================================
// COUNTRY / TERRITORY LIST
// ============================================================

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Côte d’Ivoire',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Türkiye',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
  'Other/Territory'
];


// ============================================================
// POPULATE COUNTRY SELECT
// ============================================================

if (countrySelect) {
  countries.forEach(country => {
    const option = document.createElement('option');

    option.value = country;
    option.textContent = country;

    countrySelect.appendChild(option);
  });
}


// ============================================================
// FIELD VALIDATION RULES
// ============================================================

const fields = {

  title: value =>
    value
      ? ''
      : 'Please select your title/position.',

  firstName: value =>
    value.trim().length >= 2
      ? ''
      : 'Please enter your first name.',

  lastName: value =>
    value.trim().length >= 2
      ? ''
      : 'Please enter your last name.',

  email: value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ? ''
      : 'Please enter a valid email address.',

  organization: value =>
    value.trim()
      ? ''
      : 'Please enter your company or organization.',

  country: value =>
    value
      ? ''
      : 'Please select your country or territory.',

  department: value =>
    value.trim()
      ? ''
      : 'Please enter your department or division.',

  industrySector: value =>
    value
      ? ''
      : 'Please select your industry sector.'
};


// ============================================================
// DISPLAY FIELD ERROR
// ============================================================

function setFieldError(id, message) {

  const input = document.getElementById(id);

  if (!input) {
    console.warn(`Field not found: ${id}`);
    return;
  }

  const wrapper = input.closest('.field-control');
  const error = document.getElementById(`${id}Error`);

  if (wrapper) {
    wrapper.classList.toggle(
      'is-invalid',
      Boolean(message)
    );
  }

  input.setAttribute(
    'aria-invalid',
    message ? 'true' : 'false'
  );

  if (error) {
    error.textContent = message;
  }
}


// ============================================================
// VALIDATE A SINGLE FIELD
// ============================================================

function validateField(id) {

  const input = document.getElementById(id);

  if (!input) {
    console.warn(`Cannot validate missing field: ${id}`);
    return false;
  }

  const validator = fields[id];

  if (typeof validator !== 'function') {
    return true;
  }

  const message = validator(input.value);

  setFieldError(id, message);

  return !message;
}


// ============================================================
// VALIDATE CONSENT
// ============================================================

function validateConsent() {

  const consent = document.getElementById('consent');

  if (!consent) {
    console.warn('Consent field not found.');
    return false;
  }

  const body = consent.closest('.consent-body');
  const error = document.getElementById('consentError');

  const message = consent.checked
    ? ''
    : 'Please provide consent before registering.';

  if (body) {
    body.classList.toggle(
      'is-invalid',
      Boolean(message)
    );
  }

  consent.setAttribute(
    'aria-invalid',
    message ? 'true' : 'false'
  );

  if (error) {
    error.textContent = message;
  }

  return !message;
}


// ============================================================
// REAL-TIME VALIDATION
// ============================================================

Object.keys(fields).forEach(id => {

  const input = document.getElementById(id);

  if (!input) {
    console.warn(`Field not found: ${id}`);
    return;
  }

  const eventName =
    input.tagName === 'SELECT'
      ? 'change'
      : 'input';

  input.addEventListener(
    eventName,
    () => validateField(id)
  );
});


const consentField =
  document.getElementById('consent');

if (consentField) {

  consentField.addEventListener(
    'change',
    validateConsent
  );
}


// ============================================================
// CREATE SUBMISSION TIME
// Format: YYYY-MM-DD HH:mm:ss
// ============================================================

function getSubmissionTime() {

  return new Date()
    .toLocaleString('sv-SE', {
      hour12: false
    });
}


// ============================================================
// FORM SUBMISSION
// ============================================================

if (form) {

  form.addEventListener(
    'submit',
    async event => {

      event.preventDefault();


      // ------------------------------------------------------
      // Validate required fields
      // ------------------------------------------------------

      const fieldsValid =
        Object.keys(fields)
          .map(validateField)
          .every(Boolean);

      const consentValid =
        validateConsent();


      // ------------------------------------------------------
      // Stop submission if validation fails
      // ------------------------------------------------------

      if (!fieldsValid || !consentValid) {

        const firstInvalid =
          form.querySelector(
            '[aria-invalid="true"]'
          );

        if (firstInvalid) {
          firstInvalid.focus();
        }

        return;
      }


      // ------------------------------------------------------
      // Build data payload
      // ------------------------------------------------------

      const payload = {

        Title:
          form.title.value,

        FirstName:
          form.firstName.value.trim(),

        LastName:
          form.lastName.value.trim(),

        Email:
          form.email.value.trim(),

        Company:
          form.organization.value.trim(),

        Country:
          form.country.value,

        Department:
          form.department.value.trim(),

        IndustrySector:
          form.industrySector.value,

        ReferrerName:
          form.referrerName
            ? form.referrerName.value.trim()
            : '',

        ReferrerDepartment:
          form.referrerDepartment
            ? form.referrerDepartment.value.trim()
            : '',

        Agreement:
          form.consent.checked
            ? 'Yes'
            : 'No',

        SubmissionTime:
          getSubmissionTime()
      };


      // ------------------------------------------------------
      // Store original button content
      // ------------------------------------------------------

      const originalHTML =
        submitButton.innerHTML;

      submitButton.disabled = true;
      submitButton.textContent =
        'SUBMITTING…';


      try {

        // ====================================================
        // POWER AUTOMATE HTTP POST URL
        // Replace the value below with your real Flow URL
        // ====================================================

        const flowUrl =
          'https://default4ef784396d6c4ea0ab1449b9284ab4.c9.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/04/workflows/207270644180420eab6e945d5e86ca8a/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=q4jknuXuwlWBl6ICOCGSBOncPdzNCGhDkXrblPsrPgI';


        // ----------------------------------------------------
        // Check if Flow URL has been configured
        // ----------------------------------------------------

        if (
          !flowUrl ||
          flowUrl ===
            'YOUR_POWER_AUTOMATE_HTTP_POST_URL'
        ) {

          throw new Error(
            'Power Automate HTTP POST URL has not been configured.'
          );
        }


        // ----------------------------------------------------
        // Send registration data to Power Automate
        // ----------------------------------------------------

        const response =
          await fetch(
            flowUrl,
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body:
                JSON.stringify(payload)
            }
          );


        // ----------------------------------------------------
        // Check HTTP response
        // ----------------------------------------------------

        if (!response.ok) {

          throw new Error(
            `Submission failed. HTTP status: ${response.status}`
          );
        }


        // ----------------------------------------------------
        // Development console
        // ----------------------------------------------------

        console.log(
          'QS Employer Contact Registration submitted successfully:',
          payload
        );


        // ----------------------------------------------------
        // Redirect to success page
        // ----------------------------------------------------

        window.location.href =
          'success.html';

      }

      catch (error) {

        console.error(
          'Registration submission error:',
          error
        );


        // ----------------------------------------------------
        // Restore button
        // ----------------------------------------------------

        submitButton.disabled = false;
        submitButton.innerHTML =
          originalHTML;


        // ----------------------------------------------------
        // User-friendly error message
        // ----------------------------------------------------

        const existingError =
          document.getElementById(
            'submissionError'
          );

        if (existingError) {

          existingError.textContent =
            'Your registration could not be submitted. Please try again.';

          existingError.hidden = false;

        } else {

          console.warn(
            'Element #submissionError was not found in index.html.'
          );
        }
      }
    }
  );
}
