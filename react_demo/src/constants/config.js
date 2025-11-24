export const API_URL = 'http://127.0.0.1:8899';

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50];

export const DEFAULT_THEME = 'hacker';

export const DISPLAY_FIELDS = [
  'id', 'lng', 'lat', 'annualCarbon', 'capacity', 'coalType',
  'country', 'plant', 'status', 'type', 'retire1', 'retire2',
  'retire3', 'start1', 'start2', 'year1', 'year2',
  'startLabel', 'regionLabel'
];

export const FIELD_LABELS = {
  id: '[ID]',
  lng: '[LNG]',
  lat: '[LAT]',
  annualCarbon: '[CARBON]',
  capacity: '[CAPACITY]',
  coalType: '[COAL_TYPE]',
  country: '[COUNTRY]',
  plant: '[PLANT]',
  status: '[STATUS]',
  type: '[TYPE]',
  retire1: '[RETIRE_1]',
  retire2: '[RETIRE_2]',
  retire3: '[RETIRE_3]',
  start1: '[START_1]',
  start2: '[START_2]',
  year1: '[YEAR_1]',
  year2: '[YEAR_2]',
  startLabel: '[START_LABEL]',
  regionLabel: '[REGION]'
};

export const FORM_FIELD_LABELS = {
  lng: '经度 (Longitude)',
  lat: '纬度 (Latitude)',
  annualCarbon: '年碳排放 (Annual Carbon)',
  capacity: '容量 (Capacity)',
  coalType: '煤炭类型 (Coal Type)',
  country: '国家 (Country)',
  plant: '电站名称 (Plant)',
  status: '状态 (Status)',
  type: '类型 (Type)',
  retire1: '退役1 (Retire 1)',
  retire2: '退役2 (Retire 2)',
  retire3: '退役3 (Retire 3)',
  start1: '启动1 (Start 1)',
  start2: '启动2 (Start 2)',
  year1: '年份1 (Year 1)',
  year2: '年份2 (Year 2)',
  startLabel: '启动标签 (Start Label)',
  regionLabel: '区域标签 (Region Label)'
};

export const NUMERIC_FIELDS = [
  'lng', 'lat', 'annualCarbon', 'capacity',
  'retire1', 'retire2', 'retire3',
  'start1', 'start2', 'year1', 'year2'
];

export const INITIAL_FORM_DATA = {
  lng: '', lat: '', annualCarbon: '', capacity: '', coalType: '',
  country: '', plant: '', status: 'Operating', type: 'Subcritical',
  retire1: '', retire2: '', retire3: '', start1: '', start2: '',
  year1: '', year2: '', startLabel: '', regionLabel: ''
};
