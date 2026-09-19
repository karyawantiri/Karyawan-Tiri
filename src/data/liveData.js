const SPREADSHEET_ID = '1pRCGsJThSlgaA-D5ZnoU46IiDcz4NVMBpT6oPK2bTxw';
const DASHBOARD_GID = '95170672';

export const dashboardCsvUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${DASHBOARD_GID}`;

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') { cell += '"'; i += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === ',' && !quoted) { row.push(cell.trim()); cell = ''; continue; }
    if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(cell.trim());
      if (row.some((value) => value !== '')) rows.push(row);
      row = []; cell = ''; continue;
    }
    cell += char;
  }
  if (cell || row.length) { row.push(cell.trim()); rows.push(row); }
  return rows;
}

function numberId(value) {
  if (value == null || value === '' || String(value).includes('#')) return 0;
  const clean = String(value).replace(/"/g, '').replace(/%/g, '').trim();
  const normalized = clean.includes(',')
    ? clean.replace(/\./g, '').replace(',', '.')
    : clean.replace(/,/g, '');
  const result = Number(normalized);
  return Number.isFinite(result) ? result : 0;
}

const find = (headers, names) => headers.findIndex((header) => names.includes(header.trim().toUpperCase()));

export function transformDashboardCsv(text) {
  const rows = parseCsv(text);
  if (!rows.length) throw new Error('CSV dashboard kosong.');
  const headers = rows[0].map((header) => header.replace(/^\uFEFF/, '').trim());
  const index = {
    pud: find(headers, ['PUD', 'NAMA DISTRIBUTOR']),
    kecamatan: find(headers, ['KECAMATAN']),
    product: find(headers, ['JENIS PUPUK', 'NAMA PRODUK']),
    allocation: find(headers, ['ALOKASI']),
    realization: find(headers, ['TOTAL REALIASI', 'TOTAL REALISASI', 'REALISASI 1 JAN - 31 AGUSTUS']),
    remaining: find(headers, ['SISA ALOKASI']),
    percentage: find(headers, ['PERSENTASE'])
  };

  if (index.kecamatan < 0 || index.product < 0) throw new Error('Kolom KECAMATAN atau JENIS PUPUK tidak ditemukan.');
  const records = rows.slice(1).map((values) => ({
    pud: values[index.pud] || 'Tidak diketahui',
    kecamatan: values[index.kecamatan] || 'Tidak diketahui',
    product: (values[index.product] || 'Tidak diketahui').trim().toUpperCase(),
    allocation: numberId(values[index.allocation]),
    realization: numberId(values[index.realization]),
    remaining: numberId(values[index.remaining]),
    percentage: numberId(values[index.percentage])
  }));

  const group = (key) => Object.values(records.reduce((result, record) => {
    const name = record[key];
    result[name] ||= { name, value: 0, allocation: 0, realization: 0, remaining: 0 };
    result[name].value += record.realization;
    result[name].allocation += record.allocation;
    result[name].realization += record.realization;
    result[name].remaining += record.remaining;
    return result;
  }, {}));

  const kecamatan = group('kecamatan').map((item) => {
    const productRows = records.filter((record) => record.kecamatan === item.name);
    return {
      nama: item.name,
      urea: productRows.filter((row) => row.product === 'UREA').reduce((sum, row) => sum + row.realization, 0),
      npk: productRows.filter((row) => row.product === 'NPK').reduce((sum, row) => sum + row.realization, 0),
      organik: productRows.filter((row) => row.product === 'ORGANIK').reduce((sum, row) => sum + row.realization, 0),
      za: productRows.filter((row) => row.product === 'ZA').reduce((sum, row) => sum + row.realization, 0)
    };
  });

  return {
    metrics: [
      { label: 'Jumlah PUD', value: new Set(records.map((row) => row.pud)).size.toLocaleString('id-ID'), tone: 'blue' },
      { label: 'Jumlah Pengecer', value: '—', tone: 'green' },
      { label: 'Jumlah Kecamatan', value: new Set(records.map((row) => row.kecamatan)).size.toLocaleString('id-ID'), tone: 'amber' },
      { label: 'Jumlah Bulan', value: '—', tone: 'purple' }
    ],
    kecamatanSeries: kecamatan,
    pudSeries: group('pud').map((item) => ({ name: item.name, value: item.realization })),
    realisasiSeries: group('kecamatan').map((item) => ({ nama: item.name, alokasi: item.allocation, realisasi: item.realization, sisa: item.remaining, persentase: item.allocation ? Number(((item.realization / item.allocation) * 100).toFixed(1)) : 0 })),
    records,
    options: { products: ['Semua', ...new Set(records.map((row) => row.product))], kecamatan: ['Semua', ...new Set(records.map((row) => row.kecamatan))] }
  };
}

export async function fetchDashboardData() {
  const response = await fetch(`${dashboardCsvUrl}&_=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Google Sheets mengembalikan HTTP ${response.status}.`);
  return transformDashboardCsv(await response.text());
}
