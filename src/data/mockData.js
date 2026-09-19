export const mockMetrics = [
  { label: 'Jumlah PUD', value: '184', suffix: '', tone: 'blue' },
  { label: 'Jumlah Pengecer', value: '2.460', suffix: '', tone: 'green' },
  { label: 'Jumlah Kecamatan', value: '52', suffix: '', tone: 'amber' },
  { label: 'Jumlah Bulan', value: '12', suffix: '', tone: 'purple' }
];

export const kecamatanSeries = [
  { nama: 'Kec. A', urea: 1200, npk: 980, organik: 340, za: 260 },
  { nama: 'Kec. B', urea: 960, npk: 870, organik: 510, za: 220 },
  { nama: 'Kec. C', urea: 1480, npk: 1160, organik: 620, za: 330 },
  { nama: 'Kec. D', urea: 1030, npk: 720, organik: 450, za: 160 },
  { nama: 'Kec. E', urea: 1210, npk: 980, organik: 560, za: 280 },
  { nama: 'Kec. F', urea: 1380, npk: 1140, organik: 640, za: 310 }
];

export const pudSeries = [
  { name: 'PUD 1', value: 32 },
  { name: 'PUD 2', value: 26 },
  { name: 'PUD 3', value: 21 },
  { name: 'PUD 4', value: 12 },
  { name: 'PUD 5', value: 9 }
];

export const realisasiSeries = [
  { nama: 'Kec. A', alokasi: 980000, realisasi: 760000, sisa: 220000, persentase: 77.6 },
  { nama: 'Kec. B', alokasi: 860000, realisasi: 810000, sisa: 50000, persentase: 94.2 },
  { nama: 'Kec. C', alokasi: 1240000, realisasi: 1030000, sisa: 210000, persentase: 83.1 },
  { nama: 'Kec. D', alokasi: 930000, realisasi: 770000, sisa: 160000, persentase: 82.8 },
  { nama: 'Kec. E', alokasi: 1010000, realisasi: 920000, sisa: 90000, persentase: 91.1 }
];

export const laporanRows = [
  { distributor: 'Distributor A', kecamatan: 'Kec. A', kios: 'Kios 01', stokAwal: 1200, penebusan: 1400, penyaluran: 1350, persediaan: 1250 },
  { distributor: 'Distributor A', kecamatan: 'Kec. B', kios: 'Kios 02', stokAwal: 980, penebusan: 1120, penyaluran: 1000, persediaan: 1100 },
  { distributor: 'Distributor B', kecamatan: 'Kec. C', kios: 'Kios 03', stokAwal: 1500, penebusan: 1700, penyaluran: 1650, persediaan: 1550 },
  { distributor: 'Distributor C', kecamatan: 'Kec. D', kios: 'Kios 04', stokAwal: 1120, penebusan: 1340, penyaluran: 1280, persediaan: 1180 },
  { distributor: 'Distributor C', kecamatan: 'Kec. E', kios: 'Kios 05', stokAwal: 960, penebusan: 1280, penyaluran: 1190, persediaan: 1050 }
];

export const fileCatalog = [
  { name: 'Data-2026.xlsx', category: 'Data', type: 'excel' },
  { name: 'Dokumen-Program.pdf', category: 'Dokumen', type: 'pdf' },
  { name: 'Arsip-Periode-2025.docx', category: 'Arsip', type: 'word' },
  { name: 'Dokumentasi-Lokasi.png', category: 'Dokumentasi', type: 'image' },
  { name: 'Rekap-Distribusi.pdf', category: 'Laporan', type: 'pdf' }
];

export const pudTable = [
  { namaPUD: 'PUD 1', penanggungJawab: 'Budi Santoso', telp: '0812-2222-1111', alamat: 'Jl. Raya Timur No. 14', alokasi: '1.200.000 kg' },
  { namaPUD: 'PUD 2', penanggungJawab: 'Sari Wulandari', telp: '0812-2222-2222', alamat: 'Jl. Kenanga No. 28', alokasi: '980.000 kg' },
  { namaPUD: 'PUD 3', penanggungJawab: 'Asep Rahmat', telp: '0812-2222-3333', alamat: 'Jl. Merdeka No. 7', alokasi: '1.450.000 kg' }
];

export const pptsTable = [
  { namaPPTS: 'PPTS 1', penanggungJawab: 'Dewi Anggraini', telp: '0812-3333-1111', alamat: 'Jl. Cendana No. 21', alokasi: '820.000 kg' },
  { namaPPTS: 'PPTS 2', penanggungJawab: 'Rizky Putra', telp: '0812-3333-2222', alamat: 'Jl. Bunga No. 10', alokasi: '760.000 kg' }
];

export const productOptions = ['Semua', 'Urea', 'NPK', 'Organik', 'ZA'];
export const kecamatanOptions = ['Semua', 'Kec. A', 'Kec. B', 'Kec. C', 'Kec. D', 'Kec. E', 'Kec. F'];

export const defaultTheme = {
  header: '#1f3b8f',
  menu: '#eaf1ff',
  background: '#f4f7fb',
  bubble: '#ffffff',
  shadow: '#d4d9ea',
  accent: '#3b82f6',
  border: '#dfe7f5',
  font: 'Inter',
  style: 'glass'
};
