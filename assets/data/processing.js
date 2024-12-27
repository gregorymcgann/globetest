// Select countries

// Select countries
const SouthAmerica = [
  'Argentina',
  'Bolivia',
  'Brazil',
  'Chile',
  'Colombia',
  'Ecuador',
  'Guyana',
  'Paraguay',
  'Peru',
  'Suriname',
  'Uruguay',
  'Venezuela'
];

const NorthAmerica = [
  'Antigua and Barbuda',
  'Bahamas',
  'Barbados',
  'Belize',
  'Canada',
  'Costa Rica',
  'Cuba',
  'Dominica',
  'Dominican Republic',
  'El Salvador',
  'Grenada',
  'Guatemala',
  'Haiti',
  'Honduras',
  'Jamaica',
  'Mexico',
  'Nicaragua',
  'Panama',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Trinidad and Tobago',
  'United States'
];

const Europe = [
  'Albania',
  'Andorra',
  'Armenia',
  'Austria',
  'Azerbaijan',
  'Belarus',
  'Belgium',
  'Bosnia and Herzegovina',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Georgia',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'Ireland',
  'Italy',
  'Kazakhstan',
  'Kosovo',
  'Latvia',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Moldova',
  'Monaco',
  'Montenegro',
  'Netherlands',
  'North Macedonia',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Russia',
  'San Marino',
  'Serbia',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'Switzerland',
  'Turkey',
  'Ukraine',
  'United Kingdom',
  'Vatican City'
];

const Africa = [
  'Algeria',
  'Angola',
  'Benin',
  'Botswana',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cameroon',
  'Central African Republic',
  'Chad',
  'Comoros',
  'Congo',
  'Congo (DRC)',
  'Djibouti',
  'Egypt',
  'Equatorial Guinea',
  'Eritrea',
  'Eswatini',
  'Ethiopia',
  'Gabon',
  'Gambia',
  'Ghana',
  'Guinea',
  'Guinea-Bissau',
  'Ivory Coast',
  'Kenya',
  'Lesotho',
  'Liberia',
  'Libya',
  'Madagascar',
  'Malawi',
  'Mali',
  'Mauritania',
  'Mauritius',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Niger',
  'Nigeria',
  'Rwanda',
  'Sao Tome and Principe',
  'Senegal',
  'Seychelles',
  'Sierra Leone',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Sudan',
  'Tanzania',
  'Togo',
  'Tunisia',
  'Uganda',
  'Zambia',
  'Zimbabwe'
];

const Asia = [
  'Afghanistan',
  'Armenia',
  'Azerbaijan',
  'Bahrain',
  'Bangladesh',
  'Bhutan',
  'Brunei',
  'Cambodia',
  'China',
  'Cyprus',
  'Georgia',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Israel',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Lebanon',
  'Malaysia',
  'Maldives',
  'Mongolia',
  'Myanmar',
  'Nepal',
  'North Korea',
  'Oman',
  'Pakistan',
  'Palestine',
  'Philippines',
  'Qatar',
  'Saudi Arabia',
  'Singapore',
  'South Korea',
  'Sri Lanka',
  'Syria',
  'Tajikistan',
  'Thailand',
  'Timor-Leste',
  'Turkmenistan',
  'United Arab Emirates',
  'Uzbekistan',
  'Vietnam',
  'Yemen'
];

const Rest = [
  'Australia',
  'Fiji',
  'Kiribati',
  'Marshall Islands',
  'Micronesia',
  'Nauru',
  'New Zealand',
  'Palau',
  'Papua New Guinea',
  'Samoa',
  'Solomon Islands',
  'Tonga',
  'Tuvalu',
  'Vanuatu',
  'Greenland'
];

const selected = [
  ...Asia,
  ...Africa,
  ...Europe,
  ...NorthAmerica,
  ...SouthAmerica,
  ...Rest
]

console.log('Total countries in selected array:', selected.length);
console.log('Selected countries:', selected);

// Get all countries
function getAllCountries(countries) {
  return countries.map(country => {
    const {name, latitude, longitude} = country;
    return {name, latitude, longitude};
  });
}

// Replace the existing selectCountries function
function selectCountries(list, countries) {
  console.log('Original countries data:', countries);
  console.log('List to select from:', list);
  
  const selectedCountries = list.map(name => {
    const country = countries.find(c => c.name === name);
    if (!country) {
      console.warn(`Country not found: ${name}`);
      return null;
    }
    const {latitude, longitude} = country;
    return {name, latitude, longitude};
  }).filter(Boolean);
  
  console.log('Selected countries count:', selectedCountries.length);
  return selectedCountries;
}

// function selectCountries(list, countries) {
//   return list.map(name => {
//     const country = countries.find(c => c.name === name);
//     const {latitude, longitude} = country;
//     return {name, latitude, longitude};
//   })
// }




// Connections

const connections = {
  'Colombia': ['Ecuador', 'Cuba', 'Mexico', 'Peru', 'Venezuela', 'Guyana', 'United States'],
  'South Sudan': ['Nigeria', 'Sudan', 'Kenya', 'Uganda', 'Zambia', 'Malawi', 'Ethiopia', 'Somalia', 'Madagascar', 'Yemen'],
  'India': ['Pakistan', 'Kazakhstan', 'Maldives', 'Sri Lanka', 'Vietnam', 'Thailand'],
  'Thailand': ['Singapore', 'Indonesia', 'Nepal', 'Vietnam', 'Sri Lanka', 'Cambodia', 'Pakistan'],
  'Panama': ['Cuba', 'Mexico', 'Ecuador', 'Colombia', 'Peru', 'Venezuela', 'United States'],
  'Fiji': ['Tuvalu', 'Nauru', 'Kiribati', 'Tonga', 'New Caledonia', 'New Zealand']
}


function getCountry(name, countries) {
  // Clean up special cases
  const cleanName = name
    .replace(', RB', '')
    .replace(', Rep.', '')
    .replace(' (DRC)', '');
    
  return countries.find(c => c.name === cleanName);
}

function getCountries(object, countries) {
  return Object.keys(object).reduce((r, e) => {
    r[e] = object[e].map(c => getCountry(c, countries))
    return r;
  }, {})
}


