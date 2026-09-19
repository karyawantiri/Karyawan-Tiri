import { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line,
  Area,
  AreaChart
} from 'recharts';
import {
  mockMetrics,
  kecamatanSeries,
  pudSeries,
  realisasiSeries,
  laporanRows,
  fileCatalog,
  pudTable,
  pptsTable,
  productOptions,
  kecamatanOptions,
  defaultTheme
} from './data/mockData';

const chartColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

function MetricCard({ label, value, tone }) {
  const toneMap = {
    blue: 'metric blue',
    green: 'metric green',
    amber: 'metric amber',
    purple: 'metric purple'
  };

  return (
    <div className={toneMap[tone] || 'metric blue'}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
    </div>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="section-header">
      <h3>{title}</h3>
      {action ? <button className="ghost-button">{action}</button> : null}
    </div>
  );
}

function DashboardView({ theme }) {
  const chartData = useMemo(() => kecamatanSeries, []);
  const pieData = useMemo(() => pudSeries, []);

  return (
    <div className="page-block">
      <SectionHeader title="Dashboard Penyaluran" action="Download Data" />

      <div className="metrics-grid">
        {mockMetrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} tone={metric.tone} />
        ))}
      </div>

      <div className="toolbar-grid">
        <div className="field-group">
          <label>Produk</label>
          <select defaultValue="Semua">
            {productOptions.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label>Kecamatan</label>
          <select defaultValue="Semua">
            {kecamatanOptions.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label>Tipe Chart</label>
          <select defaultValue="Bar Chart">
            <option>Bar Chart</option>
            <option>Line Chart</option>
            <option>Pie Chart</option>
            <option>Area Chart</option>
            <option>Doughnut Chart</option>
          </select>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h4>Penyaluran per Kecamatan</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
                <XAxis dataKey="nama" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="urea" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="npk" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="organik" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                <Bar dataKey="za" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h4>Penyaluran per PUD</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={42} outerRadius={90} paddingAngle={4}>
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="chart-grid single">
        <div className="chart-card full">
          <h4>Realisasi vs Alokasi</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={realisasiSeries} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="realisasiFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
                <XAxis dataKey="nama" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="realisasi" stroke="#3b82f6" fill="url(#realisasiFill)" />
                <Line type="monotone" dataKey="alokasi" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="table-card">
        <h4>Realisasi vs Alokasi</h4>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nama Kecamatan</th>
                <th>Alokasi</th>
                <th>Realisasi</th>
                <th>Sisa Alokasi</th>
                <th>Persentase</th>
              </tr>
            </thead>
            <tbody>
              {realisasiSeries.map((row) => (
                <tr key={row.nama}>
                  <td>{row.nama}</td>
                  <td>{row.alokasi.toLocaleString('id-ID')}</td>
                  <td>{row.realisasi.toLocaleString('id-ID')}</td>
                  <td>{row.sisa.toLocaleString('id-ID')}</td>
                  <td>{row.persentase}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LaporanView() {
  return (
    <div className="page-block">
      <SectionHeader title="Laporan" action="Export Excel" />
      <div className="table-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Distributor</th>
                <th>Kecamatan</th>
                <th>Nama Kios</th>
                <th>Stok Awal</th>
                <th>Penebusan</th>
                <th>Penyaluran</th>
                <th>Persediaan</th>
              </tr>
            </thead>
            <tbody>
              {laporanRows.map((row, index) => (
                <tr key={`${row.distributor}-${index}`}>
                  <td>{row.distributor}</td>
                  <td>{row.kecamatan}</td>
                  <td>{row.kios}</td>
                  <td>{row.stokAwal}</td>
                  <td>{row.penebusan}</td>
                  <td>{row.penyaluran}</td>
                  <td>{row.persediaan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DataFileView() {
  return (
    <div className="page-block">
      <SectionHeader title="Data" action="Tambah Berkas" />
      <div className="file-grid">
        {fileCatalog.map((item) => (
          <div key={item.name} className="file-card">
            <div className="file-icon">{item.type}</div>
            <div className="file-name">{item.name}</div>
            <div className="file-category">{item.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleTableView({ title, rows, columns }) {
  return (
    <div className="page-block">
      <SectionHeader title={title} action="Download" />
      <div className="table-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${title}-${index}`}>
                  {columns.map((col) => (
                    <td key={`${title}-${col}-${index}`}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SettingsView({ theme, setTheme }) {
  const handleColorChange = (key, value) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="page-block settings-page">
      <SectionHeader title="Pengaturan" action="Simpan" />

      <div className="settings-grid">
        <div className="settings-card">
          <h4>Warna Utama</h4>
          <div className="color-row">
            <label>Header</label>
            <input type="color" value={theme.header} onChange={(e) => handleColorChange('header', e.target.value)} />
          </div>
          <div className="color-row">
            <label>Menu</label>
            <input type="color" value={theme.menu} onChange={(e) => handleColorChange('menu', e.target.value)} />
          </div>
          <div className="color-row">
            <label>Latar</label>
            <input type="color" value={theme.background} onChange={(e) => handleColorChange('background', e.target.value)} />
          </div>
          <div className="color-row">
            <label>Gelembung</label>
            <input type="color" value={theme.bubble} onChange={(e) => handleColorChange('bubble', e.target.value)} />
          </div>
          <div className="color-row">
            <label>Shadow</label>
            <input type="color" value={theme.shadow} onChange={(e) => handleColorChange('shadow', e.target.value)} />
          </div>
        </div>

        <div className="settings-card">
          <h4>Visual</h4>
          <div className="field-group">
            <label>Font</label>
            <select value={theme.font} onChange={(e) => handleColorChange('font', e.target.value)}>
              <option>Inter</option>
              <option>Arial</option>
              <option>Verdana</option>
              <option>Tahoma</option>
              <option>Georgia</option>
              <option>Helvetica</option>
              <option>Segoe UI</option>
              <option>Times New Roman</option>
              <option>Trebuchet MS</option>
              <option>Calibri</option>
            </select>
          </div>

          <div className="field-group">
            <label>Style</label>
            <select value={theme.style} onChange={(e) => handleColorChange('style', e.target.value)}>
              <option value="glass">Glass</option>
              <option value="classic">Klasik</option>
              <option value="glossy">Glossy</option>
              <option value="transparan">Transparan</option>
            </select>
          </div>

          <div className="field-group">
            <label>Accent</label>
            <input type="color" value={theme.accent} onChange={(e) => handleColorChange('accent', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [theme, setTheme] = useState(defaultTheme);
  const [authMode, setAuthMode] = useState(null);

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'laporan', label: 'Laporan' },
    { key: 'data', label: 'Data' },
    { key: 'dokumen', label: 'Dokumen' },
    { key: 'arsip', label: 'Arsip' },
    { key: 'dokumentasi', label: 'Dokumentasi' },
    { key: 'pud', label: 'PUD' },
    { key: 'ppts', label: 'PPTS' },
    { key: 'settings', label: 'Pengaturan' }
  ];

  const pageMap = {
    dashboard: <DashboardView theme={theme} />,
    laporan: <LaporanView />,
    data: <DataFileView />,
    dokumen: <SimpleTableView title="Dokumen" rows={fileCatalog.filter((item) => item.category === 'Dokumen')} columns={['name', 'category', 'type']} />,
    arsip: <SimpleTableView title="Arsip" rows={fileCatalog.filter((item) => item.category === 'Arsip')} columns={['name', 'category', 'type']} />,
    dokumentasi: <SimpleTableView title="Dokumentasi" rows={fileCatalog.filter((item) => item.category === 'Dokumentasi')} columns={['name', 'category', 'type']} />,
    pud: <SimpleTableView title="PUD" rows={pudTable.map((item) => ({
      namaPUD: item.namaPUD,
      penanggungJawab: item.penanggungJawab,
      telp: item.telp,
      alamat: item.alamat,
      alokasi: item.alokasi
    }))} columns={['namaPUD', 'penanggungJawab', 'telp', 'alamat', 'alokasi']} />,
    ppts: <SimpleTableView title="PPTS" rows={pptsTable.map((item) => ({
      namaPPTS: item.namaPPTS,
      penanggungJawab: item.penanggungJawab,
      telp: item.telp,
      alamat: item.alamat,
      alokasi: item.alokasi
    }))} columns={['namaPPTS', 'penanggungJawab', 'telp', 'alamat', 'alokasi']} />,
    settings: <SettingsView theme={theme} setTheme={setTheme} />
  };

  const appStyle = {
    '--header-color': theme.header,
    '--menu-color': theme.menu,
    '--background-color': theme.background,
    '--bubble-color': theme.bubble,
    '--shadow-color': theme.shadow,
    '--accent-color': theme.accent,
    '--border-color': theme.border,
    '--font-family': theme.font
  };

  if (!authMode) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <div className="brand-badge">Karyawan Tiri</div>
          <h1>Pilih Akses</h1>
          <p>Silakan pilih mode login sesuai kebutuhan Anda.</p>

          <div className="auth-buttons">
            <button className="login-button owner" onClick={() => setAuthMode('owner')}>
              Pemilik
            </button>
            <button className="login-button guest" onClick={() => setAuthMode('guest')}>
              Tamu
            </button>
          </div>

          <div className="credentials-box">
            <p><strong>Pemilik</strong> : password karyawan tiri</p>
            <p><strong>Tamu</strong> : password tamu123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell" style={appStyle}>
      <aside className="sidebar">
        <div className="brand-box">
          <div className="brand-mark">KT</div>
          <div>
            <div className="brand-name">Karyawan Tiri</div>
            <small>{authMode === 'owner' ? 'Pemilik' : 'Tamu'}</small>
          </div>
        </div>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={activeMenu === item.key ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveMenu(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="logout-button" onClick={() => setAuthMode(null)}>Keluar</button>
      </aside>

      <main className="content-panel">
        <header className="topbar">
          <div>
            <h2>{menuItems.find((item) => item.key === activeMenu)?.label}</h2>
            <p>Dashboard penetrasi dan penyaluran pupuk</p>
          </div>
          <div className="topbar-actions">
            <button className="primary-button">Download</button>
          </div>
        </header>

        {pageMap[activeMenu]}
      </main>
    </div>
  );
}

export default App;
